import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import LinearGradient from 'react-native-linear-gradient';

export default class Earnings extends Component {
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
                        <Text style={styles.navTitle}>收益</Text>
                    </View>
                    <View style={styles.earningsContent}>
                        <View style={styles.earningsBox}>
                            <Text style={styles.earningsValue}>300</Text>
                            <Text style={styles.earningsText}>账户余额</Text>
                        </View>
                        <View style={styles.earningsLien}></View>
                        <View style={styles.earningsBox}>
                            <Text style={styles.earningsValue}>300</Text>
                            <Text style={styles.earningsText}>累计诊费收益</Text>
                        </View>
                    </View>
                </LinearGradient>
                <ScrollView>
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("WithdrawDeposit");
                            }}
                            activeOpacity={.8}
                            style={styles.itemBox}
                        >
                            <Image source={require('../images/withdraw_deposit.png')} />
                            <Text style={styles.itemText}>去提现</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("EarningsDetails");
                            }}
                            activeOpacity={.8}
                            style={[styles.itemBox, { borderBottomColor: global.Colors.text999, borderBottomWidth: global.Pixel }]}
                        >
                            <Image source={require('../images/earnings_details.png')} />
                            <Text style={styles.itemText}>查看收益明细</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("CashManagement");
                            }}
                            activeOpacity={.8}
                            style={styles.itemBox}
                        >
                            <Image source={require('../images/cash_management.png')} />
                            <Text style={styles.itemText}>提现管理</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.serviceContent}>
                        <Text style={styles.serviceTitle}>服务金额</Text>
                        <View style={styles.serviceBox}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={styles.serviceBtn}
                                onPress={() => { }}
                            >
                                <View style={styles.serviceItem}>
                                    <Text style={styles.servicePic}>30元</Text>
                                    <Text style={styles.serviceText}>服务金额</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={styles.serviceBtn}
                                onPress={() => { }}
                            >
                                <View style={styles.serviceItem}>
                                    <Text style={styles.servicePic}>30元</Text>
                                    <Text style={styles.serviceText}>服务金额</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={styles.serviceBtn}
                                onPress={() => { }}
                            >
                                <View style={styles.serviceItem}>
                                    <Text style={styles.servicePic}>30元</Text>
                                    <Text style={styles.serviceText}>服务金额</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
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
    // 导航部分 - start
    linearGradient: {
        width: global.SCREEN_WIDTH,
        height: global.px2dp(171),
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
    earningsContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    earningsBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    earningsValue: {
        fontSize: global.px2dp(26),
        color: global.Colors.textfff,
        lineHeight: global.px2dp(34),
    },
    earningsText: {
        fontSize: global.px2dp(13),
        color: global.Colors.textfff,
        lineHeight: global.px2dp(28),
    },
    earningsLien: {
        width: global.Pixel,
        height: global.px2dp(36),
        backgroundColor: global.Colors.textfff,
    },
    // 导航部分 - end
    content: {
        marginTop: global.px2dp(15),
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
        backgroundColor: global.Colors.textfff,
    },
    itemBox: {
        height: global.px2dp(48),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    itemText: {
        flex: 1,
        marginLeft: global.px2dp(16),
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
    },

    // 服务金额
    serviceContent: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    serviceTitle: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(36),
    },
    serviceBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: global.px2dp(20),
    },
    serviceItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: global.px2dp(78),
        height: global.px2dp(43),
        borderColor: global.Colors.color,
        borderWidth: global.Pixel,
        marginTop: global.px2dp(10),
        marginRight: global.px2dp(10),
        borderRadius: global.px2dp(3),
    },
    servicePic: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
    },
    serviceText: {
        fontSize: global.px2dp(9),
        color: global.Colors.text6492c8,
    }
});

