import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
import ErrorPrompt from "../common/ErrorPrompt";
import { BoxShadow } from 'react-native-shadow';
import { Storage } from "../utils/AsyncStorage";
import QRCode from 'react-native-qrcode';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            userInfo: {},
            signStatus: '',// 认证状态
            QRCodeContentFlag: false,

            maskContentFlag: false,
            goodsPrice: 30,

        }
    }

    // 获取后台认证状态
    getSignStates() {
        fetch(requestUrl.getSignStatus, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    // 认证成功
                    this.setState({
                        signStatus: 'AUTHENTICATION_SUCCESS'
                    })
                    this.queryCount();
                    this.getDoctorDetail();
                } else if (responseData.code == 40002) {
                    // 认证中
                    this.setState({
                        signStatus: 'AUTHENTICATION_PROGRESS',
                        ErrorPromptFlag: false,
                        isLoading: false,
                    })
                } else if (responseData.code == 40003) {
                    // 认证信息审核失败
                    this.setState({
                        signStatus: 'AUTHENTICATION_FAILED',
                        ErrorPromptFlag: false,
                        isLoading: false,
                    })
                } else if (responseData.code == 40004) {
                    // 认证信息未填写
                    this.setState({
                        signStatus: 'AUTHENTICATION_EMPTY',
                        ErrorPromptFlag: false,
                        isLoading: false,
                    })
                } else {
                    this.setState({
                        signStatus: 'AUTHENTICATION_EMPTY',
                        ErrorPromptFlag: false,
                        isLoading: false,
                    })
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
    // 获取个人信息
    getDoctorDetail() {
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
                    });
                    Storage.setItem("userInfo", responseData.result, (data) => {
                        console.log(data)
                    });
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
    }
    queryCount() {
        fetch(requestUrl.queryCount, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    if (responseData.result == 0) {
                        this.setState({
                            maskContentFlag: !this.state.maskContentFlag,
                        })
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
    // 设置金额
    addGoods() {
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '提交中...',
            ErrorPromptImg: require('../images/loading.png'),
        })
        let formData = new FormData();
        formData.append("goodsPrice", this.state.goodsPrice);
        formData.append("goodsType", "GOODS_INQUIRY_PICTURE");
        fetch(requestUrl.addGoods, {
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
                            maskContentFlag: !this.state.maskContentFlag,
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
                            maskContentFlag: !this.state.maskContentFlag,
                        })
                    }, global.TimingCount)
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    componentDidMount() {
        Storage.removeItem("userInfo", () => { })
        Storage.getItem("userInfo", (data) => {
            if (data) {
                console.log(data)
                this.setState({
                    userInfo: data,
                    signStatus: 'AUTHENTICATION_SUCCESS',
                })
                this.queryCount();
            } else {
                this.setState({
                    isLoading: true,
                    ErrorPromptFlag: true,
                    ErrorPromptText: '加载中...',
                    ErrorPromptImg: require('../images/loading.png'),
                });
                this.getSignStates();
            }
        })
    }
    scrollText() {
        if (this.state.signStatus == "AUTHENTICATION_SUCCESS") {
            return (<Text style={styles.scrollText}>{this.state.userInfo.hospitalName}{this.state.userInfo.branchName}</Text>)
        } else {
            return (<Text style={styles.scrollText}>你好！欢迎来到栗子医学</Text>)
        }
    }
    headTextHtml() {
        if (this.state.signStatus == "AUTHENTICATION_SUCCESS") {
            return (<Text style={styles.headText}>{this.state.userInfo.doctorName}医生工作站</Text>)
        } else if (this.state.userInfo.signStatus == "AUTHENTICATION_EMPTY") {
            return (
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        this.props.navigation.navigate('Approve');
                    }}
                >
                    <Text style={styles.headText}>你暂时还未认证，请先 <Text style={{ color: global.Colors.color347fc2 }}>去认证</Text></Text>
                </TouchableOpacity>
            )
        } else if (this.state.signStatus == "AUTHENTICATION_FAILED") {
            return (
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        this.props.navigation.navigate('Approve');
                    }}
                >
                    <Text style={styles.headText}>认证失败，请重新认证 <Text style={{ color: global.Colors.color347fc2 }}>去认证</Text></Text>
                </TouchableOpacity>
            )
        } else if (this.state.signStatus == "AUTHENTICATION_PROGRESS") {
            return (<Text style={styles.headText}>认证信息审核中...</Text>)
        }
    }


    render() {
        const shadowOpt = {
            width: global.px2dp(340),
            height: global.px2dp(258),
            color: "#000",
            border: 20,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const { navigate, goBack } = this.props.navigation;
        return (
            <ScrollView
                style={styles.container}
                alwaysBounceVertical={true}// ios不满一屏时弹性
                bounces={false}// ios弹性
            >
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
                        <Image
                            style={styles.allianceName}
                            source={require('../images/alliance_name.png')}
                        />
                        <View style={styles.separateLine}></View>
                        <TouchableOpacity
                            style={styles.QRCodeBtn}
                            activeOpacity={.8}
                            onPress={() => {
                                this.setState({
                                    QRCodeContentFlag: !this.state.QRCodeContentFlag
                                })
                            }}>
                            <Image
                                source={require('../images/qr_code_btn.png')}
                            />
                            <Text style={styles.QRCodeText}>我的二维码</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <BoxShadow
                    setting={shadowOpt}>
                    <View style={styles.content}>
                        {/* 条幅-start */}
                        <View style={styles.scrollContent}>
                            {this.scrollText()}
                            <View style={styles.offcutBox}></View>
                        </View>
                        {/* 条幅-end */}

                        <View style={styles.headContent}>
                            <View style={styles.titleLine}></View>
                            <View style={styles.headBox}>
                                {this.headTextHtml()}
                            </View>
                        </View>
                        {/* 统计部分-start */}
                        <View style={styles.statisticsContent}>
                            <View style={styles.statisticsItem}>
                                <Text style={[styles.statisticsNum, { color: this.state.authenticationFlag ? global.Colors.color : global.Colors.text555, fontSize: this.state.authenticationFlag ? global.px2dp(20) : global.px2dp(12) }]}>{this.state.authenticationFlag ? "9999" : "暂无数据"}</Text>
                                <Text style={styles.statisticsText}>访问量</Text>
                            </View>
                            <View style={styles.statisticsLine}></View>
                            <View style={styles.statisticsItem}>
                                <Text style={[styles.statisticsNum, { color: this.state.authenticationFlag ? global.Colors.color : global.Colors.text555, fontSize: this.state.authenticationFlag ? global.px2dp(20) : global.px2dp(12) }]}>{this.state.authenticationFlag ? "9999" : "暂无数据"}</Text>
                                <Text style={styles.statisticsText}>已帮助位患者</Text>
                            </View>
                        </View>
                        {/* 统计部分-end */}

                        {/* 三大模块-start */}
                        <View style={styles.moduleContent}>
                            <TouchableOpacity
                                style={styles.moduleBtn}
                                activeOpacity={.8}
                                onPress={() => {
                                    navigate("Order");
                                }}>
                                <Image
                                    style={styles.moduleImg}
                                    source={require('../images/inquiry.png')}
                                />
                                <Text style={styles.moduleText}>问诊</Text>
                                {this.state.authenticationFlag ? <View style={styles.countBox}>
                                    <Text style={styles.countText}>99+</Text>
                                </View> : null}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.moduleBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <Image
                                    style={styles.moduleImg}
                                    source={require('../images/patient.png')}
                                />
                                <Text style={styles.moduleText}>患者管理</Text>
                                {this.state.authenticationFlag ? <View style={styles.countBox}>
                                    <Text style={styles.countText}>99+</Text>
                                </View> : null}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.moduleBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <Image
                                    style={styles.moduleImg}
                                    source={require('../images/shift_examine.png')}
                                />
                                <Text style={styles.moduleText}>转诊管理</Text>
                                {this.state.authenticationFlag ? <View style={styles.countBox}>
                                    <Text style={styles.countText}>99+</Text>
                                </View> : null}
                            </TouchableOpacity>
                        </View>
                        {/* 三大模块-end */}

                    </View>
                </BoxShadow>
                <View style={styles.titleBox}>
                    <View style={styles.titleLine}></View>
                    <Text style={styles.titleText}>院内公告</Text>
                </View>
                <View style={styles.bannerContent}>
                    <Image style={styles.bannerImg} source={require('../images/banner.png')} />
                </View>
                {this.state.QRCodeContentFlag ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                QRCodeContentFlag: !this.state.QRCodeContentFlag
                            })
                        }}
                        style={styles.maskContent}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.QRCodeContent}>
                                <View style={styles.QRTitleBox}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        style={styles.closeBtn}
                                        onPress={() => {
                                            this.setState({
                                                QRCodeContentFlag: !this.state.QRCodeContentFlag
                                            })
                                        }}
                                    >
                                        <Text style={styles.closeText}>返回</Text>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    style={styles.QCHeadImg}
                                    source={this.state.userInfo.headImg ? { uri: this.state.userInfo.headImg } : require('../images/default_doc_img.png')} />
                                <Text style={styles.QCDoctorName}>{this.state.userInfo.doctorName}</Text>
                                <Text style={styles.QCDoctorTitle}>{this.state.userInfo.titleName}</Text>
                                <LinearGradient
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#fff', '#999', '#fff']}
                                    style={{
                                        width: global.px2dp(225),
                                        height: global.Pixel,
                                        // height: global.px2dp(5),
                                        marginTop: global.px2dp(8),
                                        marginBottom: global.px2dp(8),
                                        backgroundColor: 'red',
                                    }}>
                                </LinearGradient>

                                <View style={styles.countContent}>
                                    <View style={styles.countItem}>
                                        <Text>555</Text>
                                        <Text>访问量</Text>
                                    </View>
                                    <View style={styles.countLine}></View>
                                    <View style={styles.countItem}>
                                        <Text>555</Text>
                                        <Text>访问量</Text>
                                    </View>
                                </View>
                                <View style={styles.QRImgBox}>
                                    <QRCode
                                        value={global.Token}
                                        size={141}
                                        bgColor='#000'
                                        fgColor='white' />
                                </View>
                                <Text style={styles.QRText}>微信扫一扫</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    : null}
                {this.state.maskContentFlag ? <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            maskContentFlag: !this.state.maskContentFlag
                        })
                    }}
                    style={styles.maskContent}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                    >
                        <View style={styles.amountContent}>
                            <View style={styles.amountTitleBox}>
                                <Text style={styles.amountTitleText}>请选择你的服务金额</Text>
                            </View>
                            <View style={styles.amountCenterBox}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            goodsPrice: 30,
                                        })
                                    }}
                                    style={styles.amountItem}
                                >
                                    <View style={[styles.amountBox, this.state.goodsPrice == 30 ? { backgroundColor: global.Colors.color } : null]}>
                                        <Text style={[styles.picText, this.state.goodsPrice == 30 ? { color: global.Colors.textfff } : null]}>30元</Text>
                                        <Text style={[styles.descText, this.state.goodsPrice == 30 ? { color: global.Colors.textfff } : null]}>问诊金额</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            goodsPrice: 60,
                                        })
                                    }}
                                    style={styles.amountItem}
                                >
                                    <View style={[styles.amountBox, this.state.goodsPrice == 60 ? { backgroundColor: global.Colors.color } : null]}>
                                        <Text style={[styles.picText, this.state.goodsPrice == 60 ? { color: global.Colors.textfff } : null]}>60元</Text>
                                        <Text style={[styles.descText, this.state.goodsPrice == 60 ? { color: global.Colors.textfff } : null]}>问诊金额</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            goodsPrice: 80,
                                        })
                                    }}
                                    style={styles.amountItem}
                                >
                                    <View style={[styles.amountBox, this.state.goodsPrice == 80 ? { backgroundColor: global.Colors.color } : null]}>
                                        <Text style={[styles.picText, this.state.goodsPrice == 80 ? { color: global.Colors.textfff } : null]}>80元</Text>
                                        <Text style={[styles.descText, this.state.goodsPrice == 80 ? { color: global.Colors.textfff } : null]}>问诊金额</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            goodsPrice: 100,
                                        })
                                    }}
                                    style={styles.amountItem}
                                >
                                    <View style={[styles.amountBox, this.state.goodsPrice == 100 ? { backgroundColor: global.Colors.color } : null]}>
                                        <Text style={[styles.picText, this.state.goodsPrice == 100 ? { color: global.Colors.textfff } : null]}>100元</Text>
                                        <Text style={[styles.descText, this.state.goodsPrice == 100 ? { color: global.Colors.textfff } : null]}>问诊金额</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            goodsPrice: 120,
                                        })
                                    }}
                                    style={styles.amountItem}
                                >
                                    <View style={[styles.amountBox, this.state.goodsPrice == 120 ? { backgroundColor: global.Colors.color } : null]}>
                                        <Text style={[styles.picText, this.state.goodsPrice == 120 ? { color: global.Colors.textfff } : null]}>120元</Text>
                                        <Text style={[styles.descText, this.state.goodsPrice == 120 ? { color: global.Colors.textfff } : null]}>问诊金额</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.amountBtnBox}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            maskContentFlag: !this.state.maskContentFlag,
                                        })
                                    }}
                                    style={[styles.amountBtn, styles.noBtn]}
                                >
                                    <Text style={[styles.btnText, styles.noBtnText]}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.addGoods();
                                    }}
                                    style={[styles.amountBtn, styles.yesBtn]}
                                >
                                    <Text style={[styles.btnText, styles.yesBtnText]}>确认</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity> : null}
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.textfff,
    },
    linearGradient: {
        paddingTop: global.StatusBarHeight,
        height: global.px2dp(143) + global.StatusBarHeight,
    },
    navContent: {
        paddingLeft: global.px2dp(10),
        paddingRight: global.px2dp(10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: global.px2dp(30),
        marginBottom: global.px2dp(23),
    },
    separateLine: {
        width: global.Pixel,
        height: global.px2dp(34),
        backgroundColor: global.Colors.textfff,
    },
    QRCodeBtn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    QRCodeText: {
        marginTop: global.px2dp(5),
        fontSize: global.px2dp(12),
        color: global.Colors.textfff,
    },

    // 主体部分
    boxShadow: {
        marginTop: global.px2dp(-45),
        marginBottom: global.px2dp(6),
        marginLeft: global.px2dp(20),
    },
    content: {
        width: global.px2dp(340),
        height: global.px2dp(258),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 0 },
        // shadowRadius: 6,
        // shadowOpacity: .2,
    },
    // 条幅-start
    scrollContent: {
        position: 'relative',
        justifyContent: 'center',
        maxWidth: global.px2dp(257),
        height: global.px2dp(32),
        borderTopRightRadius: global.px2dp(16),
        borderBottomRightRadius: global.px2dp(16),
        marginLeft: global.px2dp(-5),
        marginTop: global.px2dp(12),
        backgroundColor: global.Colors.color347fc2,
    },
    scrollText: {
        paddingLeft: global.px2dp(13),
        color: global.Colors.textfff,
        fontSize: global.px2dp(17),
    },
    offcutBox: {
        position: 'absolute',
        bottom: global.px2dp(-5),
        left: 0,
        width: 0,
        height: 0,
        borderColor: global.Colors.color,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        transform: [{ rotate: '45deg' }],
        borderRadius: 6,
        borderTopWidth: global.px2dp(6),
        borderBottomWidth: global.px2dp(6),
        borderRightWidth: global.px2dp(6),
        borderLeftWidth: global.px2dp(6),
    },
    // 条幅-end

    // 统计部分
    statisticsContent: {
        marginRight: global.px2dp(22),
        marginLeft: global.px2dp(22),
        height: global.px2dp(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: "#cdcdcd",
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
        // borderRightColor: "transparent",
        // borderWidth: global.Pixel,
        // borderStyle: 'dotted',
    },
    statisticsItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statisticsNum: {
        fontSize: global.px2dp(20),
    },
    statisticsText: {
        marginTop: global.px2dp(9),
        fontSize: global.px2dp(10),
        color: global.Colors.text999,
    },
    statisticsLine: {
        backgroundColor: global.Colors.colorccc,
        width: global.px2dp(2),
        height: global.px2dp(18),
    },
    // 三大模块 -start
    moduleContent: {
        marginRight: global.px2dp(22),
        marginLeft: global.px2dp(22),
        height: global.px2dp(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    moduleBtn: {
        position: 'relative',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    moduleImg: {
        marginBottom: global.px2dp(9),
    },
    moduleText: {
        color: global.Colors.text333,
        fontSize: global.px2dp(13),
    },
    countBox: {
        position: 'absolute',
        top: global.px2dp(3),
        right: global.px2dp(15),
        alignItems: 'center',
        justifyContent: 'center',
        width: global.px2dp(22),
        height: global.px2dp(14),
        backgroundColor: global.Colors.colorFD2C2D,
        borderTopRightRadius: global.px2dp(6),
        borderBottomRightRadius: global.px2dp(6),
        borderTopLeftRadius: global.px2dp(6),
    },
    countText: {
        fontSize: global.px2dp(10),
        color: global.Colors.textfff,
    },
    // 三大模块 - end
    // 大标题-start
    headContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: global.px2dp(15),
        marginTop: global.px2dp(18),
        marginBottom: global.px2dp(16),
    },
    headBox: {
        alignItems: 'center',
    },
    headText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text555,
    },
    // 大标题-end
    // 标题-院内公告 -start
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginBottom: global.px2dp(18),
        marginTop: global.px2dp(18),
    },
    titleLine: {
        backgroundColor: global.Colors.color,
        width: global.px2dp(3),
        height: global.px2dp(15),
        borderRadius: global.px2dp(3),
        marginRight: global.px2dp(7),
    },
    titleText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text555,
    },
    // 标题-院内公告 - end

    // 轮播图
    bannerContent: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginBottom: global.px2dp(20),
    },
    bannerImg: {
        width: global.px2dp(346),
    },
    // 二维码 box - start
    maskContent: {
        position: 'absolute',
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    QRCodeContent: {
        overflow: 'hidden',
        alignItems: 'center',
        width: global.px2dp(273),
        height: global.px2dp(376),
        borderRadius: global.px2dp(5),
        backgroundColor: global.Colors.textfff,
    },
    QRTitleBox: {
        width: global.px2dp(273),
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: global.px2dp(50),
        backgroundColor: global.Colors.color,
    },
    closeBtn: {
    },
    closeText: {
        fontSize: global.px2dp(14),
        lineHeight: global.px2dp(50),
        color: global.Colors.textfff,
        paddingRight: global.px2dp(17),
        paddingLeft: global.px2dp(17),
    },
    QCHeadImg: {
        width: global.px2dp(70),
        height: global.px2dp(70),
        borderColor: global.Colors.textfff,
        borderWidth: global.Pixel,
        borderRadius: global.px2dp(35),
        marginTop: - global.px2dp(35),
        marginBottom: global.px2dp(7),
    },
    QCDoctorName: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        lineHeight: global.px2dp(23),
    },
    QCDoctorTitle: {
        fontSize: global.px2dp(15),
        color: global.Colors.text333,
        lineHeight: global.px2dp(22),
    },
    countContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: global.px2dp(190),
        height: global.px2dp(36),
    },
    countItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countLine: {
        height: global.px2dp(17),
        width: global.Pixel,
        backgroundColor: global.Colors.colorccc,
    },
    QRImgBox: {
        width: global.px2dp(150),
        height: global.px2dp(150),
        borderWidth: global.Pixel,
        borderColor: global.Colors.text999,
        borderRadius: global.px2dp(5),
        padding: global.px2dp(3),
        marginTop: global.px2dp(8)
    },
    QRText: {
        fontSize: global.px2dp(13),
        color: global.Colors.text999,
        lineHeight: global.px2dp(32),
    },
    // 二维码 box - end

    // 金额选择 -start
    amountContent: {
        position: 'relative',
        justifyContent: 'space-between',
        width: global.px2dp(340),
        height: global.px2dp(250),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        overflow: 'hidden',
    },
    amountTitleBox: {
        height: global.px2dp(48),
        justifyContent: 'center',
        paddingLeft: global.px2dp(15),
        backgroundColor: global.Colors.bgColor,
    },
    amountTitleText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    amountCenterBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: global.px2dp(10),
    },
    amountItem: {

    },
    amountBox: {
        width: global.px2dp(89),
        height: global.px2dp(42),
        borderWidth: global.Pixel,
        borderColor: global.Colors.color,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: global.px2dp(10),
        marginBottom: global.px2dp(10),
        marginRight: global.px2dp(10),
        marginLeft: global.px2dp(10),
        borderRadius: global.px2dp(3),
    },
    picText: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
    },
    descText: {
        fontSize: global.px2dp(9),
        color: "#6492c8",
    },
    amountBtnBox: {
        borderTopWidth: global.Pixel,
        borderTopColor: global.Colors.colorccc,
        height: global.px2dp(47),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amountBtn: {
        height: global.px2dp(47),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noBtn: {
        borderRightWidth: global.Pixel,
        borderRightColor: global.Colors.colorccc,
    },
    btnText: {
        fontSize: global.px2dp(17),
    },
    noBtnText: {
        color: global.Colors.text666,
    },
    yesBtnText: {
        color: global.Colors.color,
    },
    // 金额选择 - end
});

