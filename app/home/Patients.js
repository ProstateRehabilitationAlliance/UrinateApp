import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, TextInput, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import { BoxShadow } from 'react-native-shadow';
import LinearGradient from "react-native-linear-gradient";
import { NavigationEvents } from "react-navigation";
export default class Patients extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRefresh: false,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            dataFlag: true,// 是否还有下一页
            patientArr: [],// 搜索到的数据
            searchLabel: [],// 搜索标签
            stickerId: '',// 标签id
            searchText: '',// 搜索内容
            pageNo: 1,
            pageSize: 10,
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 查询搜索标签 - start
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        })
        fetch(requestUrl.getLablePatientJson, {
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
                        searchLabel: responseData.result
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: true,
                        ErrorPromptText: '加载失败',
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
        // 查询搜索标签 - end

    }
    renderSearchLabel() {
        let tempArr = [];
        for (const key in this.state.searchLabel) {
            tempArr.push(
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        this.setState({
                            stickerId: key,
                            patientArr: [],
                            pageNo: 1,
                        })
                        this.renderSearchLabel();
                        this.findPatientList(1, key);
                    }}
                    style={styles.serachLabelBtn}
                    key={key}
                >
                    <View style={[styles.searchLabelItem, this.state.stickerId == key ? { backgroundColor: global.Colors.color } : null]}>
                        <Text style={[styles.searchLabelText, this.state.stickerId == key ? { color: global.Colors.textfff } : null]}>{this.state.searchLabel[key]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return tempArr;
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
                {/* 后退刷新数据 */}
                <NavigationEvents
                    onWillFocus={() => {
                        this.setState({
                            patientArr: [],
                            pageNo: 1,
                        })
                        this.findPatientList(1, this.state.stickerId);
                    }}
                />
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
                                onSubmitEditing={() => {
                                    this.setState({
                                        patientArr: [],
                                        pageNo: 1,
                                    })
                                    this.findPatientList(1, this.state.stickerId);
                                }}
                                defaultValue={this.state.searchText}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"default"}
                                enablesReturnKeyAutomatically={true}//ios禁止空确认
                                returnKeyType={'search'}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        patientArr: [],
                                        pageNo: 1,
                                    })
                                    this.findPatientList(1, this.state.stickerId);
                                }}
                                activeOpacity={.8}
                                style={styles.serachBtn}
                            >
                                <Text style={styles.searchText}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.searchLabelBox}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => {
                                    this.setState({
                                        stickerId: '',
                                        patientArr: [],
                                        pageNo: 1,
                                    })
                                    this.findPatientList(1, '');
                                }}
                                style={styles.serachLabelBtn}
                            >
                                <View style={[styles.searchLabelItem, this.state.stickerId == '' ? { backgroundColor: global.Colors.color } : null]}>
                                    <Text style={[styles.searchLabelText, this.state.stickerId == '' ? { color: global.Colors.textfff } : null]}>全部</Text>
                                </View>
                            </TouchableOpacity>
                            {this.renderSearchLabel()}
                        </ScrollView>
                    </View>
                </BoxShadow>
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.patientArr}
                    // initialNumToRender={10}
                    keyExtractor={item => item.patientId}
                    renderItem={({ item }) => this.renderItem(item)}
                    onRefresh={() => {
                        this.setState({
                            pageNo: 1,
                            patientArr: [],
                        })
                        this.findPatientList(1, this.state.stickerId);
                    }}//头部刷新组件
                    refreshing={this.state.isRefresh}//加载图标
                    onEndReached={() => this.onEndReached()} // 加载更多
                    onEndReachedThreshold={.2}// 加载更多触发时机
                    ListEmptyComponent={() => {
                        // 无数据时显示的内容
                        return (
                            <View style={styles.noDataBox}>
                                <Image source={require('../images/no_patient.png')} />
                                <Text style={styles.noDataText}>你暂无患者可查看</Text>
                            </View>
                        )
                    }}
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
                key={item.patientId}
                setting={itemShadowOpt}>
                <TouchableOpacity
                    onPress={() => {
                        navigate("PatientsDetails", {
                            patientId: item.patientId,
                        });
                    }}
                    activeOpacity={.8}
                >
                    <View style={styles.itemBox}>
                        <View style={styles.leftBox}>
                            <Text style={styles.baseInfo}>{item.patientName} {item.patientSex} {item.patientAge}岁</Text>
                            <Text style={styles.sourceText}>患者来源:{item.patientSource}</Text>
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
    onEndReached() {
        // 判断是否还有数据 
        if (this.state.dataFlag) {
            this.findPatientList(this.state.pageNo * 1 + 1 + '', this.state.stickerId);
            this.setState({ pageNo: this.state.pageNo * 1 + 1 + '' });
        }
    }
    // 查患者列表
    findPatientList(pageNo, stickerId) {
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        })
        if (stickerId) {
            var url = requestUrl.findPatientList + "?pageSize=" + this.state.pageSize + "&pageNo=" + pageNo + "&patientName=" + this.state.searchText + "&stickerId=" + stickerId;
        } else {
            var url = requestUrl.findPatientList + "?pageSize=" + this.state.pageSize + "&pageNo=" + pageNo + "&patientName=" + this.state.searchText;
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": global.Token,
            },
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.code == 20000) {
                    if (responseData.result.length >= this.state.pageSize) {
                        let temp = this.state.patientArr;
                        temp = temp.concat(responseData.result);
                        this.setState({
                            isLoading: false,
                            ErrorPromptFlag: false,
                            patientArr: temp,
                            dataFlag: true,
                        })
                    } else {
                        let temp = this.state.patientArr;
                        temp = temp.concat(responseData.result);
                        this.setState({
                            isLoading: false,
                            ErrorPromptFlag: false,
                            patientArr: temp,
                            dataFlag: false,
                        })
                    }
                } else {
                    this.setState({
                        isLoading: false,
                        ErrorPromptFlag: false,
                        dataFlag: false,
                    })
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
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
    },
    illnessName: {
        fontSize: global.px2dp(16),
        lineHeight: global.px2dp(22),
        color: global.Colors.color,
    },
    sourceText: {
        fontSize: global.px2dp(13),
        lineHeight: global.px2dp(22),
        color: global.Colors.text999,
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
    noDataBox: {
        alignItems: 'center',
        paddingTop: global.px2dp(109),
    },
    noDataText: {
        marginTop: global.px2dp(15),
        fontSize: global.px2dp(18),
        color: global.Colors.text666,
    },
    // 列表-end
});

