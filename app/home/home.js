import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            authenticationFlag: false,
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        // 4获取数据 在 render 后
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
                            onPress={() => { }}>
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
                            <Text style={styles.scrollText}>{this.state.authenticationFlag ? "医院科室" : "你好！欢迎来到栗子医学"}</Text>
                            <View style={styles.offcutBox}></View>
                        </View>
                        {/* 条幅-end */}

                        <View style={styles.headContent}>
                            <View style={styles.titleLine}></View>
                            <View style={styles.headBox}>
                                {this.state.authenticationFlag ?
                                    <Text style={styles.headText}>"医生名"医生工作站</Text>
                                    :
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                    >
                                        <Text style={styles.headText}>你暂时还未认证，请先 <Text style={{ color: global.Colors.color347fc2 }}>去认证</Text></Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {/* 统计部分-start */}
                        <View style={styles.statisticsContent}>
                            <View style={styles.statisticsItem}>
                                <Text style={[styles.statisticsNum, { color: this.state.authenticationFlag ? global.Colors.color : global.Colors.text555, }]}>{this.state.authenticationFlag ? "9999" : "暂无数据"}</Text>
                                <Text style={styles.statisticsText}>访问量</Text>
                            </View>
                            <View style={styles.statisticsLine}></View>
                            <View style={styles.statisticsItem}>
                                <Text style={[styles.statisticsNum, { color: this.state.authenticationFlag ? global.Colors.color : global.Colors.text555, }]}>{this.state.authenticationFlag ? "9999" : "暂无数据"}</Text>
                                <Text style={styles.statisticsText}>已帮助位患者</Text>
                            </View>
                        </View>
                        {/* 统计部分-end */}

                        {/* 三大模块-start */}
                        <View style={styles.moduleContent}>
                            <TouchableOpacity
                                style={styles.moduleBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
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
        // shadowColor: 'red',
        // shadowOpacity: 1,
        // shadowOffset: 10,
        // shadowRadius: 10,
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
        // shadowOffset: { width: 0, height: 0 },
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
});

