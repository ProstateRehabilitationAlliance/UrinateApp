import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
export default class signIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    // 变量声明
    // const {navigate, goBack} = this.props.navigation;

    return (<View style={styles.container} >
      <Text>登录</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: 'https://img1.360buyimg.com/da/jfs/t23440/198/1552616732/96159/b2b38b62/5b62c871N7bc2b6fd.jpg' }}
        defaultSource={require('../images/radio_yes.png')}// 默认图片
        // defaultSource={{uri: string, width: number, height: number, scale: number}}
      />
      {/* <Image
        style={styles.stretch}
        source={require('/react-native/img/favicon.png')}
      /> */}
      {/* <TouchableOpacity activeOpacity={.8}
        onPress={() => this.click()}>
        <Text>点击</Text>
      </TouchableOpacity> */}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.Colors.bgColor,
    paddingTop: 20,
    paddingBottom: global.TabBar,
  }
});

