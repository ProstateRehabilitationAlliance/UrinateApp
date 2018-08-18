import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
import { BoxShadow } from "react-native-shadow";
export default class CashManagement extends Component {
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

            maskFlag: false,
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
        const addAccountShadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(42),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const shadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(75),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"提现管理"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("UpdatePayPassword");
                            }}
                            activeOpacity={.8}
                            style={[styles.itemBtn, {
                                borderBottomColor: global.Colors.text999, borderBottomWidth: global.Pixel
                            }]}
                        >
                            <Image source={require('../images/change_password.png')} />
                            <Text style={styles.itemText}>修改提现密码</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate("ForgetPayPassword");
                            }}
                            activeOpacity={.8}
                            style={styles.itemBtn}
                        >
                            <Image source={require('../images/forget_password.png')} />
                            <Text style={styles.itemText}>忘记提现密码</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    <BoxShadow
                        setting={addAccountShadowOpt}>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            activeOpacity={.8}
                            style={styles.addAccountBtn}
                        >
                            <View style={styles.addAccountBox}>
                                <Image style={styles.addAccountImg} source={require('../images/add_account.png')} />
                                <Text style={styles.addAccountText}>添加微信账户</Text>
                            </View>
                        </TouchableOpacity>
                    </BoxShadow>
                    <BoxShadow
                        setting={shadowOpt}>
                        <View style={styles.accountContent}>
                            <Image style={styles.weChatImg} source={require('../images/wechat.png')} />
                            <View style={styles.accountBox}>
                                <Text style={styles.accountText}><Text style={styles.accountType}>微信</Text>|<Text style={styles.accountName}>老大</Text></Text>
                                <Text style={styles.accountText}>151********59</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {

                                }}
                                activeOpacity={.8}
                                style={styles.bindBtn}
                            >
                                <View style={styles.bindBox}>
                                    <Text style={styles.bindText}>删除</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </BoxShadow>
                </ScrollView>
                {this.state.maskFlag ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        style={styles.maskContent}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.affirmContent}>
                                <View style={styles.affirmBox}>
                                    <Text style={styles.affirmText}>确定删除此次账户？</Text>
                                </View>
                                <View style={styles.btnBox}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={[styles.btnClick, { borderRightColor: global.Colors.text999, borderRightWidth: global.Pixel }]}
                                    >
                                        <Text style={styles.noBtn}>否</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={styles.btnClick}
                                    >
                                        <Text style={styles.yesBtn}>是</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    : null}
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
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    content: {
        backgroundColor: global.Colors.textfff,
        marginTop: global.px2dp(15),
        paddingLeft: global.px2dp(15),
    },
    itemBtn: {
        height: global.px2dp(46),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: global.px2dp(15),
    },
    itemText: {
        flex: 1,
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        marginLeft: global.px2dp(15),
    },
    // 添加账号
    boxShadow: {
        marginTop: global.px2dp(15),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    addAccountBox: {
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(3),
        height: global.px2dp(42),
        flexDirection: 'row',
        alignItems: 'center',
    },
    addAccountImg: {
        marginLeft: global.px2dp(19),
        marginRight: global.px2dp(10),
    },
    addAccountText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
    },
    // 账号展示
    accountContent: {
        height: global.px2dp(75),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(3),
        flexDirection: 'row',
        alignItems: 'center',
    },
    weChatImg: {
        marginLeft: global.px2dp(17),
        marginRight: global.px2dp(16),
    },
    accountBox: {
        flex: 1,
    },
    accountText: {
        color: global.Colors.text999,
        lineHeight: global.px2dp(24),
    },
    accountType: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        marginRight: global.px2dp(11),
    },
    accountName: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        marginLeft: global.px2dp(10),
    },
    bindBox: {
        marginRight: global.px2dp(10),
        marginLeft: global.px2dp(10),
        width: global.px2dp(71),
        height: global.px2dp(30),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorff0000,
        borderRadius: global.px2dp(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bindText: {
        fontSize: global.px2dp(14),
        color: global.Colors.colorff0000,
    },

    // 确认删除
    maskContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    affirmContent: {
        width: global.px2dp(285),
        height: global.px2dp(126),
        borderRadius: global.px2dp(3),
        backgroundColor: global.Colors.textfff,
    },
    affirmBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    affirmText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    btnBox: {
        height: global.px2dp(44),
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: global.Pixel,
        borderTopColor: global.Colors.text999,
    },
    btnClick: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noBtn: {
        fontSize: global.px2dp(17),
        color: global.Colors.text666,
    },
    yesBtn: {
        fontSize: global.px2dp(17),
        color: global.Colors.color,
    },

});

