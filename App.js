import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
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
        {/* <FlatList
                                style={styles.flatListStyle}
                                data={this.state.titleData}
                                // initialNumToRender={20}
                                keyExtractor={item => item.id}
                                // ListFooterComponent={() => {
                                // 尾部组件
                                // }}
                                renderItem={({ item }) => this.titleRenderItem(item)}
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
                            /> */}
        // titleRenderItem = (item) => {
        //     console.log(item)
        //     const { navigate } = this.props.navigation;
        //     return (
        //         <TouchableOpacity
        //             onPress={() => {
        //                 console.log(item)
        //             }}
        //             activeOpacity={.8}
        //             key={item.id}
        //         >
        //             <View>
        //                 <Text>{item.name}</Text>
        //             </View>
        //         </TouchableOpacity>

        //     )
        // }
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
                <Nav isLoading={this.state.isLoading} title={"协议"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.btnBox}>
                        <Button text={'保存'} click={this.submit.bind(this)} />
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
    btnBox: {
        marginTop: global.px2dp(15),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
});

