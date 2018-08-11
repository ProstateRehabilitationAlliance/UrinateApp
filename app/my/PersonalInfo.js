import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Nav from "../common/Nav";// 导航组件
import ErrorPrompt from "../common/ErrorPrompt";
export default class PersonalInfo extends Component {
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
            doctorSex: "男",
            doctorAddress: "黑龙江省肇东市民权北路3号花开富贵小区6号楼3单元401室",
            doctorCardNumber: "232303197708150031",
            hospitalName: "北京大学医院",
            branchName: "泌尿外科",
            titleName: "主任医师",
            headImg: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZFQN36ialGnrTpfPn6cKuwaics5ZUuicIibz2C7FpM2obH12yXgOt4Osicl1eNl6LcmrR7z5TDhzuibSg/132",
            doctorResume: "宋勇，重点从事尿控及女性泌尿外科工作，并于2010年赴美国IOWA大学泌尿外科学习尿控及女性泌尿外科。现独立开展女性尿失禁吊带手术、复杂女性尿瘘手术、人工尿道括约肌手术、男性尿失禁吊带手术、骶神经电刺激手术等。对膀胱过度活动症、神经源性膀胱、特发性排尿困难、复杂性尿道狭窄、前列腺增生等疾病的诊治方面具有丰富经验。",
            doctorStrong: "排尿功能障碍疾病诊治，如膀胱过度活动症、间质性膀胱炎、神经源性膀胱、尿道狭窄、尿瘘、前列腺增生等疾病引起的尿频、尿急、尿失禁及排尿困难等。泌尿系统肿瘤诊治。",
            lableInquiry: "000"
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        // 获取个人信息数据-start
        return false;
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        })
        fetch(requestUrl.getDoctorDetail, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: false,
                        doctorName: "王海鹏",
                        doctorSex: "男",
                        doctorAddress: "黑龙江省肇东市民权北路3号花开富贵小区6号楼3单元401室",
                        doctorCardNumber: "232303197708150031",
                        hospitalName: "北京大学医院",
                        branchName: "泌尿外科",
                        titleName: "主任医师",
                        headImg: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZFQN36ialGnrTpfPn6cKuwaics5ZUuicIibz2C7FpM2obH12yXgOt4Osicl1eNl6LcmrR7z5TDhzuibSg/132",
                        doctorResume: "宋勇，重点从事尿控及女性泌尿外科工作，并于2010年赴美国IOWA大学泌尿外科学习尿控及女性泌尿外科。现独立开展女性尿失禁吊带手术、复杂女性尿瘘手术、人工尿道括约肌手术、男性尿失禁吊带手术、骶神经电刺激手术等。对膀胱过度活动症、神经源性膀胱、特发性排尿困难、复杂性尿道狭窄、前列腺增生等疾病的诊治方面具有丰富经验。",
                        doctorStrong: "排尿功能障碍疾病诊治，如膀胱过度活动症、间质性膀胱炎、神经源性膀胱、尿道狭窄、尿瘘、前列腺增生等疾病引起的尿频、尿急、尿失禁及排尿困难等。泌尿系统肿瘤诊治。",
                        lableInquiry: "000"
                    })
                } else if (responseData == 40004) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '您还未认证',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPromptFlag: false,
                        })
                    }, global.TimingCount)
                } else if (responseData == 50000) {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
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
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
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
        // 获取个人信息数据-end
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav isLoading={this.state.isLoading} title={"个人信息"} leftClick={this.goBack.bind(this)} />
                <ScrollView
                    style={styles.scrollView}
                >
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>基本信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => {
                                navigate('HeadImg');
                            }}>
                            <Text style={styles.itemTitle}>照片</Text>
                            <View style={styles.itemBox}>
                                <Image
                                    style={styles.headImg}
                                    source={this.state.headImg ? { uri: this.state.headImg } : require('../images/default_doc_img.png')} />
                                <Image source={require('../images/arrow_right_grey.png')} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>姓名</Text>
                            <Text style={styles.itemValue}>{this.state.doctorName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>性别</Text>
                            <Text style={styles.itemValue}>{this.state.doctorSex}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医院信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>职称</Text>
                            <Text style={styles.itemValue}>{this.state.titleName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>所在医院</Text>
                            <Text style={styles.itemValue}>{this.state.hospitalName}</Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>科室</Text>
                            <Text style={styles.itemValue}>{this.state.branchName}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医生信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => { navigate('Resume'); }}>
                            <Text style={styles.itemTitle}>个人简历</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContent}
                            activeOpacity={.8}
                            onPress={() => { navigate('GoodAt'); }}>
                            <Text style={styles.itemTitle}>擅长</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                        <View style={styles.labelContent}>
                            <TouchableOpacity
                                style={styles.labelBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <View style={[styles.labelItem, { backgroundColor: global.Colors.color749ece }]}>
                                    <Text style={[styles.labelText, { color: global.Colors.text666, }]}>图文</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.labelBtn}
                                activeOpacity={.8}
                                onPress={() => { }}>
                                <View style={styles.labelItem}>
                                    <Text style={styles.labelText}>图文</Text>
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
    scrollView: {
        marginBottom: global.IPhoneX ? 0 : global.px2dp(15),
    },
    content: {
        backgroundColor: global.Colors.textfff,
        paddingBottom: global.px2dp(8),
        marginTop: global.px2dp(15),
    },
    // title模块-start
    titleContent: {
        marginLeft: global.px2dp(15),
        height: global.px2dp(36),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    // 每行 模块 - start
    itemContent: {
        height: global.px2dp(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: global.px2dp(24),
        paddingRight: global.px2dp(15),
        borderBottomWidth: global.Pixel,
        borderBottomColor: global.Colors.colorccc,
    },
    itemTitle: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    itemValue: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    // 每行 模块 - end
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headImg: {
        width: global.px2dp(39),
        height: global.px2dp(39),
        borderRadius: global.px2dp(20),
        marginRight: global.px2dp(9),
        borderColor: global.Colors.text999,
        borderWidth: global.Pixel,
    },
    // 标签模块 - start
    labelContent: {
        marginLeft: global.px2dp(24),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    labelBtn: {

    },
    labelItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.Colors.color,
        height: global.px2dp(32),
        width: global.px2dp(70),
        borderRadius: global.px2dp(3),
        marginRight: global.px2dp(17),
        marginTop: global.px2dp(8),
        marginBottom: global.px2dp(8),
    },
    labelText: {
        fontSize: global.px2dp(14),
        color: global.Colors.textfff,
    }
    // 标签模块 - end
});

