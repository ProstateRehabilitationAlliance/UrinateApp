import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import Nav from "../common/Nav";// 导航组件
export default class Protocol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
        // const { navigate, goBack } = this.props.navigation;
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
                <Nav title={"协议"} leftClick={this.goBack.bind(this)} />
                <ScrollView>

                </ScrollView>
            </View>
        );
    }
    goBack() {
        global.Alert.alert('后退')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    }
});

