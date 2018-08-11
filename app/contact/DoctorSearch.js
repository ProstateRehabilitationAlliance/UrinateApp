import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, StatusBar, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import LinearGradient from 'react-native-linear-gradient';

export default class DoctorSearch extends Component {
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
                    colors={global.LinearGradient}
                    style={styles.linearGradient}>
                    <View style={styles.navContent}>
                        <View style={styles.searchBox}>
                            <Image style={styles.searchImg} source={require('../images/search.png')} />
                            <TextInput
                                ref={'search'}
                                style={styles.textInput}
                                placeholder={"请输入医师名字"}
                                placeholderTextColor={global.Colors.placeholder}
                                autoFocus={true}
                                onChangeText={(text) => {
                                    // if (text.length > 0) {
                                    //     this.setState({
                                    //         clearBtn: true,
                                    //         searchText: text
                                    //     });
                                    //     // this.fetchData(text);
                                    // } else {
                                    //     this.setState({
                                    //         clearBtn: false,
                                    //     })
                                    // }
                                }}
                                defaultValue={this.state.searchText}
                                underlineColorAndroid={'transparent'}
                                keyboardType={"default"}
                                enablesReturnKeyAutomatically={true}//ios禁止空确认
                                returnKeyType={'search'}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                goBack();
                            }}
                            style={styles.navBtn}
                        >
                            <Text style={styles.navText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <ScrollView>
                    {/* tab切换 - start */}
                    <View style={styles.tabContent}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                            style={styles.itemBtn}
                        >
                            <View style={[styles.itemBox, { borderBottomColor: global.Colors.color }]}>
                                <Text style={[styles.itemText, { color: global.Colors.color }]}>全部</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => { }}
                            style={styles.itemBtn}
                        >
                            <View style={styles.itemBox}>
                                <Text style={styles.itemText}>本院</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* tab切换 - end */}
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
                                    {/* <Image source={require('../images/no_concern.png')} />
                                    <Text style={styles.noDataText}>您还没有关注过医生，快去关注吧</Text>
                                    <TouchableOpacity
                                        style={styles.addConcernBtn}
                                        activeOpacity={.8}
                                        onPress={() => { navigate("DoctorSearch"); }}>
                                        <View style={styles.addConcernBox}>
                                            <Text style={styles.addConcernText}>去关注</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            )
                        }}
                    />
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    doctorRenderItem = (item) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigate('DoctorDetails');
                }}
                activeOpacity={.8}
                key={item.id}
            >
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
            </TouchableOpacity>
        )
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
        backgroundColor: global.Colors.textfff,
    },
    linearGradient: {
        paddingTop: global.StatusBarHeight,
        height: global.NavHeight,
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: global.NavHeight - global.StatusBarHeight,
        paddingLeft: global.px2dp(15),
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: global.Colors.textfff,
        height: global.px2dp(28),
        borderRadius: global.px2dp(14),
        paddingLeft: global.px2dp(13),
    },
    searchImg: {
        marginRight: global.px2dp(11),
    },
    textInput: {
        flex: 1,
        lineHeight: global.px2dp(28),
    },
    navBtn: {
        justifyContent: 'center',
        height: global.NavHeight - global.StatusBarHeight,
    },
    navText: {
        color: global.Colors.textfff,
        fontSize: global.px2dp(17),
        paddingRight: global.px2dp(15),
        paddingLeft: global.px2dp(15),
    },
    // 导航 - end
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
    },
    // 无数据部分 - end
    // tab部分 - start
    tabContent: {
        height: global.px2dp(40),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: global.Colors.colorccc,
        borderBottomWidth: global.Pixel,
        paddingLeft: global.px2dp(15),
        paddingRight: global.px2dp(15),
    },
    itemBtn: {
        
    },
    itemBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: global.Colors.transparent,
        borderBottomWidth: global.px2dp(3),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
        paddingLeft: global.px2dp(5),
        paddingRight: global.px2dp(5),
    },
    itemText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    }
    // tab部分 - end
});

