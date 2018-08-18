import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
export default class EarningsDetails extends Component {
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

            dataArr: [{ id: "1" }, { id: '2' }],
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
                <Nav isLoading={this.state.isLoading} title={"流水明细"} leftClick={this.goBack.bind(this)} />
                <Text style={styles.earningsTitle}>全部流水</Text>
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.dataArr}
                    // initialNumToRender={20}
                    keyExtractor={item => item.id}
                    // ListFooterComponent={() => {
                    // 尾部组件
                    // }}
                    renderItem={({ item }) => this.renderItem(item)}
                    // 分隔线
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{
                                height: global.Pixel,
                                backgroundColor: global.Colors.text999,
                            }}></View>
                        )
                    }}
                // onRefresh={() => { }}//头部刷新组件
                // refreshing={this.state.isRefresh}//加载图标
                // onEndReached={() => this.onEndReached()} // 加载更多
                // onEndReachedThreshold={.1}// 加载更多触发时机
                // ListEmptyComponent={() => {
                //     // 无数据时显示的内容
                //     return (
                //         <View style={styles.noDataBox}>
                //             <Image source={require('../../images/no_data.png')} />
                //             <Text style={styles.noDataText}>暂无信息</Text>
                //         </View>
                //     )
                // }}
                />
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    renderItem = (item) => {
        return (
            <View style={styles.itemBox}>
                <View style={styles.leftBox}>
                    <Text style={styles.type}>提现</Text>
                    <Text style={styles.time}>2018-07-12 13:14:12</Text>
                </View>
                <Text style={[styles.pic, { color: true ? global.Colors.color : global.Colors.text333, }]}>300</Text>
            </View >
        )
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
    earningsTitle: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(55),
        paddingLeft: global.px2dp(15),
    },
    flatListStyle: {
        backgroundColor: global.Colors.textfff,
        paddingLeft: global.px2dp(15),
    },
    itemBox: {
        height: global.px2dp(63),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: global.px2dp(15),
    },
    leftBox: {

    },
    type: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(24),
    },
    time: {
        fontSize: global.px2dp(13),
        color: global.Colors.text999,
        lineHeight: global.px2dp(22),
    },
    pic: {
        fontSize: global.px2dp(19),
    }
});

