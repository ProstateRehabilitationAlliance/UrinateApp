import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, TextInput } from 'react-native';
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

            labelText: '',

            maskFlag: false,

            maskLabelFlag: true,
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
                        <Text style={styles.navTitle}>订单详情</Text>
                    </View>
                </LinearGradient>
                <ScrollView style={styles.scrollView}>
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
                    <View style={{ height: global.px2dp(15) }}></View>
                </ScrollView>
                {this.state.maskFlag ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        style={styles.maskContent}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.affirmContent}>
                                <View style={styles.affirmBox}>
                                    <Text style={styles.affirmText}>确定删除此次账户？</Text>
                                </View>
                                <View style={styles.btnBox}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={[styles.btnClick, { borderRightColor: global.Colors.text999, borderRightWidth: global.Pixel }]}
                                    >
                                        <Text style={styles.noBtnText}>否</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={styles.btnClick}
                                    >
                                        <Text style={styles.yesBtnText}>是</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    : null}
                {this.state.maskLabelFlag ?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.maskLabel}
                        onPress={() => {
                            this.setState({
                                maskLabelFlag: !this.state.maskLabelFlag
                            })
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.maskLabelContent}>
                                <View style={styles.labelTitleBox}>
                                    <Text style={styles.labelTitleText}>请为该患者添加标签</Text>
                                </View>
                                <View style={styles.labelContent}>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={styles.labelBtn}
                                    >
                                        <View style={styles.labelBox}>
                                            <Text style={styles.labelText}>腺增生</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={styles.labelBtn}
                                    >
                                        <View style={styles.labelBox}>
                                            <Text style={styles.labelText}>前列腺增生</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        onPress={() => { }}
                                        style={styles.labelBtn}
                                    >
                                        <View style={styles.labelBox}>
                                            <Text style={styles.labelText}>前列腺增生</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.separateText}>自定义</Text>
                                <TextInput
                                    style={[styles.textareaStyle, {
                                        minHeight: 100,
                                    }]}
                                    placeholder={'请输入用户标签...'}
                                    placeholderTextColor={global.Colors.placeholder}
                                    multiline={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            labelText: text,
                                        })
                                    }}
                                    onContentSizeChange={this.onContentSizeChange.bind(this)}
                                    underlineColorAndroid={'transparent'}
                                    onBlur={this.blurReg.bind(this)}
                                    keyboardType={'default'}
                                />
                                <TouchableOpacity
                                    onPress={() => { }}
                                    activeOpacity={.8}
                                    style={styles.addLabelBtn}
                                >
                                    <View style={styles.addLabelBox}>
                                        <Text style={styles.addLabelText}>保存</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    : null}
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View >
        );
    }
    blurReg() {

    }
    onContentSizeChange(event) {
        this.setState({
            textareaHeight: event.nativeEvent.contentSize.height,
        })
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
        height: global.px2dp(126),
    },
    scrollView: {
        position: 'absolute',
        top: global.NavHeight,
        height: global.SCREEN_HEIGHT - global.NavHeight,
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
        // marginTop: global.NavHeight - global.px2dp(126) + global.px2dp(10),
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
        borderTopWidth: global.Pixel,
        borderTopColor: global.Colors.colorccc,
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

    // 确认删除
    maskContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    affirmContent: {
        width: global.px2dp(285),
        height: global.px2dp(126),
        borderRadius: global.px2dp(3),
        backgroundColor: global.Colors.textfff,
    },
    affirmBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    affirmText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    btnBox: {
        height: global.px2dp(44),
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: global.Pixel,
        borderTopColor: global.Colors.text999,
    },
    btnClick: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noBtnText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text666,
    },
    yesBtnText: {
        fontSize: global.px2dp(17),
        color: global.Colors.color,
    },

    // 添加标签 部分 - start
    maskLabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maskLabelContent: {
        width: global.px2dp(345),
        height: global.px2dp(375),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(3),
    },
    labelTitleBox: {
        paddingLeft: global.px2dp(10),
        height: global.px2dp(45),
        justifyContent: 'center',
        backgroundColor: global.Colors.bgColor,
        borderBottomColor: global.Colors.colorccc,
        borderBottomWidth: global.Pixel,
    },
    labelTitleText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
    },
    labelContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: global.px2dp(18),
        paddingRight: global.px2dp(18),
        paddingBottom: global.px2dp(9),
        paddingTop: global.px2dp(5),
    },
    labelBox: {
        marginRight: global.px2dp(12),
        marginTop: global.px2dp(12),
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
        borderRadius: global.px2dp(6),
        backgroundColor: global.Colors.color,
    },
    labelText: {
        fontSize: global.px2dp(),
        lineHeight: global.px2dp(32),
        color: global.Colors.textfff,
    },
    separateText: {
        fontSize: global.px2dp(15),
        color: global.Colors.text333,
        lineHeight: global.px2dp(42),
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    textareaStyle: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        backgroundColor: global.Colors.bgColor,
        paddingLeft: global.px2dp(8),
        paddingRight: global.px2dp(8),
        paddingTop: global.px2dp(8),
        paddingBottom: global.px2dp(8),
        fontSize: global.px2dp(13),
        lineHeight: global.px2dp(20),
    },
    addLabelBtn: {

    },
    addLabelBox: {
        width: global.px2dp(250),
        height: global.px2dp(42),
        borderRadius: global.px2dp(5),
        backgroundColor: global.Colors.color,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: global.px2dp(21),
        marginLeft: global.px2dp(48),
    },
    addLabelText: {
        fontSize: global.px2dp(16),
        color: global.Colors.textfff,
    }

    // 添加标签 部分 - end
});

