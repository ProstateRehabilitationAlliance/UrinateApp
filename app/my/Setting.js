import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import Nav from "../common/Nav";// 导航组件
export default class Setting extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
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
                <Nav title={"设置"} leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <View style={styles.content}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                            style={[styles.itemBtn, { borderBottomColor: global.Colors.text999, borderBottomWidth: global.Pixel }]}
                        >
                            <Text style={styles.itemTitle}>当前账号</Text>
                            <Text style={styles.itemValue}>5119803123</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                            style={styles.itemBtn}
                        >
                            <Text style={styles.itemTitle}>修改密码</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { navigate('Feedback'); }}
                            style={[styles.itemBtn, { borderBottomColor: global.Colors.text999, borderBottomWidth: global.Pixel }]}
                        >
                            <Text style={styles.itemTitle}>意见反馈</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { navigate('About'); }}
                            style={styles.itemBtn}
                        >
                            <Text style={styles.itemTitle}>关于</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnBox}>
                        <Button text={"退出登录"} click={this.loginOut.bind(this)} style={{ borderRadius: global.px2dp(3) }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    goBack() {
        this.props.navigation.goBack();
    }
    // 退出登录
    loginOut() {
        global.Alert.alert('1')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    content: {
        backgroundColor: global.Colors.textfff,
        marginTop: global.px2dp(15),
        paddingLeft: global.px2dp(15),
    },
    itemBtn: {
        height: global.px2dp(47),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: global.px2dp(15),
    },
    itemTitle: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    itemValue: {
        fontSize: global.px2dp(16),
        color: global.Colors.text444,
    },
    btnBox: {
        marginTop: global.px2dp(40),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    }
});

