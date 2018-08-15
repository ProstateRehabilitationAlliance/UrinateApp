import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';

export default class DoctorDetails extends Component {
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

            goodAtFlag: false,
            goodAtWidth: 0,// 擅长盒子 宽
            goodAtHeight: 0,// 擅长盒子 高

            resumeFlag: false,//简介
            resumeWidth: 0,//简介盒子 宽
            resumeHeight: 0,//

            userInfo: {},
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        if (this.props.navigation.state.params) {
            this.setState({
                isLoading: true,
                ErrorPromptFlag: true,
                ErrorPromptText: '加载中...',
                ErrorPromptImg: require('../images/loading.png'),
            })
            let doctorId = this.props.navigation.state.params.doctorId;
            fetch(requestUrl.getDoctorDetailById + '?doctorId=' + doctorId, {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
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
                    } else if (responseData.code == 40001) {
                        this.props.navigation.navigate('SignIn');
                    } else {
                        this.setState({
                            isLoading: false,
                            ErrorPromptFlag: true,
                            ErrorPromptText: '查询失败',
                            ErrorPromptImg: require('../images/error.png'),
                        })
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.setState({
                                isLoading: false,
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
    render() {
        const shadowOpt = {
            width: global.px2dp(346),
            height: global.px2dp(246),
            color: "#000",
            border: 12,
            radius: global.px2dp(6),
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const goodAtShadowOpt = {
            width: this.state.goodAtWidth,
            height: this.state.goodAtHeight,
            color: "#000",
            border: 7,
            radius: global.px2dp(6),
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const resumeShadowOpt = {
            width: this.state.resumeWidth,
            height: this.state.resumeHeight,
            color: "#000",
            border: 7,
            radius: global.px2dp(6),
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }

        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}//是否动画
                    hidden={false}//是否隐藏
                    backgroundColor={'#000'}//android 设置状态栏背景颜色
                    translucent={false}//android 设置状态栏是否为透明
                    showHideTransition="fade"//IOS状态栏改变时动画 fade:默认 slide
                    networkActivityIndicatorVisible={this.state.isLoading}//IOS设定网络活动指示器(就是那个菊花)是否显示在状态栏。
                    statusBarStyle={"default"}//状态栏样式 default	默认（IOS为白底黑字、Android为黑底白字）
                    barStyle={"light-content"}// 状态栏文本的颜色。
                />
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    // locations={[0, 1]}
                    colors={global.LinearGradient}
                    style={styles.linearGradient}>
                    <View style={styles.navContent}>
                        <TouchableOpacity
                            style={styles.goBack}
                            activeOpacity={.8}
                            onPress={() => { goBack(); }}>
                            <Image
                                source={require('../images/arrow_left_white.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.navTitle}>医生详情</Text>
                    </View>
                </LinearGradient>
                <ScrollView
                    // alwaysBounceVertical={true}// ios不满一屏时弹性
                    // bounces={true}// ios弹性
                    style={styles.scrollView}>
                    <BoxShadow
                        setting={shadowOpt}>
                        <View style={styles.infoContent}>
                            <View style={styles.infoBox}>
                                <Image
                                    style={styles.headImg}
                                    source={this.state.userInfo.headImg ? { uri: this.state.userInfo.headImg } : require('../images/default_doc_img.png')} />
                                <View style={styles.textInfoBox}>
                                    <Text style={styles.textName}>{this.state.userInfo.doctorName}</Text>
                                    <Text style={[styles.textSex, { marginRight: global.px2dp(11), marginLeft: global.px2dp(11) }]}>{this.state.userInfo.doctorSex}</Text>
                                    <Text style={styles.textTitle}>{this.state.userInfo.titleName}</Text>
                                    <Text style={styles.textHospital}>{this.state.userInfo.hospitalName}</Text>
                                </View>
                                {this.state.userInfo.areFans ?
                                    // 已关注
                                    <TouchableOpacity
                                        style={styles.concernBtn}
                                        activeOpacity={.8}
                                        onPress={() => {
                                            this.unFocus();
                                        }}
                                    >
                                        <View style={styles.concernBox}>
                                            <Text style={styles.concernText}>取消关注</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    // 未关注
                                    <TouchableOpacity
                                        style={styles.concernBtn}
                                        activeOpacity={.8}
                                        onPress={() => {
                                            this.focus();
                                        }}
                                    >
                                        <View style={styles.noConcernBox}>
                                            <Text style={styles.noConcernText}>关注</Text>
                                        </View>
                                    </TouchableOpacity>
                                }

                            </View>
                            <View style={styles.statisticsBox}>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>{this.state.userInfo.patientCount}</Text>
                                    <Text style={styles.statisticsText}>帮助患者</Text>
                                </View>
                                <View style={styles.statisticsLine}></View>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>{this.state.userInfo.hitsCount}</Text>
                                    <Text style={styles.statisticsText}>访问量</Text>
                                </View>
                                <View style={styles.statisticsLine}></View>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>{this.state.userInfo.fansCount}</Text>
                                    <Text style={styles.statisticsText}>关注</Text>
                                </View>
                            </View>
                            <View style={styles.diagnoseWayBox}>
                                <View style={styles.diagnoseWayBtn}>
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_img.png')} />
                                    <Text style={styles.diagnoseWayTitle}>图文咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>{this.state.userInfo.picturePrice == 0 ? "暂未开通" : this.state.userInfo.picturePrice + '/次'}</Text>
                                </View>
                                <View style={styles.diagnoseWayBtn}>
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_tel.png')} />
                                    <Text style={styles.diagnoseWayTitle}>电话咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>{this.state.userInfo.phonePrice
                                        == 0 ? "暂未开通" : this.state.userInfo.phonePrice
                                        + '/次'}</Text>
                                </View>
                                <View style={styles.diagnoseWayBtn}>
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_video.png')} />
                                    <Text style={styles.diagnoseWayTitle}>视频咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>{this.state.userInfo.videoPrice == 0 ? "暂未开通" : this.state.userInfo.videoPrice + '/次'}</Text>
                                </View>
                                {/* <TouchableOpacity
                                    style={styles.diagnoseWayBtn}
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                >
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </BoxShadow>
                    {this.state.goodAtFlag ? <BoxShadow
                        setting={goodAtShadowOpt}>
                        <View style={styles.content}>
                            <View style={styles.titleBox}>
                                <Image
                                    style={styles.titleImg}
                                    source={require('../images/good_at.png')} />
                                <Text style={styles.titleText}>擅长</Text>
                            </View>
                            <Text style={styles.Value}>{this.state.userInfo.doctorStrong}</Text>
                        </View>
                    </BoxShadow> : <View
                        onLayout={({ nativeEvent: e }) => {
                            this.setState({
                                goodAtFlag: true,
                                goodAtHeight: e.layout.height,
                                goodAtWidth: e.layout.width,
                            })
                        }}
                        style={styles.content}>
                            <View style={styles.titleBox}>
                                <Image
                                    style={styles.titleImg}
                                    source={require('../images/good_at.png')} />
                                <Text style={styles.titleText}>擅长</Text>
                            </View>
                            <Text style={styles.Value}>{this.state.userInfo.doctorStrong}</Text>
                        </View>}

                    {this.state.resumeFlag ?
                        <BoxShadow setting={resumeShadowOpt}>
                            <View style={styles.content}>
                                <View style={styles.titleBox}>
                                    <Image
                                        style={styles.titleImg}
                                        source={require('../images/resume.png')} />
                                    <Text style={styles.titleText}>简介</Text>
                                </View>
                                <Text style={styles.Value}>{this.state.userInfo.doctorResume}</Text>
                            </View>
                        </BoxShadow>
                        :
                        <View
                            onLayout={({ nativeEvent: e }) => {
                                this.setState({
                                    resumeFlag: true,
                                    resumeHeight: e.layout.height,
                                    resumeWidth: e.layout.width,
                                })
                            }}
                            style={styles.content}>
                            <View style={styles.titleBox}>
                                <Image
                                    style={styles.titleImg}
                                    source={require('../images/resume.png')} />
                                <Text style={styles.titleText}>简介</Text>
                            </View>
                            <Text style={styles.Value}>{this.state.userInfo.doctorResume}</Text>
                        </View>
                    }
                    {/* <View style={styles.btnBox}>
                        <Button text={'申请转给他'} click={this.submit.bind(this)} style={{ borderRadius: global.px2dp(4) }} />
                    </View> */}
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View >
        );
    }
    // submit() {
    //     if (!this.state.text) {
    //         this.setState({
    //             ErrorPromptFlag: true,
    //             ErrorPromptText: '请输入内容',
    //             ErrorPromptImg: require('../images/error.png'),
    //         })
    //         clearTimeout(this.timer)
    //         this.timer = setTimeout(() => {
    //             this.setState({
    //                 ErrorPromptFlag: false,
    //             })
    //         }, global.TimingCount)
    //     } else {
    //         this.setState({
    //             isLoading: true,
    //             ErrorPromptFlag: true,
    //             ErrorPromptText: '提交中...',
    //             ErrorPromptImg: require('../images/loading.png'),
    //         })
    //         let formData = new FormData();
    //         formData.append("feedbackText", this.state.text);
    //         fetch(requestUrl.addFeedback, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 "token": global.Token,
    //             },
    //             body: formData,
    //         }).then((response) => response.json())
    //             .then((responseData) => {
    //                 console.log('responseData', responseData);
    //                 if (responseData.code == 20000) {
    //                     this.setState({
    //                         isLoading: false,
    //                         ErrorPromptFlag: true,
    //                         ErrorPromptText: '提交成功',
    //                         ErrorPromptImg: require('../images/succeed.png'),
    //                     })
    //                     clearTimeout(this.timer)
    //                     this.timer = setTimeout(() => {
    //                         this.setState({
    //                             ErrorPromptFlag: false,
    //                         })
    //                     }, global.TimingCount)
    //                 } else {
    //                     this.setState({
    //                         isLoading: false,
    //                         ErrorPromptFlag: true,
    //                         ErrorPromptText: '提交失败，请重试',
    //                         ErrorPromptImg: require('../images/error.png'),
    //                     })
    //                     clearTimeout(this.timer)
    //                     this.timer = setTimeout(() => {
    //                         this.setState({
    //                             ErrorPromptFlag: false,
    //                         })
    //                     }, global.TimingCount)
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log('error', error);
    //             });
    //     }
    // }
    // 加关注
    focus() {
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        })
        let formData = new FormData();
        formData.append("doctorId", this.state.userInfo.id);
        fetch(requestUrl.focus, {
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
                    let tempJSON = this.state.userInfo;
                    tempJSON.areFans = !this.state.userInfo.areFans;
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '关注成功',
                        ErrorPromptImg: require('../images/succeed.png'),
                        userInfo: tempJSON,
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '关注失败',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer);
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

    // 取消关注
    unFocus() {
        let formData = new FormData();
        formData.append("doctorId", this.state.userInfo.id);
        fetch(requestUrl.unFocus, {
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
                    let tempJSON = this.state.userInfo;
                    tempJSON.areFans = !this.state.userInfo.areFans;
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '取消关注成功',
                        ErrorPromptImg: require('../images/succeed.png'),
                        userInfo: tempJSON,
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '取消关注失败',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer);
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

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    // 导航部分 - start
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: global.SCREEN_WIDTH,
        height: global.px2dp(200),
    },
    scrollView: {
        position: 'absolute',
        top: global.NavHeight,
        left: 0,
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT - global.NavHeight,
    },
    navContent: {
        position: 'relative',
        height: global.NavHeight,
        paddingTop: global.StatusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBack: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: global.px2dp(15),
        paddingTop: global.px2dp(13),
        paddingRight: global.px2dp(15),
        paddingBottom: global.px2dp(13),
    },
    navTitle: {
        fontSize: global.px2dp(19),
        color: global.Colors.textfff,
    },
    // 导航部分 - end
    // 按钮盒子 - start
    btnBox: {
        marginTop: global.px2dp(19),
        marginBottom: global.px2dp(14),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    // 按钮盒子 - end
    boxShadow: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginTop: global.px2dp(15),
        // marginTop: global.NavHeight - global.px2dp(200) + global.px2dp(7),
    },
    infoContent: {
        backgroundColor: global.Colors.textfff,
        width: global.px2dp(346),
        height: global.px2dp(246),
        borderRadius: global.px2dp(6),
        paddingLeft: global.px2dp(18),
        paddingRight: global.px2dp(18),
    },
    // 基本信息 - start
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: global.px2dp(10),
        paddingBottom: global.px2dp(10),
    },
    headImg: {
        width: global.px2dp(67),
        height: global.px2dp(67),
        borderRadius: global.px2dp(33),
        marginRight: global.px2dp(15),
    },
    textInfoBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textName: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textSex: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textTitle: {
        fontSize: global.px2dp(13),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textHospital: {
        fontSize: global.px2dp(14),
        color: global.Colors.text999,
        lineHeight: global.px2dp(22),
    },
    concernBtn: {

    },
    concernBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
        width: global.px2dp(64),
        height: global.px2dp(28),
        borderRadius: global.px2dp(14),
    },
    noConcernBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: global.Pixel,
        width: global.px2dp(64),
        height: global.px2dp(28),
        borderRadius: global.px2dp(14),
        borderColor: global.Colors.color,
    },
    concernText: {
        fontSize: global.px2dp(12),
        color: global.Colors.text999,
    },
    noConcernText: {
        fontSize: global.px2dp(12),
        color: global.Colors.color,
    },
    // 统计
    statisticsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: global.Colors.colorccc,
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
    },
    statisticsItem: {
        flex: 1,
        height: global.px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    statisticsLine: {
        width: global.Pixel,
        height: global.px2dp(25),
        backgroundColor: global.Colors.colorccc,
    },
    statisticsNum: {
        fontSize: global.px2dp(18),
        color: global.Colors.color,
        lineHeight: global.px2dp(22),
    },
    statisticsPic: {
        fontSize: global.px2dp(12),
        color: global.Colors.text999,
        lineHeight: global.px2dp(20),
    },
    // 咨询方式
    diagnoseWayBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    diagnoseWayBtn: {
        flex: 1,
        alignItems: 'center',
    },
    diagnoseWayImg: {
        marginTop: global.px2dp(10),
        marginBottom: global.px2dp(4),
    },
    diagnoseWayTitle: {
        fontSize: global.px2dp(14),
        color: global.Colors.text333,
        lineHeight: global.px2dp(20),
    },
    diagnoseWayText: {
        fontSize: global.px2dp(12),
        color: global.Colors.text666,
        lineHeight: global.px2dp(17),
    },
    // 基本信息 - end

    content: {
        width: global.px2dp(345),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(6),
        paddingBottom: global.px2dp(13),
    },
    titleBox: {
        height: global.px2dp(33),
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleImg: {
        marginLeft: global.px2dp(9),
        marginRight: global.px2dp(7),
    },
    titleText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    Value: {
        fontSize: global.px2dp(14),
        color: global.Colors.text666,
        lineHeight: global.px2dp(20),
        marginRight: global.px2dp(21),
        marginLeft: global.px2dp(33),
    }
});

