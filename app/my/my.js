import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
export default class My extends Component {
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
                            source={require('../images/default_doc_img.png')}
                            defaultSource={require('../images/default_doc_img.png')}// 默认图片
                        />
                        <View style={styles.navBox}>
                            <Text style={styles.topText}>188****0533</Text>
                            <TouchableOpacity
                                style={styles.authenticationBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <Text style={styles.bottomText}>未认证</Text>
                                <Image
                                    style={styles.arrowRightImg}
                                    source={require('../images/arrow_right_white.png')}
                                />
                            </TouchableOpacity>
                        </View>
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

