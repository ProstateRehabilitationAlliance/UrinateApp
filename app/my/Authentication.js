import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";
import Nav from "../common/Nav";
import ErrorPrompt from "../common/ErrorPrompt";
export default class Authentication extends Component {
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

            doctorName: "",
            doctorSex: "",
            doctorCardNumber: "",

            hospitalId: "",// 医院id
            branchId: "",// 科室id
            titleId: "",// 职称id
            idCardFront: "",//
            doctorCardFront: "",//医师执业证正面照片地址
            workCard: "",//手持工牌照片地址
            approveStatus: "",// 认证状态
            // AUTHENTICATION_PROGRESS  审核中
            // AUTHENTICATION_SUCCESS 认证成功
            // AUTHENTICATION_FAILED 认证失败
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        // 查询认证信息-start
        fetch(requestUrl.getAuthentication, {
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
                        approveStatus: responseData.result.approveStatus,
                        branchId: responseData.result.branchId,
                        doctorCardFront: responseData.result.doctorCardFront,
                        idCardFront: responseData.result.idCardFront,
                        titleId: responseData.result.titleId,
                        workCard: responseData.result.workCard,
                    })
                } else if (responseData.code == 40001) {
                    // 登录超时

                } else if (responseData.code == 50000) {
                    this.setState({
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPrompt: false,
                        })
                    }, global.TimingCount)
                } else {
                    this.setState({
                        ErrorPromptFlag: true,
                        ErrorPromptText: '服务器繁忙',
                        ErrorPromptImg: require('../images/error.png'),
                    })
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPrompt: false,
                        })
                    }, global.TimingCount)
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
        // 查询认证信息-end

        // 认证状态查询-start
        fetch(requestUrl.getSignStatus, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    // 认证成功
                    // 查询身份证信息-start
                    fetch(requestUrl.getIdCardInfo, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "token": global.Token,
                        },
                    }).then((response) => response.json())
                        .then((responseData) => {
                            console.log('responseData', responseData);
                            if (responseData.code == 20000) {
                                // 查询成功
                                this.setState({
                                    doctorName: responseData.result.doctorName,
                                    doctorSex: responseData.result.doctorSex,
                                    doctorCardNumber: responseData.result.doctorCardNumber
                                })
                            } else if (responseData.code == 40001) {
                                // 登陆超时

                            } else if (responseData.code == 40004) {
                                // 数据为空

                            } else if (responseData.code == 50000) {
                                // 系统异常
                                this.setState({
                                    ErrorPromptFlag: true,
                                    ErrorPromptText: '服务器繁忙',
                                    ErrorPromptImg: require('../images/error.png'),
                                })
                                clearTimeout(this.timer);
                                this.timer = setTimeout(() => {
                                    this.setState({
                                        ErrorPrompt: false,
                                    })
                                }, global.TimingCount)
                            } else {
                                this.setState({
                                    ErrorPromptFlag: true,
                                    ErrorPromptText: '服务器繁忙',
                                    ErrorPromptImg: require('../images/error.png'),
                                })
                                clearTimeout(this.timer);
                                this.timer = setTimeout(() => {
                                    this.setState({
                                        ErrorPrompt: false,
                                    })
                                }, global.TimingCount)
                            }
                        })
                        .catch((error) => {
                            console.log('error', error);
                        });
                    // 查询身份证信息-end
                } else if (responseData.code == 40001) {
                    // 登录超时

                } else if (responseData.code == 40002) {
                    // "系统认证中"

                } else if (responseData.code == 40003) {
                    // "认证信息审核失败 需要重新填写"

                } else if (responseData.code == 40004) {
                    // "认证信息未填写"

                } else if (responseData.code == 50000) {
                    // 系统错误、

                } else {

                }
            })
            .catch((error) => {
                console.log('error', error);
            });
        // 认证状态查询-end

    }
    render() {
        // 3 渲染 render
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav title="认证信息" leftClick={this.goBack.bind(this)} />
                <ScrollView style={{ marginBottom: global.px2dp(15) }}>
                    {/*  // AUTHENTICATION_PROGRESS  审核中 */}
                    {this.state.approveStatus == "AUTHENTICATION_PROGRESS" ?
                        <View style={styles.approveStatusContnet}>
                            <Image source={require('../images/approve.png')} />
                            <Text style={styles.approveStatusText}>您提交的认证信息正在审核中...</Text>
                        </View> : null}
                    {/*  // AUTHENTICATION_FAILED 认证失败 */}
                    {this.state.approveStatus == "AUTHENTICATION_FAILED" ?
                        <View style={styles.approveStatusContnet}>
                            <Image source={require('../images/approve.png')} />
                            <Text style={styles.approveStatusText}>您提交的认证信息未通过，请您重新上传</Text>
                        </View> : null}

                    <View style={styles.itemContent}>
                        {/* title 模块 start */}
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>身份信息</Text>
                            </View>
                        </View>
                        {/* title 模块 end */}
                        {/* 医生信息-start */}
                        <View style={styles.infoContent}>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>姓名:{this.state.doctorName ? this.state.doctorName : '***'}</Text>
                                <Text style={[styles.infoText, { marginLeft: global.px2dp(28), }]}>性别:{this.state.doctorSex ? this.state.doctorSex : '*'}</Text>
                                <Text style={styles.infoText}>身份证号:{this.state.doctorCardNumber ? this.state.doctorCardNumber : '*****************'}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.bigImgBtn}
                            >
                                <Image
                                    style={styles.idCardImg}
                                    source={{ uri: this.state.idCardFront }} />
                            </TouchableOpacity>
                        </View>
                        {/* 医生信息-end */}

                    </View>
                    <View style={[styles.itemContent, { paddingRight: 0 }]}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医院信息</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        <View style={styles.hospitalInfoContent}>
                            <View style={styles.hospitalItem}>
                                <Text style={styles.itemTitle}>所在医院</Text>
                                <Text style={styles.itemValue}>医院名</Text>
                            </View>
                            <View style={styles.hospitalItem}>
                                <Text style={styles.itemTitle}>所在科室</Text>
                                <Text style={styles.itemValue}>科室名</Text>
                            </View>
                            <View style={styles.hospitalItem}>
                                <Text style={styles.itemTitle}>职称</Text>
                                <Text style={styles.itemValue}>职称名</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.itemContent, { paddingBottom: 0, paddingRight: 0, }]}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>资质证明</Text>
                            </View>
                        </View>
                        <View style={[styles.aptitudeItem, { borderBottomColor: global.Colors.colorccc, borderBottomWidth: global.Pixel }]}>
                            <Text style={styles.aptitudeText}>医师执业证</Text>
                            <View style={styles.aptitudeImgBox}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.aptitudeBtn}
                                >
                                    <Image style={styles.aptitudeImg} source={{ uri: this.state.doctorCardFront }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.aptitudeItem]}>
                            <Text style={styles.aptitudeText}>手持工牌照</Text>
                            <View style={styles.aptitudeImgBox}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.aptitudeBtn}
                                >
                                    <Image style={styles.aptitudeImg} source={{ uri: this.state.workCard }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* 协议-start */}
                    <View style={styles.protocolContent}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                navigate("Protocol");
                            }}
                            style={styles.protocolBtn}
                        >
                            <Text style={styles.protocolText}>联盟平台协议</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    {/* 协议-end */}

                    {/*  // AUTHENTICATION_FAILED 认证失败 */}
                    {this.state.approveStatus == "AUTHENTICATION_FAILED" ?
                        <View style={styles.btnBox}>
                            <Button text="重新上传" click={this.submit.bind(this)} />
                        </View> : null}
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    // 后退事件
    goBack() {
        this.props.navigation.goBack();
    }
    // 提交事件
    submit() {
        this.props.navigation.navigate("Approve");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    // 认证状态-start
    approveStatusContnet: {
        height: global.px2dp(61),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: global.px2dp(15),
        paddingLeft: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        marginTop: global.px2dp(15),
    },
    approveStatusText: {
        marginLeft: global.px2dp(13),
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    // 认证状态-end

    itemContent: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        paddingBottom: global.px2dp(12),
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    // title模块-start
    titleContent: {
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
    // 医生信息模块-start
    infoContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoBox: {
        width: global.px2dp(260),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoText: {
        fontSize: global.px2dp(16),
        color: global.Colors.text333,
        lineHeight: global.px2dp(23),
    },
    bigImgBtn: {

    },
    idCardImg: {
        width: global.px2dp(62),
        height: global.px2dp(38),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorbbbbbb,
        marginRight: global.px2dp(27),
        paddingRight: global.px2dp(12),
        paddingLeft: global.px2dp(12),
    },
    // 医生信息模块-end

    // 医院信息 -start
    hospitalInfoContent: {
        marginLeft: global.px2dp(15),
    },
    hospitalItem: {
        height: global.px2dp(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
        paddingRight: global.px2dp(15),
    },
    itemTitle: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    itemValue: {
        flex: 1,
        textAlign: 'right',
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    // 医院信息 - end
    // 资质-start
    aptitudeItem: {
        height: global.px2dp(82),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: global.px2dp(15),
    },
    aptitudeText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    aptitudeImgBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    aptitudeImg: {
        width: global.px2dp(61),
        height: global.px2dp(56),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorbbbbbb,
        marginLeft: global.px2dp(11),
        borderRadius: global.px2dp(4),
    },
    // 资质-end
    // 协议-start
    protocolContent: {
        backgroundColor: global.Colors.textfff,
        height: global.px2dp(51),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: global.px2dp(15),
    },
    protocolBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: global.px2dp(15),
        paddingLeft: global.px2dp(15),
        paddingTop: global.px2dp(15),
        paddingBottom: global.px2dp(15),
    },
    protocolText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text555,
    },
    // 协议-end
    // 按钮box
    btnBox: {
        marginTop: global.px2dp(24),
        marginBottom: global.px2dp(24),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    }
});

