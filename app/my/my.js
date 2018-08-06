import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
//   import { requestUrl } from '../../Network/url';//接口url
//   import { RegExp } from '../../Network/RegExp';//正则
//   import { Global } from '../../common/Global';
//   import px2dp from "../../common/Tool";
export default class App extends Component {
  // static navigationOptions = {
  //   header: null,
  // };
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

      <Text>我的</Text>
    </View>);
  }
}

const styles = StyleSheet.create({

});

