import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { createSwitchNavigator, createBottomTabNavigator } from "react-navigation";

// 首页tab图标-start
const IndexIcon = require('./images/tab_index.png');
const IndexEleIcon = require('./images/tab_ele_index.png');
const ContactIcon = require('./images/tab_contact.png');
const ContactEleIcon = require('./images/tab_ele_contact.png');
const StudyIcon = require('./images/tab_study.png');
const StudyEleIcon = require('./images/tab_ele_study.png');
const MyIcon = require('./images/tab_my.png');
const MyEleIcon = require('./images/tab_ele_my.png');
// 首页tab图标-end

// 页面引入-start

import Start from "./Start";// 启动页

import SignUp from "./sign/SignUp";// 注册
import SignIn from "./sign/SignIn";// 登录
import SignCodeIn from "./sign/SignCodeIn";// 验证码登录
import ForgetPassword from "./sign/ForgetPassword";// 忘记密码

import IndexTab from "./home/Home";// 工作台
import ContactTab from "./contact/Contact";// 通讯录
import StudyTab from "./study/Study";// 直播课
import MyTab from "./my/My";// 个人中心
// 页面引入-end

// tab-start
const TabOptions = (tabBarTitle, normalImage, selectedImage) => {
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({ tintColor, focused }) => {
        return (
            <View style={styles.tabBox}>
                <Image
                    source={!focused ? normalImage : selectedImage}
                    style={[styles.tabImg, { tintColor: tintColor }]}
                />
                <Text style={[{
                    color: focused ? '#2c6cb5' : '#999999',
                    paddingTop: Platform.OS === 'ios' ? 4 : 0,
                }, styles.tabText]}>{tabBarTitle}</Text>
            </View>
        )
    });
    const tabBarVisible = true;
    return { tabBarLabel, tabBarIcon, tabBarVisible };
};
const MainView = createBottomTabNavigator({
    TabHomePage: {
        screen: IndexTab,
        navigationOptions: () => TabOptions('工作台', IndexIcon, IndexEleIcon),
    },
    TabContactPage: {
        screen: ContactTab,
        navigationOptions: () => TabOptions('通讯录', ContactIcon, ContactEleIcon),
    },
    TabStudyPage: {
        screen: StudyTab,
        navigationOptions: () => TabOptions('直播课', StudyIcon, StudyEleIcon),
    },
    TabMyPage: {
        screen: MyTab,
        navigationOptions: () => TabOptions('个人中心', MyIcon, MyEleIcon),
    },
}, {
        initialRouteName: "TabHomePage",//第一次加载时初始选项卡路由的routeName
        swipeEnabled: false,//滑动切换
        animationEnabled: false,//点击切换是否有滑动效果
        backBehavior: 'none',//返回键是否回到换到初始路由
        lazy: true,
        tabBarOptions: {
            labelStyle: {//标签栏文字的样式
                padding: 0,
                margin: 0,
                fontSize: 12,
            },
            tabStyle: {//选项卡的样式。
                height: 50,
            },
            style: {//标签栏的样式
                // height: 50,
            },
            activeBackgroundColor: 'white',// 活动选项卡的背景颜色(选中)
            activeTintColor: '#2c6cb5',// 活动选项卡的标签和图标颜色(选中)
            inactiveBackgroundColor: 'white',//非活动选项卡的背景颜色。(未选中)
            inactiveTintColor: '#999999',//非活动选项卡的标签和图标颜色。(未选中)
            showIcon: true,
            showLabel: false,
            pressOpacity: 0.8,
            indicatorStyle: {
                height: 0,
            }
        },
    });
// tab 样式
const styles = StyleSheet.create({
    tabBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabImg: {
        width: 22,
        height: 22,
    },
    tabText: {
        fontSize: 12,
    },
});
// tab-end

export default createSwitchNavigator(
    {
        Start: {
            screen: Start,//启动页
        },
        SignUp: {
            screen: SignUp,//注册
        },
        SignIn: {
            screen: SignIn,//登录
        },
        SignCodeIn: {
            screen: SignCodeIn,//验证码登录
        },
        ForgetPassword: {
            screen: ForgetPassword,//忘记密码
        },
        Home: {
            screen: MainView,//工作台
        },
        ContactTab: {
            screen: ContactTab,//通讯录
        },
        StudyTab: {
            screen: StudyTab,//直播课
        },
        My: {
            screen: MyTab,// 个人中心
        },
    }, {
        initialRouteName: "Home",
    }
);
