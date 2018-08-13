import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
import SQLite from '../common/SQLite';
import { sql } from "../netWork/Sql";
var sqLite = new SQLite();
var db;
export default class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userInfo: {},
            hospitalName: '',// 医院名
            branchName: '',// 科室名
            titleName: '',//职称名字
            signStatus: "",// 认证状态
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    upDateUser(obj) {
        db = sqLite.open();
        db.transaction((tx) => {
            let sql = "UPDATE user SET doctorName = ?,doctorSex=?,doctorAddress=?,doctorCardNumber=?,hospitalId=?,branchId=?,titleId=?,headImg=?,doctorResume=?,doctorStrong=? WHERE id = ?";
            tx.executeSql(sql, [obj.doctorName, obj.doctorSex, obj.doctorAddress, obj.doctorCardNumber, obj.hospitalId, obj.branchId, obj.titleId, obj.headImg, obj.doctorResume, obj.doctorStrong, global.Token], () => {

            }, (err) => {
                console.log(err);
            });
        }, (error) => {
            console.log(error);
        });
    }
    // 根据 id 查 对应的名字
    idToName() {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from hospital where id = ?", [this.state.userInfo.hospitalId], (tx, results) => {
                var len = results.rows.length;
                this.setState({
                    hospitalName: results.rows.item(0).hospitalName
                })
                let sql = "UPDATE user SET hospitalName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).hospitalName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
            tx.executeSql("select * from branch where id = ?", [this.state.userInfo.branchId], (tx, results) => {
                var len = results.rows.length;
                this.setState({
                    branchName: results.rows.item(0).branchName
                })
                let sql = "UPDATE user SET branchName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).branchName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
            tx.executeSql("select * from title where id = ?", [this.state.userInfo.titleId], (tx, results) => {
                var len = results.rows.length;
                this.setState({
                    titleName: results.rows.item(0).titleName
                })
                let sql = "UPDATE user SET titleName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).titleName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
        })
    }
    getDoctorDetail() {
        // 获取个人信息数据-start
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        });
        fetch(requestUrl.getDoctorDetail, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: false,
                        userInfo: responseData.result,
                    })
                    this.idToName();
                    this.upDateUser(responseData.result);
                } else if (responseData == 40004) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '您还未认证',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                } else if (responseData == 50000) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
        // 获取个人信息数据 - end
    }
    componentDidMount() {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from user", [], (tx, results) => {
                this.setState({
                    signStatus: results.rows.item(0).signStatus,
                    userInfo: results.rows.item(0),
                })
                if (!results.rows.item(0).doctorName) {
                    this.getDoctorDetail();
                }
            })
        }, (error) => {
            console.log(error);
        });
    }
    navHTML() {
        // AUTHENTICATION_PROGRESS,//认证中
        // AUTHENTICATION_SUCCESS,//认证成功
        // AUTHENTICATION_FAILED, //认证失败
        // AUTHENTICATION_EMPTY //未填写认证信息
        if (this.state.signStatus == "AUTHENTICATION_SUCCESS") {
            return (
                <View style={styles.navBox}>
                    <Text style={styles.topText}>{this.state.userInfo.doctorName}-{this.state.titleName}</Text>
                    <Text style={styles.bottomText}>{this.state.hospitalName} {this.state.branchName}</Text>
                </View>
            )
        } else if (this.state.signStatus == "AUTHENTICATION_PROGRESS") {
            return (
                <View style={styles.navBox}>
                    <Text style={styles.topText}>认证中</Text>
                    <TouchableOpacity
                        style={styles.authenticationBtn}
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate("Authentication");
                        }}>
                        <Text style={styles.bottomText}>认证中</Text>
                        <Image
                            style={styles.arrowRightImg}
                            source={require('../images/arrow_right_white.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.navBox}>
                    <Text style={styles.topText}>认证失败</Text>
                    <TouchableOpacity
                        style={styles.authenticationBtn}
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate("Approve");
                        }}>
                        <Text style={styles.bottomText}>去认证</Text>
                        <Image
                            style={styles.arrowRightImg}
                            source={require('../images/arrow_right_white.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <ScrollView
                alwaysBounceVertical={true}// ios不满一屏时弹性
                bounces={false}// ios弹性
                style={styles.container}>
                <StatusBar
                    animated={true}//是否动画
                    hidden={false}//是否隐藏
                    backgroundColor={'#000'}//android 设置状态栏背景颜色
                    translucent={false}//android 设置状态栏是否为透明
                    showHideTransition="fade"//IOS状态栏改变时动画 fade:默认 slide
                    networkActivityIndicatorVisible={this.state.isLoading}//IOS设定网络活动指示器(就是那个菊花)是否显示在状态栏。
                    statusBarStyle={"default"}//ios:白底黑字  android:黑底白字
                />
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    // locations={[0, 1]}
                    colors={global.LinearGradient}
                    style={styles.linearGradient}>
                    <View style={styles.navContent}>
                        <Image
                            style={styles.doctorImg}
                            source={this.state.userInfo && this.state.userInfo.headImg ? { uri: this.state.userInfo.headImg } : require('../images/default_doc_img.png')}
                            defaultSource={require('../images/default_doc_img.png')}// 默认图片
                        />
                        {this.navHTML()}
                    </View>
                </LinearGradient>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.navigateBtn}
                        activeOpacity={.8}
                        onPress={() => {
                            // navigate();
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/earnings.png')}
                            />
                            <Text style={styles.navigateText}>收益</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={[styles.navigateBtn, { borderBottomWidth: global.Pixel }]}
                        activeOpacity={.8}
                        onPress={() => {
                            // navigate();
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/focus_doctor.png')}
                            />
                            <Text style={styles.navigateText}>关注医生</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navigateBtn, { borderBottomWidth: global.Pixel }]}
                        activeOpacity={.8}
                        onPress={() => {
                            navigate('PersonalInfo');
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/personal_details.png')}
                            />
                            <Text style={styles.navigateText}>个人信息</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navigateBtn]}
                        activeOpacity={.8}
                        onPress={() => {
                            navigate('Authentication');
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/authentication_info.png')}
                            />
                            <Text style={styles.navigateText}>认证信息</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={[styles.navigateBtn, { borderBottomWidth: global.Pixel }]}
                        activeOpacity={.8}
                        onPress={() => {
                            // navigate();
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/my_download.png')}
                            />
                            <Text style={styles.navigateText}>我的下载</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navigateBtn]}
                        activeOpacity={.8}
                        onPress={() => {
                            // navigate();
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/browse_record.png')}
                            />
                            <Text style={styles.navigateText}>浏览记录</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={[styles.navigateBtn, { borderBottomWidth: global.Pixel }]}
                        activeOpacity={.8}
                        onPress={() => {
                            navigate("Setting");
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/setting_up.png')}
                            />
                            <Text style={styles.navigateText}>设置</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navigateBtn]}
                        activeOpacity={.8}
                        onPress={() => {
                            // navigate();
                        }}>
                        <View style={styles.navigateBox}>
                            <Image
                                style={styles.navigateImg}
                                source={require('../images/customer_service.png')}
                            />
                            <Text style={styles.navigateText}>客服</Text>
                        </View>
                        <Image
                            style={styles.arrowRightGrey}
                            source={require('../images/arrow_right_grey.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: global.px2dp(20) }}></View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
        paddingBottom: global.TabBar,
    },
    linearGradient: {
        paddingTop: global.StatusBarHeight,
        height: global.px2dp(140) + global.StatusBarHeight,
    },
    navContent: {
        paddingLeft: global.px2dp(31),
        paddingTop: global.px2dp(44),
        paddingBottom: global.px2dp(29),
        paddingRight: global.px2dp(15),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    doctorImg: {
        width: global.px2dp(66),
        height: global.px2dp(66),
        borderRadius: global.px2dp(33),
        borderColor: global.Colors.textfff,
        borderWidth: global.Pixel,
    },
    navBox: {
        marginLeft: global.px2dp(26),
        flex: 1,
        height: global.px2dp(66),
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    topText: {
        fontSize: global.px2dp(17),
        color: global.Colors.textfff,
    },
    bottomText: {
        fontSize: global.px2dp(14),
        color: global.Colors.textfff,
    },
    // 去认证按钮
    authenticationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowRightImg: {
        marginLeft: global.px2dp(4),
    },
    content: {
        marginTop: global.px2dp(14),
        backgroundColor: global.Colors.textfff,
        borderColor: global.Colors.colorccc,
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
        paddingLeft: global.px2dp(15),
    },
    navigateBtn: {
        flex: 1,
        borderColor: global.Colors.colorccc,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: global.px2dp(48),
    },
    navigateBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navigateText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
    },
    navigateImg: {
        marginRight: global.px2dp(15),
    },
    arrowRightGrey: {
        marginRight: global.px2dp(15),
    },
});

