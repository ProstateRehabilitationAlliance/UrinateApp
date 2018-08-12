import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from "react-native-linear-gradient";// 
import ErrorPrompt from "../common/ErrorPrompt";

export default class OrderDetails extends Component {
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
                <ScrollView>
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
                            <Text style={styles.navTitle}>订单详情</Text>
                        </View>
                    </LinearGradient>
                    {/* 基本信息 - start */}
                    <View style={styles.infoContent}>
                        <View style={styles.infoTopBox}>
                            <View style={styles.infoTextBox}>
                                <Text style={styles.infoText}>王二牛 男 45岁</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.yesBtn}
                            >
                                <View style={styles.yesBox}>
                                    <Text style={styles.yesText}>申请转诊</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoBottomBox}>
                            <Text style={styles.infoValue}>手 机 号 :</Text>
                            <Text style={styles.infoValue}>身份证号 :</Text>
                            <Text style={styles.infoValue}>创建时间 :</Text>
                        </View>
                    </View>
                    {/* 基本信息 - end */}
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>问题描述</Text>
                            </View>
                        </View>
                        <Text style={styles.problemText}>吕医生你好,上月底带父亲来你院找你看过现将吃了25付药的感受给你描述下:整个左腿胀痛感减轻，腹股沟的疼痛也缓解，走路也比服药前有力,体位改变如坐下,起立等比以前自如疼痛也有缓解</Text>
                        <View style={styles.lastItem}>
                            <Text style={styles.picText}>￥30</Text>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.yesBtn}
                            >
                                <View style={styles.yesBox}>
                                    <Text style={styles.yesText}>拒绝申请</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>附件拍照</Text>
                            </View>
                        </View>
                        <View style={styles.annexContent}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.annexBtn}
                            >
                                <Image style={styles.annexImg} source={{ uri: 'https://checkup-records-1256660245.cosbj.myqcloud.com/43f3e86d46934b47bc5c417400f692e5.png' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医生回复</Text>
                            </View>
                        </View>
                        <Text style={styles.problemText}>吕医生你好,上月底带父亲来你院找你看过现将吃了25付药的感受给你描述下:整个左腿胀痛感减轻，腹股沟的疼痛也缓解，走路也比服药前有力,体位改变如坐下,起立等比以前自如疼痛也有缓解</Text>
                        <View style={styles.lastItem}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.draftBtn}
                            >
                                <View style={styles.draftBox}>
                                    <Text style={styles.draftText}>保存为草稿</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.yesBtn}
                            >
                                <View style={styles.yesBox}>
                                    <Text style={styles.yesText}>确认回复</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    // 导航部分 - start
    linearGradient: {
        height: global.px2dp(126),
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

    // 基本信息 - start
    infoContent: {
        backgroundColor: global.Colors.textfff,
        marginTop: global.NavHeight - global.px2dp(126) + global.px2dp(10),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        borderRadius: global.px2dp(5),
    },
    infoTopBox: {
        height: global.px2dp(35),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: global.px2dp(15),
        marginLeft: global.px2dp(15),
        borderBottomWidth: global.Pixel,
        borderBottomColor: global.Colors.text999,
    },
    infoTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    infoBottomBox: {
        marginLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
        paddingBottom: global.px2dp(6),
        paddingTop: global.px2dp(6),
    },
    infoValue: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(21),
    },
    annexContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
        paddingRight: global.px2dp(6),
    },
    annexBtn: {

    },
    annexImg: {
        width: global.px2dp(45),
        height: global.px2dp(45),
        borderRadius: global.px2dp(5),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
        marginLeft: global.px2dp(8),
        marginRight: global.px2dp(8),
        marginBottom: global.px2dp(8),
    },
    // 基本信息 - end
    content: {
        marginTop: global.px2dp(15),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        borderRadius: global.px2dp(5),
        backgroundColor: global.Colors.textfff,
    },
    problemText: {
        fontSize: global.px2dp(15),
        color: global.Colors.text666,
        lineHeight: global.px2dp(21),
        marginLeft: global.px2dp(22),
        marginRight: global.px2dp(16),
    },
    picText: {
        fontSize: global.px2dp(19),
        color: global.Colors.color,
    },
    // title模块-start
    titleContent: {
        height: global.px2dp(36),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    titleLeftBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleLine: {
        marginRight: global.px2dp(7),
        width: global.px2dp(3),
        height: global.px2dp(14),
        borderRadius: global.px2dp(2),
        backgroundColor: global.Colors.color5286C2,
    },
    titleText: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
    },
    hintText: {
        fontSize: global.px2dp(13),
        color: global.Colors.text999,
    },
    upFileBox: {
        marginLeft: global.px2dp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgBtn: {
        marginRight: global.px2dp(11),
    },
    // title模块 - end
    lastItem: {
        height: global.px2dp(43),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    yesBtn: {

    },
    yesBox: {
        width: global.px2dp(79),
        height: global.px2dp(27),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.Colors.color,
        borderRadius: global.px2dp(13),
    },
    yesText: {
        fontSize: global.px2dp(13),
        color: global.Colors.textfff,
    },
    draftBtn: {

    },
    draftBox: {
        width: global.px2dp(79),
        height: global.px2dp(27),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(13),
        borderColor: global.Colors.text999,
        borderWidth: global.Pixel,
    },
    draftText: {
        fontSize: global.px2dp(13),
        color: global.Colors.text888,
    },
});

