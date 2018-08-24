import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
export default class AssessmentDetails extends Component {
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

            answer: [],// 答案数组
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        if (this.props.navigation.state.params) {
            let scoreId = this.props.navigation.state.params.id;
            let scoreType = this.props.navigation.state.params.scoreType;
            if (scoreType == "A") {
                // 前列腺炎 nih
                this.setState({
                    isLoading: true,
                    ErrorPromptFlag: true,
                    ErrorPromptText: '加载中...',
                    ErrorPromptImg: require('../images/loading.png'),
                })
                let formData = new FormData();
                formData.append("nihCpsiScoreId", scoreId);
                fetch(requestUrl.nihAnswer, {
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
                                answer: responseData.result.optionScore.split('-'),
                            })
                            fetch(requestUrl.nihTopic, {
                                method: 'POST',
                                headers: {
                                    // 'Content-Type': 'multipart/form-data',
                                    "token": global.Token,
                                },
                            }).then((response) => response.json())
                                .then((responseData) => {
                                    console.log('responseData', responseData);
                                    if (responseData.code == 20000) {
                                        let dataArr = responseData.result;
                                        for (let i = 0; i < dataArr.length; i++) {
                                            if (dataArr[i].nihCpsiType == "a") {
                                                let tempArr = dataArr[i].childList;
                                                for (let j = 0; j < tempArr.length; j++) {
                                                    if (tempArr[j].nihCpsiType == 0) {
                                                        // 单选

                                                    } else {
                                                        // 多选
                                                        
                                                    }

                                                }
                                            } else if (dataArr[i].nihCpsiType == "b") {

                                            } else if (dataArr[i].nihCpsiType == "c") {

                                            }
                                        }
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
            } else {
                // 前列腺 ipss

            }
        }
    }
    componentDidMount() {
        // 4获取数据 在 render 后
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"评估详情"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.itemContent}>
                        <Text style={styles.problemText}>1.在直肠(肛门)和睾丸(阴囊)之间的即会阴部</Text>
                        <View style={styles.optionBox}>
                            <View style={styles.optionItem}>
                                <Image style={styles.optionImg} source={true ? require('../images/radio_yes.png') : require('../images/radio_no.png')} />
                                <Text style={[styles.optionText, { color: true ? global.Colors.color : global.Colors.text666 }]}>是</Text>
                            </View>
                            <View style={styles.optionItem}>
                                <Image style={styles.optionImg} source={false ? require('../images/radio_yes.png') : require('../images/radio_no.png')} />
                                <Text style={[styles.optionText, { color: false ? global.Colors.color : global.Colors.text666 }]}>否</Text>
                            </View>
                        </View>
                        <View style={styles.explainContent}>
                            <Text style={styles.explainTitle}>解读：</Text>
                            <View style={styles.explainBox}>
                                <Text style={styles.explainText}>是:1分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                                <Text style={styles.explainText}>否:0分</Text>
                            </View>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    itemContent: {
        marginTop: global.px2dp(15),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        paddingTop: global.px2dp(10),
    },
    problemText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        lineHeight: global.px2dp(21),
        paddingLeft: global.px2dp(10),
        paddingRight: global.px2dp(10),
    },
    optionBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: global.px2dp(23),
        marginRight: global.px2dp(23),
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: global.px2dp(26),
        marginTop: global.px2dp(5),
        marginBottom: global.px2dp(5),
        paddingTop: global.px2dp(10),
        paddingBottom: global.px2dp(10),
    },
    optionImg: {
        marginRight: global.px2dp(9),
    },
    optionText: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
    },
    explainContent: {
        borderTopWidth: global.Pixel,
        borderTopColor: global.Colors.colorccc,
        flexDirection: 'row',
        paddingTop: global.px2dp(7),
        paddingBottom: global.px2dp(11),
        paddingLeft: global.px2dp(23),
        paddingRight: global.px2dp(23),
    },
    explainTitle: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
        lineHeight: global.px2dp(27),
    },
    explainBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: global.px2dp(),
        // marginRight: global.px2dp(),
    },
    explainText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text666,
        lineHeight: global.px2dp(27),
        marginRight: global.px2dp(22),
    }
});

