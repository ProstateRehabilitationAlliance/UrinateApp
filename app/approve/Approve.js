import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import LinearGradient from 'react-native-linear-gradient';
import Button from "../common/Button";
import Nav from "../common/Nav";
import UpFile from "../common/UpFile";
export default class Approve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            protocolFlag: false,// 是否同意协议

            idCardFront: '',//身份证正面照片地址
            doctorCardFront: '',//医师执业证正面照片地址
            doctorCardContrary: '', //医师执业证反面照片地址
            workCard: '',//手持工牌照片地址
            hospitalId: '',//医院ID
            branchId: '',//科室ID
            titleId: '',//职称ID
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
                    <View style={styles.itemContent}>
                        {/* title 模块 start */}
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>上传身份证</Text>
                            </View>
                            <Text style={styles.hintText}></Text>
                        </View>
                        {/* title 模块 end */}
                        {/* 上传文件模块 start */}
                        <View style={styles.upFileContent}>
                            {/* 图片获取-start */}
                            <UpFile changeImg={(data) => {
                                console.log(data)
                                this.setState({
                                    idCardFront: data.uri,
                                })
                            }} />
                            {/* 图片获取-end */}
                            <View style={styles.upFileLine}></View>
                            <View style={styles.upFileBox}>
                                <TouchableOpacity
                                    style={styles.imgBtn}
                                    onPress={() => {
                                        navigate('LookImg', {
                                            data: [this.state.idCardFront]
                                        })
                                    }}
                                    activeOpacity={.8}>
                                    <Image
                                        style={styles.idCardImg}
                                        source={this.state.idCardFront == '' ? require('../images/id_card.png') : { uri: this.state.idCardFront }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* 上传文件模块 end */}
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
                            <TouchableOpacity
                                onPress={() => { }}
                                activeOpacity={.8}
                                style={styles.hospitalSelBtn}
                            >
                                <Text style={styles.itemTitle}>所在医院</Text>
                                <Text style={styles.itemValue}>请选择</Text>
                                <Image style={styles.hospitalSelImg} source={require('../images/arrow_right_grey.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { }}
                                activeOpacity={.8}
                                style={styles.hospitalSelBtn}
                            >
                                <Text style={styles.itemTitle}>所在科室</Text>
                                <Text style={styles.itemValue}>请选择</Text>
                                <Image style={styles.hospitalSelImg} source={require('../images/arrow_right_grey.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { }}
                                activeOpacity={.8}
                                style={styles.hospitalSelBtn}
                            >
                                <Text style={styles.itemTitle}>职称</Text>
                                <Text style={styles.itemValue}>请选择</Text>
                                <Image style={styles.hospitalSelImg} source={require('../images/arrow_right_grey.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.itemContent}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>医师执业证</Text>
                            </View>
                            <Text style={styles.hintText}>请上传一二页</Text>
                        </View>
                        {/* 上传文件模块 start */}
                        <View style={styles.upFileContent}>
                            {/* 图片获取-start */}
                            <UpFile changeImg={(data) => {
                                this.setState({
                                    doctorCardFront: data.uri,
                                })
                            }} />
                            {/* 图片获取-end */}
                            <View style={styles.upFileLine}></View>
                            <View style={styles.upFileBox}>
                                <TouchableOpacity
                                    style={styles.imgBtn}
                                    onPress={() => { }}
                                    activeOpacity={.8}>
                                    <Image
                                        style={styles.certificateImg}
                                        source={this.state.doctorCardFront ? { uri: this.state.doctorCardFront } : require('../images/example_img.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.imgBtn}
                                    onPress={() => { }}
                                    activeOpacity={.8}>
                                    <Image
                                        style={styles.certificateImg}
                                        source={this.state.doctorCardContrary ? { uri: this.state.doctorCardContrary } : require('../images/example_img.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* 上传文件模块 end */}
                    </View>
                    <View style={styles.itemContent}>
                        <View style={styles.titleContent}>
                            <View style={styles.titleLeftBox}>
                                <View style={styles.titleLine}></View>
                                <Text style={styles.titleText}>手持工牌照</Text>
                            </View>
                            <Text style={styles.hintText}>请上传真实照片</Text>
                        </View>
                        {/* 上传文件模块 start */}
                        <View style={styles.upFileContent}>
                            {/* 图片获取-start */}
                            <UpFile changeImg={(data) => {
                                this.setState({
                                    workCard: data.uri
                                })
                            }} />
                            {/* 图片获取-end */}
                            <View style={styles.upFileLine}></View>
                            <View style={styles.upFileBox}>
                                <TouchableOpacity
                                    style={styles.imgBtn}
                                    onPress={() => { }}
                                    activeOpacity={.8}>
                                    <Image
                                        style={styles.certificateImg}
                                        source={this.state.workCard ? { uri: this.state.workCard } : require('../images/example_img.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* 上传文件模块 end */}
                    </View>
                    {/* 协议-start */}
                    <View style={styles.protocolContent}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                        >
                            <Text style={styles.protocolText}>查阅并同意<Text style={{ color: global.Colors.color }}>《联盟平台协议》</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.protocolBtn}
                            onPress={() => {
                                this.setState({
                                    protocolFlag: !this.state.protocolFlag,
                                })
                            }}
                        >
                            <Image source={this.state.protocolFlag ? require('../images/protocol_yes.png') : require('../images/protocol_no.png')} />
                        </TouchableOpacity>
                    </View>
                    {/* 协议-end */}
                    <View style={styles.btnBox}>
                        <Button text="提交" click={this.submit.bind(this)} />
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
    // 上传文件模块 start
    upFileContent: {
        height: global.px2dp(51),
        flexDirection: 'row',
        alignItems: 'center',
    },
    upFileLine: {
        width: global.px2dp(2),
        height: global.px2dp(38),
        backgroundColor: global.Colors.text999,
    },
    idCardImg: {
        width: global.px2dp(62),
        height: global.px2dp(38),
        borderRadius: global.px2dp(3),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorbbbbbb,
    },
    certificateImg: {
        width: global.px2dp(61),
        height: global.px2dp(56),
        borderRadius: global.px2dp(4),
        borderWidth: global.Pixel,
        borderColor: global.Colors.colorbbbbbb,
    },
    // 上传文件模块 end
    // 医院信息选择 -start
    hospitalInfoContent: {
        marginLeft: global.px2dp(15),
    },
    hospitalSelBtn: {
        height: global.px2dp(46),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: global.Pixel,
        borderColor: global.Colors.colorccc,
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
    hospitalSelImg: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
    // 医院信息选择 - end

    // 协议-start
    protocolContent: {
        backgroundColor: global.Colors.textfff,
        height: global.px2dp(51),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: global.px2dp(15),
        paddingLeft: global.px2dp(15),
        // paddingRight: global.px2dp(15),
    },
    protocolBtn: {
        paddingRight: global.px2dp(15),
        paddingLeft: global.px2dp(15),
        paddingTop: global.px2dp(15),
        paddingBottom: global.px2dp(15),
    },
    protocolText: {
        fontSize: global.px2dp(15),
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

