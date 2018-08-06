import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { requestUrl } from './netWork/url';//接口url
import { regExp } from './netWork/regExp';//正则
import { global } from './utils/global';// 常量
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return (<View style={styles.container} >
            <Text>首页</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        width: global.SCREEN_WIDTH,
        height: global.SCREEN_HEIGHT,
        backgroundColor: global.Colors.bgColor,
    },
});

