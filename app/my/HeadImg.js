import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import Nav from "../common/Nav";// 导航组件
import ImagePicker from 'react-native-image-picker';
const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: .75,
    allowsEditing: false,// ios图片裁剪
    mediaType: 'photo',//photo照片 或 video视频
    noData: false,
    maxWidth: 720,
    maxHeight: 1280,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};
export default class HeadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',

            headImg: '',
            headImgUrl: '',
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
                    title={"更换头像"}
                    leftClick={this.goBack.bind(this)} />
                <ScrollView>
                    <TouchableOpacity
                        style={styles.upImgBtn}
                        activeOpacity={.8}
                        onPress={() => { this.openMycamera() }}>
                        <Image style={styles.upImg} source={require('../images/head_btn.png')} />
                        <Text style={styles.upImgText}>点击上传头像</Text>
                    </TouchableOpacity>
                    <View style={styles.btnBox}>
                        <Button text={'保 存'} click={this.submit.bind(this)} />
                    </View>
                </ScrollView>
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View>
        );
    }
    openMycamera = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                return null;
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error)
            } else if (response.customButton) {
                console.log('Usr tapped custom button:', response.customButton)
            } else {
                this.setState({
                    headImg: response.uri
                })
                this.uploadHeadImg(response);
            }
        })
    }
    uploadHeadImg(response) {
        let formData = new FormData();
        formData.append("file", {
            uri: response.uri,
            type: 'image/jpeg',
            name: response.fileName
        });
        formData.append("recordType", 'doctor-sign');
        fetch(requestUrl.uploadHeadImg, {
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
                        headImgUrl: responseData.result
                    })
                } else {
                    this.setState({
                        ErrorPrompt: true,
                        ErrorText: '头像上传失败请重新上传',
                        ErrorImg: require('../images/error.png'),
                    });
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.setState({
                            ErrorPrompt: false,
                        })
                    }, global.TimingCount)
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
    goBack() {
        this.props.navigation.goBack();
    }
    submit() {
        if (!this.state.headImgUrl) {
            this.setState({
                ErrorPromptFlag: true,
                ErrorPromptText: '请上传照片',
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
            // 修改医生信息接口
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

    upImgBtn: {
        width: global.SCREEN_WIDTH,
        height: global.px2dp(245),
        backgroundColor: global.Colors.textfff,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upImgText: {
        fontSize: global.px2dp(18),
        color: global.Colors.text333,
        marginTop: global.px2dp(21),
    },
    btnBox: {
        marginTop: global.px2dp(33),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
});

