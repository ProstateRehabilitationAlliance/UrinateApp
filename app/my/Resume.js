import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Nav from "../common/Nav";// 导航组件
import BasicData from "../common/BasicData";
import ErrorPrompt from "../common/ErrorPrompt";
import SQLite from '../common/SQLite';
import { sql } from "../netWork/Sql";
var sqLite = new SQLite();
var db;
export default class GoodAt extends Component {
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

            textareaHeight: 246,
            oldText: '',
            newText: '',
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        this.refs.BasicData.getLocalDoctorDetail();
    }
    render() {
        const { navigate, goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                <BasicData
                    ref="BasicData"
                    userInfo={(data) => {
                        this.setState({
                            newText: data.doctorResume,
                            oldText: data.doctorResume,
                        })
                    }}
                />
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
                            this.setState({
                                newText: text,
                            })
                        }}
                        defaultValue={this.state.newText}
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
        if (!this.state.newText) {
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
        } else if (this.state.newText == this.state.oldText) {
            this.setState({
                ErrorPromptFlag: true,
                ErrorPromptText: '请修改内容',
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
            formData.append("doctorResume", this.state.newText);
            fetch(requestUrl.updateDoctorDetail, {
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
                        this.refs.BasicData.deleteUser();
                        clearTimeout(this.timer)
                        this.timer = setTimeout(() => {
                            this.setState({
                                ErrorPromptFlag: false,
                            })
                            this.props.navigation.goBack();
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

