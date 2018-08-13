import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Nav from "../common/Nav";// 导航组件
import ErrorPrompt from "../common/ErrorPrompt";
import SQLite from '../common/SQLite';
import { sql } from "../netWork/Sql";
var sqLite = new SQLite();
var db;
export default class PersonalInfo extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            userInfo: {},//用户信息
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
                    userInfo: results.rows.item(0)
                })
                if (!results.rows.item(0).doctorName) {
                    this.getDoctorDetail();
                }
            })
        }, (error) => {
            console.log(error);
        });
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"个人信息"} leftClick={this.goBack.bind(this)} />
                <ScrollView
                    style={styles.scrollView}
                >
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>基本信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => {
                                navigate('HeadImg');
                            }}>
                            <Text style={styles.itemTitle}>照片</Text>
                            <View style={styles.itemBox}>
                                <Image
                                    style={styles.headImg}
                                    source={this.state.headImg ? { uri: this.state.userInfo.headImg } : require('../images/default_doc_img.png')} />
                                <Image source={require('../images/arrow_right_grey.png')} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>姓名</Text>
                            <Text style={styles.itemValue}>{this.state.userInfo.doctorName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>性别</Text>
                            <Text style={styles.itemValue}>{this.state.userInfo.doctorSex}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医院信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>职称</Text>
                            <Text style={styles.itemValue}>{this.state.userInfo.titleName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>所在医院</Text>
                            <Text style={styles.itemValue}>{this.state.userInfo.hospitalName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>科室</Text>
                            <Text style={styles.itemValue}>{this.state.userInfo.branchName}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医生信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => { navigate('Resume'); }}>
                            <Text style={styles.itemTitle}>个人简历</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => { navigate('GoodAt'); }}>
                            <Text style={styles.itemTitle}>擅长</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <View style={styles.labelContent}>
                            {/* <TouchableOpacity
                                style={styles.labelBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <View style={[styles.labelItem, { backgroundColor: global.Colors.color749ece }]}>
                                    <Text style={[styles.labelText, { color: global.Colors.text666, }]}>图文</Text>
                                </View>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={styles.labelBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <View style={styles.labelItem}>
                                    <Text style={styles.labelText}>图文</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View >
        );
    }
    goBack() {
        this.props.navigation.goBack();
    }
    submit() {
        if (!this.state.text) {
            this.setState({
                ErrorPromptFlag: true,
                ErrorPromptText: '请输入内容',
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
                isLoading: true,
                ErrorPromptFlag: true,
                ErrorPromptText: '提交中...',
                ErrorPromptImg: require('../images/loading.png'),
            })
            let formData = new FormData();
            formData.append("feedbackText", this.state.text);
            fetch(requestUrl.addFeedback, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    if (responseData.code == 20000) {
                        this.setState({
                            isLoading: false,
                            ErrorPromptFlag: true,
                            ErrorPromptText: '提交成功',
                            ErrorPromptImg: require('../images/succeed.png'),
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
                            ErrorPromptText: '提交失败，请重试',
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
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    scrollView: {
        marginBottom: global.IPhoneX ? 0 : global.px2dp(15),
    },
    content: {
        backgroundColor: global.Colors.textfff,
        paddingBottom: global.px2dp(8),
        marginTop: global.px2dp(15),
    },
    // title模块-start
    titleContent: {
        marginLeft: global.px2dp(15),
        height: global.px2dp(36),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleLeftBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleLine: {
        marginRight: global.px2dp(7),
        width: global.px2dp(3),
        height: global.px2dp(14),
        borderRadius: global.px2dp(2),
        backgroundColor: global.Colors.color5286C2,
    },
    titleText: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
    },
    hintText: {
        fontSize: global.px2dp(13),
        color: global.Colors.text999,
    },
    upFileBox: {
        marginLeft: global.px2dp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgBtn: {
        marginRight: global.px2dp(11),
    },
    // title模块 - end
    // 每行 模块 - start
    itemContent: {
        height: global.px2dp(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: global.px2dp(24),
        paddingRight: global.px2dp(15),
        borderBottomWidth: global.Pixel,
        borderBottomColor: global.Colors.colorccc,
    },
    itemTitle: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    itemValue: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    // 每行 模块 - end
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headImg: {
        width: global.px2dp(39),
        height: global.px2dp(39),
        borderRadius: global.px2dp(20),
        marginRight: global.px2dp(9),
        borderColor: global.Colors.text999,
        borderWidth: global.Pixel,
    },
    // 标签模块 - start
    labelContent: {
        marginLeft: global.px2dp(24),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    labelBtn: {

    },
    labelItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.Colors.color,
        height: global.px2dp(32),
        width: global.px2dp(70),
        borderRadius: global.px2dp(3),
        marginRight: global.px2dp(17),
        marginTop: global.px2dp(8),
        marginBottom: global.px2dp(8),
    },
    labelText: {
        fontSize: global.px2dp(14),
        color: global.Colors.textfff,
    }
    // 标签模块 - end
});

