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
        const searchShadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(95),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: styles.searchBoxShadow,
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
                        <Text style={styles.navTitle}>我的患者</Text>
                    </View>
                </LinearGradient>
                <BoxShadow
                    setting={searchShadowOpt}>
                    <View style={styles.searchContent}>
                        <View style={styles.searchBox}>
                            <Image style={styles.searchImg} source={require('../images/search.png')} />
                            <TextInput
                                ref={'search'}
                                style={styles.searchInput}
                                placeholder={"请输入关键字"}
                                placeholderTextColor={global.Colors.placeholder}
                                autoFocus={true}
                                onChangeText={(text) => {
                                    if (!regExp.RegNull.test(text)) {
                                        this.setState({
                                            searchText: text
                                        });
                                    }
                                }}
                                // onSubmitEditing={() => {
                                //     this.setState({
                                //         doctorArr: [],
                                //         pageNo: 1,
                                //     })
                                //     this.findDoctorList(this.state.searchText, 1);
                                // }}
                                defaultValue={this.state.searchText}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"default"}
                                enablesReturnKeyAutomatically={true}//ios禁止空确认
                                returnKeyType={'search'}
                            />
                            <TouchableOpacity
                                onPress={() => { }}
                                activeOpacity={.8}
                                style={styles.serachBtn}
                            >
                                <Text style={styles.searchText}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchLabelBox}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.serachLabelBtn}
                            >
                                <View style={styles.searchLabelItem}>
                                    <Text style={styles.searchLabelText}>全部</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => { }}
                                style={styles.serachLabelBtn}
                            >
                                <View style={styles.searchLabelItem}>
                                    <Text style={styles.searchLabelText}>前列腺增生</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BoxShadow>
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.patientsData}
                    // initialNumToRender={20}
                    keyExtractor={item => item.id}
                    // ListFooterComponent={() => {
                    // 尾部组件
                    // }}
                    renderItem={({ item }) => this.renderItem(item)}
                // 分隔线
                // ItemSeparatorComponent={() => {
                //     return (
                //         <View style={{
                //             height: global.Pixel,
                //             backgroundColor: global.Colors.text999,
                //         }}></View>
                //     )
                // }}
                // onRefresh={() => { }}//头部刷新组件
                // refreshing={this.state.isRefresh}//加载图标
                // onEndReached={() => this.onEndReached()} // 加载更多
                // onEndReachedThreshold={.1}// 加载更多触发时机
                // ListEmptyComponent={() => {
                //     // 无数据时显示的内容
                //     return (
                //         <View style={styles.noDataBox}>
                //             <Image source={require('../../images/no_data.png')} />
                //             <Text style={styles.noDataText}>暂无信息</Text>
                //         </View>
                //     )
                // }}
                />
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );

    }
    renderItem = (item) => {
        const { navigate } = this.props.navigation;
        const itemShadowOpt = {
            width: global.px2dp(345),
            height: global.px2dp(79),
            color: "#000",
            border: 8,
            radius: 0,
            opacity: .2,
            x: 0,
            y: 0,
            style: styles.itemBoxShadow,
        }
        return (
            <BoxShadow
                setting={itemShadowOpt}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(item)
                    }}
                    activeOpacity={.8}
                    key={item.id}
                >
                    <View style={styles.itemBox}>
                        <View style={styles.leftBox}>
                            <Text style={styles.baseInfo}>王胖虎 男 45岁</Text>
                            <Text style={styles.illnessName}>疾病名称</Text>
                        </View>
                        <View style={styles.rightBox}>
                            <Text style={styles.rightText}>详情</Text>
                            <Image source={require('../images/arrow_right_blue.png')} />
                        </View>
                    </View>
                </TouchableOpacity>
            </BoxShadow>
        )
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
    // 搜索部分 - start
    searchBoxShadow: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginTop: global.NavHeight - global.px2dp(107),
    },
    searchContent: {
        height: global.px2dp(95),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        paddingLeft: global.px2dp(18),
        paddingRight: global.px2dp(18),
        paddingTop: global.px2dp(10),
    },
    searchBox: {
        height: global.px2dp(34),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: global.Colors.bgColor,
        borderColor: global.Colors.text999,
        borderWidth: global.Pixel,
        borderRadius: global.px2dp(34),
    },
    searchImg: {
        marginRight: global.px2dp(7),
        marginLeft: global.px2dp(13),
    },
    searchInput: {
        height: global.px2dp(34),
        flex: 1,
        padding: 0,
        fontSize: global.px2dp(15),
        color: global.Colors.text333,
    },
    serachBtn: {
    },
    searchText: {
        fontSize: global.px2dp(15),
        color: global.Colors.color,
        paddingLeft: global.px2dp(10),
        paddingRight: global.px2dp(10),
        lineHeight: global.px2dp(34),
    },
    searchLabelBox: {
        paddingTop: global.px2dp(14),
        paddingBottom: global.px2dp(14),
        flexDirection: 'row',
    },
    searchLabelItem: {
        backgroundColor: "#bfd3e9",
        borderRadius: global.px2dp(3),
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: global.px2dp(10),
        paddingRight: global.px2dp(10),
        marginRight: global.px2dp(10),
    },
    searchLabelText: {
        lineHeight: global.px2dp(24),
        fontSize: global.px2dp(11),
        color: global.Colors.text777,

    },
    // 搜索部分 - end
    // 列表-start
    itemBoxShadow: {
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        marginTop: global.px2dp(15),
    },
    itemBox: {
        height: global.px2dp(79),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(3),
    },
    leftBox: {
        marginLeft: global.px2dp(16),
    },
    baseInfo: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
        lineHeight: global.px2dp(24),
    },
    illnessName: {
        fontSize: global.px2dp(16),
        lineHeight: global.px2dp(22),
        color: global.Colors.color,
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: global.px2dp(23),
    },
    rightText: {
        fontSize: global.px2dp(16),
        color: global.Colors.color,
        marginRight: global.px2dp(9),
    },
    // 列表-end
});

