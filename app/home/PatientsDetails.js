import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, TextInput, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import { BoxShadow } from 'react-native-shadow';
import LinearGradient from "react-native-linear-gradient";
export default class Patients extends Component {
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

            searchText: '',
            patientsData: [{ id: '1' }, { id: '2' }],
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
        const baseInfoShadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(73),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: styles.baseInfoBoxShadow,
        }

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
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    // locations={[0, 1]}
                    colors={global.LinearGradient}
                    style={styles.linearGradient}>
                    <View style={styles.navContent}>
                        <TouchableOpacity
                            style={styles.goBack}
                            activeOpacity={.8}
                            onPress={() => { goBack(); }}>
                            <Image
                                source={require('../images/arrow_left_white.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.navTitle}>患者详情</Text>
                    </View>
                </LinearGradient>
                <ScrollView style={styles.scrollView}>
                    <BoxShadow
                        setting={baseInfoShadowOpt}>
                        <View style={styles.baseInfoContent}>
                            <View style={styles.baseInfoBox}>
                                <Text style={styles.baseInfoText}>王胖虎 男 45岁</Text>
                                <Text style={styles.telText}>手机号 :16619703541</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.rotatePatientBtn}
                            >
                                <View style={styles.rotatePatientBox}>
                                    <Text style={styles.rotatePatientText}>申请转诊</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </BoxShadow>
                    <View style={styles.content}>
                        <View style={styles.titleBox}>
                            <View style={styles.titleLine}></View>
                            <Text style={styles.titleText}>既往病史</Text>
                        </View>
                        <View style={styles.medicalHistoryItem}>
                            <Text style={styles.medicalHistoryTitle}>正在服用药物</Text>
                            <Text style={styles.medicalHistoryValue}>阿莫西林、 阿莫西林、 阿莫西林、 阿莫西林、 </Text>
                        </View>
                        <View style={styles.medicalHistoryItem}>
                            <Text style={styles.medicalHistoryTitle}>药物过敏史</Text>
                            <Text style={styles.medicalHistoryValue}>阿莫西林、 阿莫西林、 阿莫西林、 阿莫西林、 </Text>
                        </View>
                        <View style={styles.medicalHistoryItem}>
                            <Text style={styles.medicalHistoryTitle}>手术史</Text>
                            <Text style={styles.medicalHistoryValue}>阿莫西林、 阿莫西林、 阿莫西林、 阿莫西林、 </Text>
                        </View>
                        <View style={styles.medicalHistoryItem}>
                            <Text style={styles.medicalHistoryTitle}>既往病史</Text>
                            <Text style={styles.medicalHistoryValue}></Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleBox}>
                            <View style={styles.titleLine}></View>
                            <Text style={styles.titleText}>患者标签</Text>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.addLabelBtn}
                            >
                                <Text style={styles.addLabelText}>自定义标签</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.labelContent}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={styles.labelBtn}
                                onPress={() => { }}
                            >
                                <View style={styles.labelBox}>
                                    <Text style={styles.labelText}>前列腺增</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.swiperContent}>
                        <ScrollView
                            style={styles.tabScrollView}
                            showsHorizontalScrollIndicator={true}
                        >
                            <View style={styles.tabContent}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    activeOpacity={.8}
                                    style={styles.tabBtn}
                                >
                                    <View style={styles.tabBox}>
                                        <Text style={styles.tabText}>上传报告</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    activeOpacity={.8}
                                    style={styles.tabBtn}
                                >
                                    <View style={styles.tabBox}>
                                        <Text style={styles.tabText}>问诊记录</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    activeOpacity={.8}
                                    style={styles.tabBtn}
                                >
                                    <View style={styles.tabBox}>
                                        <Text style={styles.tabText}>评估记录</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    activeOpacity={.8}
                                    style={styles.tabBtn}
                                >
                                    <View style={styles.tabBox}>
                                        <Text style={styles.tabText}>报告解读记录</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </ScrollView>

                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View >
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
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    // 导航部分 - start
    linearGradient: {
        height: global.px2dp(107),
    },
    navContent: {
        position: 'relative',
        height: global.NavHeight,
        paddingTop: global.StatusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBack: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: global.px2dp(15),
        paddingTop: global.px2dp(13),
        paddingRight: global.px2dp(15),
        paddingBottom: global.px2dp(13),
    },
    navTitle: {
        fontSize: global.px2dp(19),
        color: global.Colors.textfff,
    },
    // 导航部分 - end
    scrollView: {
        position: 'absolute',
        top: global.NavHeight,
        left: 0,
        height: global.SCREEN_HEIGHT - global.NavHeight,
    },
    baseInfoBoxShadow: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    baseInfoContent: {
        backgroundColor: global.Colors.textfff,
        height: global.px2dp(73),
        borderRadius: global.px2dp(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: global.px2dp(14),
        paddingRight: global.px2dp(14),
    },
    baseInfoBox: {

    },
    baseInfoText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    telText: {
        fontSize: global.px2dp(16),
        lineHeight: global.px2dp(25),
        color: global.Colors.text333,
    },
    rotatePatientBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: global.px2dp(27),
        height: global.px2dp(27),
        width: global.px2dp(79),
        backgroundColor: global.Colors.color,
    },
    rotatePatientText: {
        fontSize: global.px2dp(12),
        color: global.Colors.textfff,
    },
    // 基本信息-end
    content: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        paddingBottom: global.px2dp(15),
    },
    titleBox: {
        position: 'relative',
        height: global.px2dp(35),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: global.px2dp(15),
    },
    titleLine: {
        width: global.px2dp(3),
        height: global.px2dp(15),
        backgroundColor: global.Colors.color,
    },
    titleText: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        marginLeft: global.px2dp(5),
    },
    addLabelBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    addLabelText: {
        fontSize: global.px2dp(13),
        lineHeight: global.px2dp(35),
        color: global.Colors.color,
        paddingRight: global.px2dp(21),
    },
    medicalHistoryItem: {
        marginLeft: global.px2dp(22),
        marginRight: global.px2dp(15),
        borderBottomWidth: global.Pixel,
        borderBottomColor: global.Colors.text999,
    },
    medicalHistoryTitle: {
        fontSize: global.px2dp(14),
        color: global.Colors.text666,
        lineHeight: global.px2dp(25),
    },
    medicalHistoryValue: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(21),
    },
    labelContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    labelBox: {
        marginRight: global.px2dp(6),
        marginTop: global.px2dp(10),
        backgroundColor: global.Colors.color,
        paddingLeft: global.px2dp(10),
        paddingBottom: global.px2dp(10),
        paddingTop: global.px2dp(10),
        paddingRight: global.px2dp(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: global.px2dp(3),
    },
    labelText: {
        fontSize: global.px2dp(13),
        color: global.Colors.textfff,
    },
    swiperContent: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        borderBottomWidth: global.Pixel,
        borderBottomColor: global.Colors.text999,
    },
    tabContent: {
        height: global.px2dp(43),
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabBox: {
        height: global.px2dp(43),
        borderBottomWidth: global.px2dp(2),
        borderBottomColor: global.Colors.color,
        justifyContent: 'center',
        marginRight: global.px2dp(14),
        marginLeft: global.px2dp(14),
        // borderBottomColor: global.Colors.transparent,
    },
    tabText: {
        fontSize: global.px2dp(17),
        color: global.Colors.color,
    }
});

