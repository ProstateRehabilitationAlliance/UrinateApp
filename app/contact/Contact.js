import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, StatusBar, Image } from 'react-native';
import ErrorPrompt from "../common/ErrorPrompt";
import LinearGradient from 'react-native-linear-gradient';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import { BoxShadow } from 'react-native-shadow';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            doctorArr: [{
                "id": "3197b68a898e11e8a09b68cc6e5c9c74",
                "doctorName": "王海鹏",
                "titleId": "67e854ad48b64d92bfd7c10d417c44f9",
                "hospitalId": "2b018d7a485111e8b001d017c2d24457",
                "headImg": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZFQN36ialGnrTpfPn6cKuwaics5ZUuicIibz2C7FpM2obH12yXgOt4Osicl1eNl6LcmrR7z5TDhzuibSg/132"
            }, {
                "id": "5ab9ee678bbd11e8a09b68cc6e5c9c74",
                "doctorName": "吴松松",
                "titleId": "67e854ad48b64d92bfd7c10d417c44f9",
                "hospitalId": "2b018d7a485111e8b001d017c2d24457",
                "headImg": null
            },],// 医生数组
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
            <View style={styles.container} >
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
                    colors={global.LinearGradient}
                    style={styles.linearGradient}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            navigate('DoctorSearch');
                        }}
                        style={styles.navBtn}
                    >
                        <View style={styles.navContent}>
                            <Image style={styles.searchImg} source={require('../images/search.png')} />
                            <Text style={styles.searchPlaceholderText}>请输入医师名字</Text>
                            <Text style={styles.searchBtnText}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        style={styles.flatListStyle}
                        data={this.state.doctorArr}
                        initialNumToRender={10}
                        keyExtractor={item => item.id}
                        // ListFooterComponent={() => {
                        // 尾部组件
                        // }}
                        renderItem={({ item }) => this.doctorRenderItem(item)}
                        // 分隔线
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{
                                    height: global.Pixel,
                                    backgroundColor: global.Colors.text999,
                                }}></View>
                            )
                        }}
                        // onRefresh={() => { }}//头部刷新组件
                        // refreshing={this.state.isRefresh}//加载图标
                        // onEndReached={() => this.onEndReached()} // 加载更多
                        // onEndReachedThreshold={.1}// 加载更多触发时机
                        ListEmptyComponent={() => {
                            // 无数据时显示的内容
                            return (
                                <View style={styles.noDataBox}>
                                    <Image source={require('../images/no_concern.png')} />
                                    <Text style={styles.noDataText}>您还没有关注过医生，快去关注吧</Text>
                                    <TouchableOpacity
                                        style={styles.addConcernBtn}
                                        activeOpacity={.8}
                                        onPress={() => { navigate("DoctorSearch"); }}>
                                        <View style={styles.addConcernBox}>
                                            <Text style={styles.addConcernText}>去关注</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View >
        );
    }
    doctorRenderItem = (item) => {
        const shadowOpt = {
            width: global.px2dp(346),
            height: global.px2dp(83),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .1,
            x: 0,
            y: 0,
            style: styles.boxShadow,
        }
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigate('DoctorDetails');
                }}
                activeOpacity={.8}
                key={item.id}
            >
                <BoxShadow
                    setting={shadowOpt}>
                    <View style={styles.itemContent}>
                        <Image
                            style={styles.doctorImg}
                            source={item.headImg ? { uri: item.headImg } : require('../images/default_doc_img.png')} />
                        <View style={styles.infoBox}>
                            <Text style={styles.infoName}>{item.doctorName}</Text>
                            {/* <Text style={styles.infoTitle}>{item.titleId}</Text>
                        <Text style={styles.infoHospital}>{item.hospitalId}</Text> */}
                            <Text style={styles.infoTitle}>职称</Text>
                            <Text style={styles.infoHospital}>北京航天总医院</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                            style={styles.concernBtn}
                        >
                            <View style={styles.concernBox}>
                                <Image
                                    style={styles.concernImg}
                                    source={require('../images/attention_no.png')} />
                                <Text style={styles.concernText}>未关注</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </BoxShadow>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: global.Colors.bgColor,
    },
    linearGradient: {
        paddingTop: global.StatusBarHeight,
        height: global.NavHeight,
    },
    navBtn: {
        justifyContent: 'center',
        height: global.NavHeight - global.StatusBarHeight,
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: global.Colors.textfff,
        height: global.px2dp(28),
        borderRadius: global.px2dp(14),
        paddingLeft: global.px2dp(13),
        paddingRight: global.px2dp(13),
    },
    searchImg: {
        marginRight: global.px2dp(11),
    },
    searchPlaceholderText: {
        flex: 1,
        color: global.Colors.placeholder,
        fontSize: global.px2dp(14),
    },
    searchBtnText: {
        color: global.Colors.color,
        fontSize: global.px2dp(14),
    },
    scrollView: {

    },
    flatListStyle: {
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
        paddingBottom: global.px2dp(15),
    },
    // 列表 item - start
    boxShadow: {
        marginTop: global.px2dp(15),
    },
    itemContent: {
        height: global.px2dp(83),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(6),
    },
    doctorImg: {
        width: global.px2dp(61),
        height: global.px2dp(61),
        borderRadius: global.px2dp(30),
        borderColor: global.Colors.text333,
        borderWidth: global.Pixel,
        marginLeft: global.px2dp(17),
        marginRight: global.px2dp(25),
    },
    infoBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoName: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        marginRight: global.px2dp(9),
        lineHeight: global.px2dp(23),
    },
    infoTitle: {
        fontSize: global.px2dp(15),
        color: global.Colors.text333,
        lineHeight: global.px2dp(23),
    },
    infoHospital: {
        fontSize: global.px2dp(15),
        color: global.Colors.text555,
        lineHeight: global.px2dp(20),
    },
    concernBtn: {

    },
    concernBox: {
        width: global.px2dp(64),
        height: global.px2dp(29),
        borderColor: global.Colors.color,
        borderWidth: global.Pixel,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: global.px2dp(5),
        marginRight: global.px2dp(15),
        marginLeft: global.px2dp(15),
    },
    concernImg: {

    },
    concernText: {
        fontSize: global.px2dp(12),
        color: global.Colors.color,
    },
    // 列表 item - end

    // 无数据部分 - start
    noDataBox: {
        marginTop: global.px2dp(99),
        alignItems: 'center',
    },
    noDataText: {
        marginTop: global.px2dp(27),
        marginBottom: global.px2dp(22),
        fontSize: global.px2dp(17),
        color: global.Colors.text666,
    },
    addConcernBtn: {
        width: global.px2dp(168),
        height: global.px2dp(35),
        borderColor: global.Colors.color,
        borderWidth: global.Pixel,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: global.px2dp(6),
    },
    addConcernText: {
        fontSize: global.px2dp(15),
        color: global.Colors.color,
    }
    // 无数据部分 - end

});

