import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { regExp } from '../netWork/RegExp';// 正则
import { requestUrl } from '../netWork/Url';// IP地址
import { global } from '../utils/Global';// 常量
import Button from "../common/Button";// 按钮组件
import ErrorPrompt from "../common/ErrorPrompt";
import BasicData from "../common/BasicData";
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

            headImg: '',
            headImgUrl: '',
            oldHeadImgUrl: '',
        }
    }
    getInitalState() {
        // 1初始化state
    }
    componentWillMount() {
        // 2仅调用一次在 render 前
    }
    componentDidMount() {
        this.refs.BasicData.getLocalDoctorDetail();
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <BasicData
                    ref="BasicData"
                    userInfo={(data) => {
                        this.setState({
                            headImgUrl: data.headImg,
                            oldHeadImgUrl: data.headImg,
                        })
                    }}
                />
                <Nav
                    isLoading={this.state.isLoading}
                    title={"更换头像"}
                    leftClick={this.goBack.bind(this)}
                    rightClick={this.openMycamera.bind(this)}
                    dom={<Image source={require('../images/head_btn.png')} />}
                />
                <ScrollView>
                    <View style={styles.upImgBtn}>
                        <Image style={styles.upImg} source={this.state.headImgUrl ? { uri: this.state.headImgUrl } : require('../images/default_hear_img.png')} />
                    </View>
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
        formData.append("recordType", 'user-head');
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
        } else if (this.state.headImgUrl == this.state.oldHeadImgUrl) {
            this.setState({
                ErrorPromptFlag: true,
                ErrorPromptText: '请修改头像',
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
            formData.append("headImg", this.state.headImgUrl);
            fetch(requestUrl.updateDoctorDetail, {
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
                        this.refs.BasicData.deleteUser();
                        clearTimeout(this.timer)
                        this.timer = setTimeout(() => {
                            this.setState({
                                ErrorPromptFlag: false,
                            })
                            this.props.navigation.goBack();
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
    upImg: {
        width: global.SCREEN_WIDTH,
        height: global.px2dp(245),
    },
    btnBox: {
        marginTop: global.px2dp(33),
        marginLeft: global.px2dp(15),
        marginRight: global.px2dp(15),
    },
});
