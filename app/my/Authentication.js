import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";
import Nav from "../common/Nav";
export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            hospitalId: "2b018d7a485111e8b001d017c2d24457",// 医院id
            branchId: "65311568b3d011e7b77800163e08d49b",// 科室id
            titleId: "67e854ad48b64d92bfd7c10d417c44f9",// 职称id
            idCardFront: "https://checking-records-1256660245.cos.ap-beijing.myqcloud.com/IDCard_up.jpg",//
            idCardContrary: "https://disease-records-1256660245.cosbj.myqcloud.com/1376f7dc91f4434ba755cdae5df980d8.jpg",//身份证正面照片地址
            doctorCardFront: "https://disease-records-1256660245.cosbj.myqcloud.com/1376f7dc91f4434ba755cdae5df980d8.jpg",//医师执业证正面照片地址
            doctorCardContrary: "https://disease-records-1256660245.cosbj.myqcloud.com/1376f7dc91f4434ba755cdae5df980d8.jpg",//医师执业证反面照片地址
            workCard: "https://disease-records-1256660245.cosbj.myqcloud.com/1376f7dc91f4434ba755cdae5df980d8.jpg",//手持工牌照片地址
            approveStatus: "AUTHENTICATION_PROGRESS",// 认证状态
            // 您提交的认证信息未通过，请您重新上传

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
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Nav title="认证信息" leftClick={this.goBack()} />
                <ScrollView>
                    <View style={styles.approveStatusContnet}>
                        <Image source={require('../images/approve.png')} />
                        <Text style={styles.approveStatusText}>您提交的认证信息未通过，请您重新上传</Text>
                    </View>
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
                                <Text style={styles.infoText}>姓名:</Text>
                                <Text style={[styles.infoText, { marginLeft: global.px2dp(28), }]}>性别:</Text>
                                <Text style={styles.infoText}>身份证号:130***************2018</Text>
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
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.aptitudeBtn}
                                >
                                    <Image style={styles.aptitudeImg} source={{ uri: this.state.doctorCardContrary }} />
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
                            onPress={() => { }}
                            style={styles.protocolBtn}
                        >
                            <Text style={styles.protocolText}>联盟平台协议</Text>
                            <Image source={require('../images/arrow_right_grey.png')} />
                        </TouchableOpacity>
                    </View>
                    {/* 协议-end */}
                    <View style={styles.btnBox}>
                        <Button text="重新上传" click={this.submit.bind(this)} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    // 后退事件
    goBack() {

    }
    // 提交事件
    submit() {

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

