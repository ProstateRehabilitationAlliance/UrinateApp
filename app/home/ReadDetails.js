import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
export default class ReadDetails extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

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
                <Nav isLoading={this.state.isLoading} title={"解读报告详情"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.reportContent}>
                        <View style={styles.titleBox}>
                            <View style={styles.titleLine}></View>
                            <Text style={styles.titleText}>化验单结果</Text>
                        </View>
                        <Text style={styles.value}>您白细胞数异常，若存在尿路刺激症状如尿 频尿急等则考虑可能为泌尿系感染(如肾盂 肾炎)或急性细菌性前列腺炎等，医生会结 合症状评分及您的综合情况做出诊断；</Text>
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
    reportContent: {
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        marginLeft: global.px2dp(15),
        marginTop: global.px2dp(15),
        marginRight: global.px2dp(15),
        paddingTop: global.px2dp(5),
    },
    titleBox: {
        height: global.px2dp(30),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: global.px2dp(7),
    },
    titleLine: {
        width: global.px2dp(3),
        height: global.px2dp(16),
        backgroundColor: global.Colors.color,
        borderRadius: global.px2dp(3),
    },
    titleText: {
        fontSize: global.px2dp(17),
        color: global.Colors.color,
        marginLeft: global.px2dp(4),
    },
    value: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        lineHeight: global.px2dp(21),
        marginLeft: global.px2dp(14),
        marginRight: global.px2dp(9),
        marginBottom: global.px2dp(15),
    },
});

