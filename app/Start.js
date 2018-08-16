import React, { Component } from 'react';
import { StyleSheet, Text, Platform, Image, StatusBar, ScrollView, } from 'react-native';
import { regExp } from './netWork/RegExp';// 正则
import { requestUrl } from './netWork/Url';// IP地址
import { global } from './utils/Global';// 常量
import { Storage } from "./utils/AsyncStorage";
export default class Start extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }
    componentDidMount() {
        Storage.getItem('token', (data) => {
            if (data) {
                global.Token = data;
                // 获取认证状态 判断登录状态
                fetch(requestUrl.getSignStatus, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "token": global.Token,
                    },
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log('responseData', responseData);
                        if (responseData.code == 40001) {
                            // 未登录
                            this.props.navigation.navigate("SignIn");
                        } else {
                            this.props.navigation.navigate("Home");
                        }
                    })
                    .catch(
                        (error) => {
                            console.log('error', error);
                        });
            } else {
                this.props.navigation.navigate("SignIn");
            }
        })
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <StatusBar
                    animated={true}//是否动画
                    hidden={true}//是否隐藏
                    backgroundColor={'#000'}//android 设置状态栏背景颜色
                    translucent={false}//android 设置状态栏是否为透明
                    showHideTransition="fade"//IOS状态栏改变时动画 fade:默认 slide
                    networkActivityIndicatorVisible={this.state.isLoading}//IOS设定网络活动指示器(就是那个菊花)是否显示在状态栏。
                    statusBarStyle={"default"}//ios:白底黑字  android:黑底白字
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: global.Colors.bgColor,
        // paddingTop: 20,
        // paddingBottom: global.TabBar,
    }
});

