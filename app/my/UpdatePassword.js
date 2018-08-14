import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
export default class Protocol extends Component {
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

            oldPassword: '',// 旧密码
            newPassword: '',// 新密码
            confirmPassword: '',// 确认新密码
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
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"设置密码"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.center}>
                        <View style={styles.itemBox}>
                            <Text style={styles.itemTitle}>旧密码</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'请输入旧密码'}
                                placeholderTextColor={global.Colors.placeholder}
                                onChangeText={(text) => this.setState({ oldPassword: text })}
                                underlineColorAndroid={'transparent'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                onFocus={this.oldPasswordFocus.bind(this)}
                                onBlur={this.oldPasswordBlur.bind(this)}
                            />
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => {
                                    navigate("ForgetPassword");
                                }}
                                style={styles.forgetBtn}
                            >
                                <Text style={styles.forgetText}>忘记原密码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.itemBox}>
                            <Text style={styles.itemTitle}>新密码</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'请输入新密码'}
                                placeholderTextColor={global.Colors.placeholder}
                                onChangeText={(text) => this.setState({ newPassword: text })}
                                underlineColorAndroid={'transparent'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                onFocus={this.newPasswordFocus.bind(this)}
                                onBlur={this.newPasswordBlur.bind(this)}
                            />
                        </View>
                        <View style={[styles.itemBox, { borderTopWidth: global.Pixel, borderTopColor: global.Colors.text999 }]}>
                            <Text style={styles.itemTitle}>确认密码</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'请输入密码'}
                                placeholderTextColor={global.Colors.placeholder}
                                onChangeText={(text) => this.setState({ confirmPassword: text })}
                                underlineColorAndroid={'transparent'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                onFocus={this.confirmPasswordFocus.bind(this)}
                                onBlur={this.confirmPasswordBlur.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.btnBox}>
                        <Button text={'确 认'} style={{ borderRadius: global.px2dp(3) }} click={this.submit.bind(this)} />
                    </View>
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    goBack() {
        this.props.navigation.goBack();
    }
    oldPasswordFocus() { }
    oldPasswordBlur() { }
    newPasswordFocus() { }
    newPasswordBlur() { }
    confirmPasswordFocus() { }
    confirmPasswordBlur() { }
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
    center: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
    },
    itemBox: {
        height: global.px2dp(47),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    itemTitle: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        width: global.px2dp(80),
    },
    forgetText: {
        fontSize: global.px2dp(13),
        color: global.Colors.color,
    },
    // 账号输入框
    textInput: {
        flex: 1,
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        height: global.px2dp(42),
        fontWeight: "500",
        padding: 0,
    },
    btnBox: {
        marginTop: global.px2dp(37),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
});

