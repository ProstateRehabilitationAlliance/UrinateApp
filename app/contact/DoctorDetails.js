import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';

export default class DoctorDetails extends Component {
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

            doctorName: "王海鹏",
            titleId: "67e854ad48b64d92bfd7c10d417c44f9",
            hospitalId: "2b018d7a485111e8b001d017c2d24457",
            headImg: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZFQN36ialGnrTpfPn6cKuwaics5ZUuicIibz2C7FpM2obH12yXgOt4Osicl1eNl6LcmrR7z5TDhzuibSg/132",
            doctorResume: "宋勇，重点从事尿控及女性泌尿外科工作，并于2010年赴美国IOWA大学泌尿外科学习尿控及女性泌尿外科。现独立开展女性尿失禁吊带手术、复杂女性尿瘘手术、人工尿道括约肌手术、男性尿失禁吊带手术、骶神经电刺激手术等。对膀胱过度活动症、神经源性膀胱、特发性排尿困难、复杂性尿道狭窄、前列腺增生等疾病的诊治方面具有丰富经验。",
            doctorStrong: "排尿功能障碍疾病诊治，如膀胱过度活动症、间质性膀胱炎、神经源性膀胱、尿道狭窄、尿瘘、前列腺增生等疾病引起的尿频、尿急、尿失禁及排尿困难等。泌尿系统肿瘤诊治。",
            fansCount: "1",
            patientCount: "0",
            hitsCount: "0"
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        return false;
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png')
        })
        let formData = new FormData();
        formData.append("doctorId", "3197b68a898e11e8a09b68cc6e5c9c74");
        fetch(requestUrl.getDoctorDetailById, {
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
                        ErrorPromptFlag: false,
                    })
                } else if (responseData.code == 40001) {
                    // 登录超时
                } else if (responseData.code == 50000) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png')
                    })
                } else if (responseData.code == 40004) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '加载失败，请重试',
                        ErrorPromptImg: require('../images/error.png')
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png')
                    })
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
    render() {
        const shadowOpt = {
            width: global.px2dp(346),
            height: global.px2dp(246),
            color: "#000",
            border: 12,
            radius: 0,
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
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
                <ScrollView
                    alwaysBounceVertical={false}// ios不满一屏时弹性
                    bounces={false}// ios弹性
                    style={styles.scrollView}>
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
                            <Text style={styles.navTitle}>医生详情</Text>
                        </View>
                    </LinearGradient>
                    <BoxShadow
                        setting={shadowOpt}>
                        <View style={styles.infoContent}>
                            <View style={styles.infoBox}>
                                <Image
                                    style={styles.headImg}
                                    source={this.state.headImg ? { uri: this.state.headImg } : require('../images/default_doc_img.png')} />
                                <View style={styles.textInfoBox}>
                                    <Text style={styles.textName}>{this.state.doctorName}</Text>
                                    <Text style={[styles.textSex, { marginRight: global.px2dp(11), marginLeft: global.px2dp(11) }]}>男</Text>
                                    <Text style={styles.textTitle}>职称</Text>
                                    <Text style={styles.textHospital}>北京航天总医院</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.concernBtn}
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                >
                                    <View style={styles.concernBox}>
                                        <Text style={styles.concernText}>取消关注</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.statisticsBox}>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>9459</Text>
                                    <Text style={styles.statisticsText}>帮助患者</Text>
                                </View>
                                <View style={styles.statisticsLine}></View>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>9459</Text>
                                    <Text style={styles.statisticsText}>访问量</Text>
                                </View>
                                <View style={styles.statisticsLine}></View>
                                <View style={styles.statisticsItem}>
                                    <Text style={styles.statisticsNum}>9459</Text>
                                    <Text style={styles.statisticsText}>关注</Text>
                                </View>
                            </View>
                            <View style={styles.diagnoseWayBox}>
                                <TouchableOpacity
                                    style={styles.diagnoseWayBtn}
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                >
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_img.png')} />
                                    <Text style={styles.diagnoseWayTitle}>图文咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>30.00/次</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.diagnoseWayBtn}
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                >
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_tel.png')} />
                                    <Text style={styles.diagnoseWayTitle}>电话咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>暂不开通</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.diagnoseWayBtn}
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                >
                                    <Image
                                        style={styles.diagnoseWayImg}
                                        source={require('../images/inquiry_video.png')} />
                                    <Text style={styles.diagnoseWayTitle}>视频咨询</Text>
                                    <Text style={styles.diagnoseWayPic}>暂不开通</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BoxShadow>
                    <View style={styles.content}>
                        <View style={styles.titleBox}>
                            <Image
                                style={styles.titleImg}
                                source={require('../images/good_at.png')} />
                            <Text style={styles.titleText}>擅长</Text>
                        </View>
                        <Text style={styles.Value}>{this.state.doctorStrong}</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleBox}>
                            <Image
                                style={styles.titleImg}
                                source={require('../images/resume.png')} />
                            <Text style={styles.titleText}>简介</Text>
                        </View>
                        <Text style={styles.Value}>{this.state.doctorResume}</Text>
                    </View>
                    <View style={styles.btnBox}>
                        <Button text={'申请转给他'} click={this.submit.bind(this)} style={{ borderRadius: global.px2dp(4) }} />
                    </View>
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
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
        height: global.px2dp(200),
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
    // 按钮盒子 - start
    btnBox: {
        marginTop: global.px2dp(19),
        marginBottom: global.px2dp(14),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    // 按钮盒子 - end
    boxShadow: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginTop: global.NavHeight - global.px2dp(200) + global.px2dp(7),
    },
    infoContent: {
        backgroundColor: global.Colors.textfff,
        width: global.px2dp(346),
        height: global.px2dp(246),
        borderRadius: global.px2dp(6),
        paddingLeft: global.px2dp(18),
        paddingRight: global.px2dp(18),
    },
    // 基本信息 - start
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: global.px2dp(10),
        paddingBottom: global.px2dp(10),
    },
    headImg: {
        width: global.px2dp(67),
        height: global.px2dp(67),
        borderRadius: global.px2dp(33),
        marginRight: global.px2dp(15),
    },
    textInfoBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textName: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textSex: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textTitle: {
        fontSize: global.px2dp(13),
        color: global.Colors.text333,
        lineHeight: global.px2dp(25),
    },
    textHospital: {
        fontSize: global.px2dp(14),
        color: global.Colors.text999,
        lineHeight: global.px2dp(22),
    },
    concernBtn: {

    },
    concernBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
        width: global.px2dp(64),
        height: global.px2dp(28),
        borderRadius: global.px2dp(14),
    },
    concernText: {
        fontSize: global.px2dp(12),
        color: global.Colors.text999,
    },
    // 统计
    statisticsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: global.Colors.colorccc,
        borderTopWidth: global.Pixel,
        borderBottomWidth: global.Pixel,
    },
    statisticsItem: {
        flex: 1,
        height: global.px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    statisticsLine: {
        width: global.Pixel,
        height: global.px2dp(25),
        backgroundColor: global.Colors.colorccc,
    },
    statisticsNum: {
        fontSize: global.px2dp(18),
        color: global.Colors.color,
        lineHeight: global.px2dp(22),
    },
    statisticsPic: {
        fontSize: global.px2dp(12),
        color: global.Colors.text999,
        lineHeight: global.px2dp(20),
    },
    // 咨询方式
    diagnoseWayBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    diagnoseWayBtn: {
        flex: 1,
        alignItems: 'center',
    },
    diagnoseWayImg: {
        marginTop: global.px2dp(10),
        marginBottom: global.px2dp(4),
    },
    diagnoseWayTitle: {
        fontSize: global.px2dp(14),
        color: global.Colors.text333,
        lineHeight: global.px2dp(20),
    },
    diagnoseWayText: {
        fontSize: global.px2dp(12),
        color: global.Colors.text666,
        lineHeight: global.px2dp(17),
    },
    // 基本信息 - end

    content: {
        marginTop: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginLeft: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(6),
        paddingBottom: global.px2dp(13),
    },
    titleBox: {
        height: global.px2dp(33),
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleImg: {
        marginLeft: global.px2dp(9),
        marginRight: global.px2dp(7),
    },
    titleText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    Value: {
        fontSize: global.px2dp(14),
        color: global.Colors.text666,
        lineHeight: global.px2dp(20),
        marginRight: global.px2dp(21),
        marginLeft: global.px2dp(33),
    }
});

