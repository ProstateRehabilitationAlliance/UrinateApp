import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
export default class Order extends Component {
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

            orderData: [{ id: "1" }],

            screenFlag: false,
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
                <Nav
                    isLoading={this.state.isLoading}
                    title={"问诊订单"}
                    leftClick={this.goBack.bind(this)}
                    rightClick={this.screen.bind(this)}
                    dom={
                        <View style={styles.screenBox}>
                            <Text style={styles.rightBtnText}>筛选</Text>
                            <Image
                                style={styles.screenImg}
                                source={require('../images/screen.png')} />
                        </View>
                    } />
                {this.state.screenFlag ?
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                screenFlag: !this.state.screenFlag
                            })
                        }}
                        activeOpacity={.8}
                        style={styles.screenMaskBtn}
                    >
                        <TouchableOpacity
                            onPress={() => { }}
                            activeOpacity={1}
                        >
                            <View style={styles.screenContent}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.screenItemBtn}
                                >
                                    <View style={styles.screenItem}>
                                        <Text style={styles.screenText}>全部</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.screenItemBtn}
                                >
                                    <View style={styles.screenItem}>
                                        <Text style={styles.screenText}>全部</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.screenItemBtn}
                                >
                                    <View style={styles.screenItem}>
                                        <Text style={styles.screenText}>全部</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => { }}
                                    style={styles.screenItemBtn}
                                >
                                    <View style={styles.screenItem}>
                                        <Text style={styles.screenText}>全部</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    : null}
                <ScrollView>
                    <FlatList
                        style={styles.flatListStyle}
                        data={this.state.orderData}
                        // initialNumToRender={20}
                        keyExtractor={item => item.id}
                        // ListFooterComponent={() => {
                        // 尾部组件
                        // }}
                        renderItem={({ item }) => this.orderRenderItem(item)}
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
                                    <Text style={styles.noDataText}>暂无数据</Text>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    orderRenderItem = (item) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => { navigate("OrderDetails"); }}
                activeOpacity={.8}
                key={item.id}
            >
                <View style={styles.itemContent}>
                    <View style={styles.topBox}>
                        <Text style={styles.infoText}>男 | 45岁</Text>
                        <View style={styles.stateBox}>
                            <Text style={styles.stateText}>待回复</Text>
                        </View>
                    </View>
                    <View style={styles.centerBox}>
                        <Text style={styles.problemDescText}>吕医生你好,上月底带父亲来你院找你看过。现将吃了25付药的感受给你描述下:整个左腿胀痛感减轻，腹股沟的疼痛也缓解，走路也比服药前有力,体位改变如坐下,起立等比以前自如疼痛也有缓解.....</Text>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.picText}>￥30</Text>
                        <Text style={styles.dateText}>2018/07/20</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    goBack() {
        this.props.navigation.goBack();
    }
    screen() {
        this.setState({
            screenFlag: !this.state.screenFlag,
        })
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
    screenBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightBtnText: {
        fontSize: global.px2dp(16),
        color: global.Colors.textfff,
        marginRight: global.px2dp(3),
    },
    // 导航 - end

    flatListStyle: {
        marginRight: global.px2dp(15),
        marginLeft: global.px2dp(15),
    },
    // item - start
    itemContent: {
        marginTop: global.px2dp(15),
        backgroundColor: global.Colors.textfff,
        borderRadius: global.px2dp(5),
        overflow: 'hidden',
    },
    topBox: {
        height: global.px2dp(33),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: global.px2dp(22),
    },
    infoText: {
        fontSize: global.px2dp(17),
        color: global.Colors.text333,
    },
    stateBox: {
        width: global.px2dp(81),
        height: global.px2dp(33),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.Colors.color,
    },
    stateText: {
        fontSize: global.px2dp(16),
        color: global.Colors.textfff,
    },
    centerBox: {
        marginLeft: global.px2dp(22),
        marginRight: global.px2dp(22),
        paddingTop: global.px2dp(8),
        paddingBottom: global.px2dp(8),
    },
    problemDescText: {
        fontSize: global.px2dp(14),
        color: global.Colors.text666,
        lineHeight: global.px2dp(20),
    },
    bottomBox: {
        height: global.px2dp(36),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: global.px2dp(22),
        paddingRight: global.px2dp(16),
    },
    picText: {
        fontSize: global.px2dp(19),
        color: global.Colors.color,
    },
    dateText: {
        fontSize: global.px2dp(14),
        color: global.Colors.text999,
    },
    // item - end

    // 筛选部分-start
    screenMaskBtn: {
        position: 'absolute',
        left: 0,
        top: global.NavHeight,
        zIndex: 1001,
        backgroundColor: 'rgba(0,0,0,.6)',
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT - global.NavHeight,
    },
    screenContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: global.Colors.textfff,
        borderBottomLeftRadius: global.px2dp(10),
        borderBottomRightRadius: global.px2dp(10),
        paddingLeft: global.px2dp(11),
        paddingRight: global.px2dp(11),
        paddingTop: global.px2dp(9),
        paddingBottom: global.px2dp(9),
    },
    screenItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: global.px2dp(110),
        height: global.px2dp(30),
        borderRadius: global.px2dp(15),
        borderColor: global.Colors.colorccc,
        borderWidth: global.Pixel,
        marginTop: global.px2dp(10),
        marginBottom: global.px2dp(10),
    },
    screenText: {
        fontSize: global.px2dp(15),
        color: global.Colors.text555,
    },
    // 筛选部分-end
});

