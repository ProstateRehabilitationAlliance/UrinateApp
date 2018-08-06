import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio,
    Platform,
    Alert,
    StatusBar,
    ToastAndroid,
    BackHandler,
    DeviceEventEmitter,
} from 'react-native';
import Colors from './colors';
import Px2dp from './textSize';
// import { isIphoneX } from 'react-native-iphone-x-helper';
let { height, width } = Dimensions.get('window');
export let global = {
    IOS: (Platform.OS === 'ios'),// 系统是iOS
    Android:  (Platform.OS === 'android'),// 系统是安卓
    SCREEN_WIDTH: width,// 获取屏幕宽度
    SCREEN_HEIGHT: height,// 获取屏幕高度
    PixelRatio: PixelRatio.get(),// 获取屏幕分辨率
    Pixel: 1 / PixelRatio.get(),// 最小线宽
    Colors: Colors,// 常用颜色
    px2dp: Px2dp,// 屏幕适配
    Alert: Alert,// 弹出框
    StatusBarHeight: StatusBar.currentHeight,// 安卓 StatusBar 高度
};
// 判断iPhoneX
// global.IPhoneX = isIphoneX();
// // IOS StatusBar 高度
// global.IOSStatusBarHeight = 20;
// // IOS TabBar 高度
// global.IOSTabBarHeight = 34;
// global.IOSNavHeight = 64;
