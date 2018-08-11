import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Nav from "../common/Nav";// 导航组件
import ErrorPrompt from "../common/ErrorPrompt";
export default class GoodAt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            textareaHeight: 246,
            text: '',
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
            <View style={styles.container}>
                <Nav
                    isLoading={this.state.isLoading}
                    title={"个人简介"}
                    leftClick={this.goBack.bind(this)}
                    rightClick={this.submit.bind(this)}
                    dom={<Text style={styles.submitText}>保存</Text>}
                />
                <ScrollView>
                    <TextInput
                        style={[styles.textareaStyle, {
                            minHeight: 246,
                        }]}
                        placeholder={'请编辑您的简介…'}
                        placeholderTextColor={global.Colors.placeholder}
                        multiline={true}
                        onChangeText={(text) => {
                            if (text !== this.state.text) {
                                this.setState({
                                    text: text,
                                })
                            }
                        }}
                        defaultValue={this.state.text}
                        onContentSizeChange={this.onContentSizeChange.bind(this)}
                        underlineColorAndroid={'transparent'}
                        onBlur={this.blurReg.bind(this)}
                        keyboardType={'default'}
                    />
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    blurReg() {

    }
    onContentSizeChange(event) {
        this.setState({
            textareaHeight: event.nativeEvent.contentSize.height,
        })
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
    textareaStyle: {
        backgroundColor: global.Colors.textfff,
        paddingTop: global.px2dp(10),
        paddingLeft: global.px2dp(10),
        paddingRight: global.px2dp(10),
        paddingBottom: global.px2dp(10),
        marginTop: global.px2dp(15),
        fontSize: global.px2dp(16),
        lineHeight: global.px2dp(21),
        color: global.Colors.text333,
        textAlignVertical: 'top',
    },
    submitText: {
        fontSize: global.px2dp(16),
        color: global.Colors.textfff,
    }
});

