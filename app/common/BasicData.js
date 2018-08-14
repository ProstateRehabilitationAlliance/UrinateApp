import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { requestUrl } from "../netWork/Url";
import { global } from '../utils/Global';// 常量
import ErrorPrompt from "../common/ErrorPrompt";
import SQLite from '../common/SQLite';
var sqLite = new SQLite();
var db;
export default class BasicData extends Component {
    static defaultProps = {
        titleData: () => { },
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ErrorPromptFlag: false,
            ErrorPromptText: '',
            ErrorPromptImg: '',
        }
    }
    // 医院数据插入
    insertHospital(hospitalJSON) {
        // 循环插入数据
        db.transaction((tx) => {
            for (let key in hospitalJSON) {
                let id = key;
                let hospitalName = hospitalJSON[key];
                let sql = "INSERT INTO hospital(id,hospitalName)" +
                    "values(?,?)";
                tx.executeSql(sql, [id, hospitalName], () => {

                }, (err) => {
                    console.log(err);
                });
            }
        }, (error) => {
            console.log(error);
        });
    }
    // 获取医院json数据
    getHospitalJson() {
        return new Promise(function (resolve, reject) {
            fetch(requestUrl.getHospitalJson, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        });

    }
    // 查询本地医院数据
    getHospitalData() {
        db = sqLite.open();
        db.transaction((tx) => {
            // 查医院数据列表
            tx.executeSql("select * from hospital", [], (tx, results) => {
                var len = results.rows.length;
                if (len <= 0) {
                    // 获取医院数据 - start
                    var _this = this;
                    this.getHospitalJson().then(function (responseData) {
                        if (responseData.code == 20000) {
                            _this.insertHospital(responseData.result);
                            _this.getHospitalData();
                        } else {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '医院数据获取失败',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                        }
                    });
                    // 获取医院数据 - end
                } else {
                    let tempArr = [];
                    for (var i = 0; i < len; i++) {
                        tempArr.push({
                            id: results.rows.item(i).id,
                            hospitalName: results.rows.item(i).hospitalName,
                        })
                    }
                    this.props.hospitalData(tempArr)
                }
            });
        }, (error) => {//打印异常信息
            console.log(error);
        });
    }



    // 科室数据插入
    insertSection(branchJSON) {
        // 循环插入数据
        db.transaction((tx) => {
            for (let key in branchJSON) {
                let id = key;
                let branchName = branchJSON[key];
                let sql = "INSERT INTO branch(id,branchName)" +
                    "values(?,?)";
                tx.executeSql(sql, [id, branchName], () => {

                }, (err) => {
                    console.log(err);
                });
            }
        }, (error) => {
            console.log(error);
        });
    }
    // 获取科室json数据
    getBranchServiceJson() {
        return new Promise(function (resolve, reject) {
            fetch(requestUrl.getBranchServiceJson, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    resolve(responseData)
                })
                .catch((error) => {
                    console.log('error', error);
                });
        });
    }
    // 查询本地科室数据
    getBranchData() {
        db = sqLite.open();
        db.transaction((tx) => {
            // 查科室数据列表
            tx.executeSql("select * from branch", [], (tx, results) => {
                var len = results.rows.length;
                if (len <= 0) {
                    var _this = this;
                    this.getBranchServiceJson().then(function (responseData) {
                        if (responseData.code == 20000) {
                            _this.insertSection(responseData.result);
                            _this.getBranchData();
                        } else {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '科室数据获取失败',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                        }
                    });
                } else {
                    let tempArr = [];
                    for (var i = 0; i < len; i++) {
                        tempArr.push({
                            id: results.rows.item(i).id,
                            branchName: results.rows.item(i).branchName,
                        })
                    }
                    this.props.branchData(tempArr)
                }
            });
        }, (error) => {//打印异常信息
            console.log(error);
        });
    }



    // 职称数据插入
    insertTitle(titleJSON) {
        // 循环插入数据
        db.transaction((tx) => {
            for (let key in titleJSON) {
                let id = key;
                let titleName = titleJSON[key];
                let sql = "INSERT INTO title(id,titleName)" +
                    "values(?,?)";
                tx.executeSql(sql, [id, titleName], () => {

                }, (err) => {
                    console.log(err);
                });
            }
        }, (error) => {
            console.log(error);
        });
    }
    // 获取职称JSON数据
    getDoctorTitleJson() {
        return new Promise(function (resolve, reject) {
            fetch(requestUrl.getDoctorTitleJson, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        });

    }
    // 查询本地职称列表
    getTitleData() {
        db = sqLite.open();
        db.transaction((tx) => {
            // 查职称数据列表
            tx.executeSql("select * from title", [], (tx, results) => {
                var len = results.rows.length;
                if (len <= 0) {
                    var _this = this;
                    this.getDoctorTitleJson().then(function (responseData) {
                        if (responseData.code == 20000) {
                            _this.insertTitle(responseData.result);
                            _this.getTitleData();
                        } else {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '获取职称数据失败',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                        }
                    });
                } else {
                    let tempArr = [];
                    for (var i = 0; i < len; i++) {
                        tempArr.push({
                            "id": results.rows.item(i).id,
                            "titleName": results.rows.item(i).titleName,
                        })
                    }
                    this.props.titleData(tempArr)
                }
            });
        }, (error) => {//打印异常信息
            console.log(error);
        });
    }


    // 根据 id 查 对应的名字
    idToName(obj) {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from hospital where id = ?", [obj.hospitalId], (tx, results) => {
                var len = results.rows.length;
                let sql = "UPDATE user SET hospitalName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).hospitalName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
            tx.executeSql("select * from branch where id = ?", [obj.branchId], (tx, results) => {
                var len = results.rows.length;
                let sql = "UPDATE user SET branchName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).branchName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
            tx.executeSql("select * from title where id = ?", [obj.titleId], (tx, results) => {
                var len = results.rows.length;
                let sql = "UPDATE user SET titleName = ? WHERE id = ?";
                tx.executeSql(sql, [results.rows.item(0).titleName, global.Token], () => {

                }, (err) => {
                    console.log(err);
                });
            })
        })
    }
    // 用户基本信息更新
    upDateUser(obj) {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from user", [], (tx, results) => {
                var len = results.rows.length;
                if (len <= 0) {
                    let sql = "INSERT INTO user(id,doctorName,doctorSex,doctorAddress,doctorCardNumber,hospitalId,hospitalName,branchId,branchName,titleId,titleName,headImg,doctorResume,doctorStrong,signStatus)" + " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    tx.executeSql(sql, [global.Token, obj.doctorName, obj.doctorSex, obj.doctorAddress, obj.doctorCardNumber, obj.hospitalId, '', obj.branchId, '', obj.titleId, '', obj.headImg, obj.doctorResume, obj.doctorStrong, ''], () => {

                    }, (err) => {
                        console.log(err);
                    });
                } else {
                    let sql = "UPDATE user SET doctorName = ?,doctorSex=?,doctorAddress=?,doctorCardNumber=?,hospitalId=?,branchId=?,titleId=?,headImg=?,doctorResume=?,doctorStrong=? WHERE id = ?";
                    tx.executeSql(sql, [obj.doctorName, obj.doctorSex, obj.doctorAddress, obj.doctorCardNumber, obj.hospitalId, obj.branchId, obj.titleId, obj.headImg, obj.doctorResume, obj.doctorStrong, global.Token], () => {

                    }, (err) => {
                        console.log(err);
                    });
                }
            })

        }, (error) => {
            console.log(error);
        });
    }
    // 认证信息更新
    upDateSignState(signStatus) {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from user", [], (tx, results) => {
                var len = results.rows.length;
                if (len <= 0) {
                    let sql = "INSERT INTO user(id,doctorName,doctorSex,doctorAddress,doctorCardNumber,hospitalId,hospitalName,branchId,branchName,titleId,titleName,headImg,doctorResume,doctorStrong,signStatus)" + " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    tx.executeSql(sql, [global.Token, '', '', '', '', '', '', '', '', '', '', '', '', '', signStatus], () => {

                    }, (err) => {
                        console.log(err);
                    });
                } else {
                    let sql = "UPDATE user SET signStatus = ? WHERE id = ?";
                    tx.executeSql(sql, [signStatus, global.Token], () => {

                    }, (err) => {
                        console.log(err);
                    });
                }
            })

        }, (error) => {
            console.log(error);
        });
    }
    // 获取后台个人信息
    getDoctorDetail() {
        // 获取个人信息数据-start
        this.setState({
            isLoading: true,
            ErrorPromptFlag: true,
            ErrorPromptText: '加载中...',
            ErrorPromptImg: require('../images/loading.png'),
        });
        return new Promise(function (resolve, reject) {
            fetch(requestUrl.getDoctorDetail, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        })
    }
    // 获取后台认证状态
    getSignStates() {
        return new Promise(function (resolve, reject) {
            fetch(requestUrl.getSignStatus, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": global.Token,
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('responseData', responseData);
                    resolve(responseData);
                })
                .catch(
                    (error) => {
                        console.log('error', error);
                    });
        })

    }
    // 获取本地个人信息
    getLocalDoctorDetail() {
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from user", [], (tx, results) => {
                if (results.rows.length <= 0 || !results.rows.item(0).signStatus && !results.rows.item(0).hospitalName) {
                    var _this = this;
                    // 基本信息
                    this.getDoctorDetail().then(function (responseData) {
                        if (responseData.code == 20000) {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: false,
                            });
                            _this.idToName(responseData.result);
                            _this.upDateUser(responseData.result);
                            _this.getLocalDoctorDetail();
                        } else if (responseData == 40004) {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '您还未认证',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                            clearTimeout(_this.timer)
                            _this.timer = setTimeout(() => {
                                _this.setState({
                                    ErrorPromptFlag: false,
                                })
                            }, global.TimingCount)
                        } else if (responseData == 50000) {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '服务器繁忙',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                            clearTimeout(_this.timer)
                            _this.timer = setTimeout(() => {
                                _this.setState({
                                    ErrorPromptFlag: false,
                                })
                            }, global.TimingCount)
                        } else {
                            _this.setState({
                                isLoading: false,
                                ErrorPromptFlag: true,
                                ErrorPromptText: '服务器繁忙',
                                ErrorPromptImg: require('../images/error.png'),
                            })
                            clearTimeout(_this.timer)
                            _this.timer = setTimeout(() => {
                                _this.setState({
                                    ErrorPromptFlag: false,
                                })
                            }, global.TimingCount)
                        }
                    });
                    this.getSignStates().then(function (responseData) {
                        if (responseData.code == 20000) {
                            // 认证成功
                            _this.upDateSignState('AUTHENTICATION_SUCCESS');
                            _this.getLocalDoctorDetail();
                        } else if (responseData.code == 40002) {
                            // 认证中
                            // _this.upDateSignState('AUTHENTICATION_PROGRESS');
                            _this.getLocalDoctorDetail();
                        } else if (responseData.code == 40003) {
                            // 认证信息审核失败
                            // _this.upDateSignState('AUTHENTICATION_FAILED');
                            _this.getLocalDoctorDetail();
                        } else if (responseData.code == 40004) {
                            // 认证信息未填写
                            // _this.upDateSignState('AUTHENTICATION_EMPTY');
                            _this.getLocalDoctorDetail();
                        }
                    })
                } else {
                    this.props.userInfo(results.rows.item(0));
                }
            })
        })
    }

    deleteUser() {
        sqLite.dropTable("delete from user");
    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={{ position: 'relative', }} >
                <StatusBar
                    animated={true}//是否动画
                    hidden={false}//是否隐藏
                    backgroundColor={'#000'}//android 设置状态栏背景颜色
                    translucent={false}//android 设置状态栏是否为透明
                    showHideTransition="fade"//IOS状态栏改变时动画 fade:默认 slide
                    networkActivityIndicatorVisible={this.state.isLoading}//IOS设定网络活动指示器(就是那个菊花)是否显示在状态栏。
                    statusBarStyle={"default"}//ios:白底黑字  android:黑底白字
                />
                {this.state.ErrorPromptFlag ? <ErrorPrompt text={this.state.ErrorPromptText} imgUrl={this.state.ErrorPromptImg} /> : null}
            </View >
        );
    }
}
