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
                <ScrollView
                    style={styles.content}
                >
                    <Text style={styles.h1Text}>“联盟平台”服务协议</Text>
                    <Text style={styles.titleText}>[一般声明]</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                    <Text style={styles.sectionText}>北京大学人民医院泌尿外科主任，医学博士主任医师 教授（二级），博士生导师，目前主要从事泌尿系统肿 瘤的基础、临床研究及临床工作，尤其是各种复杂肿 瘤的微创手术治疗。作为课题负责人主持十余项国家 及省部级基金，在SCI期刊和国家 统计源杂志发表论文160余篇，研究结果多次被 AUAWTC、ICS等国际学术年会选定为会议发言</Text>
                </ScrollView>
                <View style={styles.btnBox}>
                    <Button text={"完 成"} click={this.submit.bind(this)} />
                </View>
            </View>
        );
    }
    goBack() {
        global.Alert.alert('后退')
    }
    submit() {
        global.Alert.alert('完成')
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    content: {
        position: 'relative',
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
        marginBottom: global.TabBar + global.px2dp(85),
    },
    btnBox: {
        position: 'absolute',
        bottom: global.TabBar + global.px2dp(20),
        left: global.px2dp(15),
        width: global.px2dp(345),
    },
    h1Text: {
        textAlign: 'center',
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(63),
    },
    titleText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(27),
    },
    sectionText: {
        fontSize: global.px2dp(14),
        color: global.Colors.text555,
        lineHeight: global.px2dp(21),
        marginBottom: global.px2dp(17),
    }
});

