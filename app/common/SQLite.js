import React, { Component } from 'react';
import { Platform } from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
var database_name = "UrinateApp.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "MySQLite";
var database_size = -1;//-1应该是表示无限制
var db;
export default class SQLite extends Component {
    componentWillUnmount() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage not open");
        }
    }
    open() {
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
        return db;
    }
    createTable() {
        if (!db) {
            this.open();
        }
        db.transaction((tx) => {
            //创建 user
            tx.executeSql('CREATE TABLE IF NOT EXISTS user(' +
                'id VARCHAR PRIMARY KEY,' +
                'doctorName VARCHAR,' + //姓名
                'doctorSex VARCHAR,' +//性别
                'doctorAddress VARCHAR,' +//地址
                'doctorCardNumber VARCHAR,' +//身份证号
                'hospitalId VARCHAR,' +//医院id
                'hospitalName VARCHAR,' +//医院名字
                'branchId VARCHAR,' +//科室id
                'branchName VARCHAR,' +//科室名字
                'titleId VARCHAR,' +//职称id
                'titleName VARCHAR,' +//职称名字
                'headImg VARCHAR,' +//头像地址
                'doctorResume VARCHAR,' +//简介
                'doctorStrong VARCHAR,' +//擅长
                'signStatus VARCHAR)'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
            //创建 医院表
            tx.executeSql('CREATE TABLE IF NOT EXISTS hospital(' +
                'id VARCHAR PRIMARY KEY,' +
                'hospitalName VARCHAR)'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
            //创建 科室表
            tx.executeSql('CREATE TABLE IF NOT EXISTS branch(' +
                'id VARCHAR PRIMARY KEY,' +
                'branchName VARCHAR)'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
            //创建 职称表
            tx.executeSql('CREATE TABLE IF NOT EXISTS title(' +
                'id VARCHAR PRIMARY KEY,' +
                'titleName VARCHAR)'
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })
    }
    // 清空表数据
    deleteData(sql) {
        if (!db) {
            this.open();
        }
        db.transaction((tx) => {
            tx.executeSql(sql, [], () => {

            });
        });
    }
    // 删除表
    dropTable(sql) {
        db.transaction((tx) => {
            tx.executeSql(sql, [], () => {

            });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }
    // insertUserData(userData) {
    //     let len = userData.length;
    //     if (!db) {
    //         this.open();
    //     }
    //     this.createTable();
    //     this.deleteData();
    //     db.transaction((tx) => {
    //         for (let i = 0; i < len; i++) {
    //             var user = userData[i];
    //             let name = user.name;
    //             let age = user.age;
    //             let sex = user.sex;
    //             let phone = user.phone;
    //             let email = user.email;
    //             let qq = user.qq;
    //             let sql = "INSERT INTO user(name,age,sex,phone,email,qq)" +
    //                 "values(?,?,?,?,?,?)";
    //             tx.executeSql(sql, [name, age, sex, phone, email, qq], () => {

    //             }, (err) => {
    //                 console.log(err);
    //             }
    //             );
    //         }
    //     }, (error) => {
    //         this._errorCB('transaction', error);
    //     }, () => {
    //         this._successCB('transaction insert data');
    //     });
    // }
    close() {
        if (db) {
            db.close();
            this._successCB('close');
        } else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }
    _successCB(name) {
        console.log("SQLiteStorage " + name + " success");
    }
    _errorCB(name, err) {
        console.log("SQLiteStorage " + name);
        console.log(err);
    }
    render() {
        return null;
    }
};