import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
import { BoxShadow } from "react-native-shadow";
export default class WithdrawDeposit extends Component {
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

            pic: 0,
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
            width: global.px2dp(345),
            height: global.px2dp(71),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const withdrawalShadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(171),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: { marginTop: global.px2dp(15) },
        }
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"提现"} leftClick={this.goBack.bind(this)} />
                <ScrollView style={styles.scrollView}>
                    <BoxShadow
                        setting={shadowOpt}>
                        <View style={styles.accountContent}>
                            <Image source={require('../images/wechat.png')} />
                            <Text style={styles.accountText}><Text style={styles.account}>微信（**slsdjflsj）</Text>|<Text style={styles.accountName}>账号名</Text></Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </View>
                    </BoxShadow>
                    <BoxShadow
                        setting={withdrawalShadowOpt}>
                        <View style={styles.withdrawalContent}>
                            <View style={[styles.topBox]}>
                                <Text style={styles.balance}>全部余额<Text>300</Text>元</Text>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.allBtn}
                                >
                                    <Text style={styles.allText}>全部提现</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.centerBox]}>
                                <Text style={styles.amountTitle}>提现金额</Text>
                                <View style={styles.amountBox}>
                                    <Text style={{ fontSize: global.px2dp(28), color: global.Colors.text333 }}>￥</Text>
                                    <TextInput
                                        style={styles.amountInput}
                                        placeholder={'可体现金额300'}
                                        placeholderTextColor={global.Colors.placeholder}
                                        onChangeText={(text) => this.setState({ pic: text })}
                                        underlineColorAndroid={'transparent'}
                                        keyboardType={'numeric'}
                                        // onFocus={this.doctorPhoneFocus.bind(this)}
                                        // onBlur={this.doctorPhoneBlur.bind(this)}
                                        maxLength={11}
                                    />
                                </View>
                            </View>
                            <View style={[styles.bottomBox]}>
                                <Text style={styles.errorText}>金额超出可体现余额</Text>
                                <Text style={styles.remindText}>预计两个小时到账</Text>
                            </View>
                        </View>
                    </BoxShadow>

                    <View style={styles.btnBox}>
                        <Button style={{ borderRadius: global.px2dp(3) }} text={'确认提现'} click={this.submit.bind(this)} />
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
        paddingTop: global.px2dp(15),
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    accountContent: {
        height: global.px2dp(71),
        backgroundColor: global.Colors.textfff,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: global.px2dp(3),
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    accountText: {
        flex: 1,
        alignItems: 'center',
        color: global.Colors.text999,
    },
    account: {
        marginLeft: global.px2dp(8),
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    accountName: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    btnBox: {
        marginTop: global.px2dp(27),
    },

    withdrawalContent: {
        width: global.px2dp(345),
        height: global.px2dp(171),
        borderRadius: global.px2dp(3),
        backgroundColor: global.Colors.textfff,
        paddingLeft: global.px2dp(21),
        paddingRight: global.px2dp(30),
    },
    topBox: {
        height: global.px2dp(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    balance: {
        fontSize: global.px2dp(16),
        color: global.Colors.text666,
    },
    allText: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
        lineHeight: global.px2dp(40),
    },
    centerBox: {
        flex: 1,
        borderColor: global.Colors.text999,
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
    },
    amountTitle: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(43),
    },
    amountInput: {
        flex: 1,
        alignItems: 'center',
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
    },
    bottomBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: global.px2dp(40),
    },
    amountBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorText: {
        fontSize: global.px2dp(13),
        color: global.Colors.colorff0000,
    },
    remindText: {
        fontSize: global.px2dp(13),
        color: global.Colors.text666,
    }
});

