import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
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
        // 3 渲染 render
        // 变量声明
        const { navigate, goBack } = this.props.navigation;
        {/* <View style={styles.container} >
                    <Text> 我的</Text>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: 'https://img1.360buyimg.com/da/jfs/t23440/198/1552616732/96159/b2b38b62/5b62c871N7bc2b6fd.jpg' }}
                        defaultSource={require('../images/radio_yes.png')}// 默认图片
                    />
                    <TouchableOpacity activeOpacity={.8}
                        onPress={() => this.click()}>
                        <Text>点击</Text>
                    </TouchableOpacity>
                </View> */}
        return (
            <ScrollView style={styles.container}>
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
                            style={styles.allianceName}
                            source={require('../images/alliance_name.png')}
                        />
                        <View style={styles.separateLine}></View>
                        <TouchableOpacity
                            style={styles.QRCodeBtn}
                            activeOpacity={.8}
                            onPress={() => {}}>
                            <Image
                            source={require('../images/qr_code_btn.png')}
                        />
                            <Text style={styles.QRCodeText}>我的二维码</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={styles.content}>
                <View style={styles.titleBox}>
                    <View style={styles.titleLine}></View>
                    <Text style={styles.titleText}>李林玉医生工作站</Text>
                </View>
                {/* 统计部分-start */}
                <View style={styles.statisticsContent}>
                    <View style={styles.statisticsItem}>
                        <Text style={styles.statisticsNum}>暂无数据</Text>
                        <Text style={styles.statisticsText}>已帮助位患者</Text>
                    </View>
                    <View style={styles.statisticsLine}></View>
                    <View style={styles.statisticsItem}>
                        <Text style={styles.statisticsNum}>暂无数据</Text>
                        <Text style={styles.statisticsText}>已帮助位患者</Text>
                    </View>
                </View>
                {/* 统计部分-end */}

                {/* 三大模块-start */}
                    <View style={styles.moduleContent}>
                        <TouchableOpacity
                            style={styles.moduleBtn}
                            activeOpacity={.8}
                            onPress={() => {}}>
                            <Image
                            style={styles.moduleImg}
                            source={require('../images/inquiry.png')}
                        />
                            <Text style={styles.moduleText}>问诊</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.moduleBtn}
                            activeOpacity={.8}
                            onPress={() => {}}>
                            <Image
                            style={styles.moduleImg}
                            source={require('../images/patient.png')}
                        />
                            <Text style={styles.moduleText}>患者管理</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.moduleBtn}
                            activeOpacity={.8}
                            onPress={() => {}}>
                            <Image
                            style={styles.moduleImg}
                            source={require('../images/shift_examine.png')}
                        />
                            <Text style={styles.moduleText}>转诊管理</Text>
                        </TouchableOpacity>
                    </View>
                {/* 三大模块-end */}

                </View>
                <View style={styles.titleBox}>
                    <View style={styles.titleLine}></View>
                    <Text style={styles.titleText}>院内公告</Text>
                </View>
                <View style={styles.bannerContent}>
                    <Image source={require('../images/banner.png')}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
        paddingBottom: global.TabBar,
    },
    linearGradient: {
        paddingTop: global.StatusBarHeight,
        height: global.px2dp(163),
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
    content: {
        marginTop: global.px2dp(-45),
        marginBottom: global.px2dp(6),
        marginLeft: global.px2dp(20),
        width: global.px2dp(340),
        height: global.px2dp(258),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
    },
    // 统计部分
    statisticsContent: {
        marginRight: global.px2dp(22),
        marginLeft: global.px2dp(22),
        height: global.px2dp(63),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: "#cdcdcd",
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
        // borderStyle: 'dotted',
    },
    statisticsItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statisticsNum: {
        fontSize: global.px2dp(20),
        color: global.Colors.color,
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
    // 三大模块
    moduleContent: {
        marginRight: global.px2dp(22),
        marginLeft: global.px2dp(22),
        height: global.px2dp(101),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    moduleBtn: {
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
    // 标题
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
    },
    titleText: {
        marginLeft: global.px2dp(7),
        fontSize: global.px2dp(16),
        color: global.Colors.text555,
    },
    // 轮播图
    bannerContent: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    }

});

