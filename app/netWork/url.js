const IP = "http://192.168.0.222";//
export let requestUrl = {
    "IP": IP,
    "register": IP + "/api-user/doctor/register",// 注册接口
    "login": IP + "/api-user/doctor/login",// 密码登陆接口
    "registerSms": IP + "/api-user/doctor/registerSms",// 注册获取短信验证码
    "smsLogin": IP + "/api-user/doctor/smsLogin",// 验证码登陆接口
    "loginSms": IP + "/api-user/doctor/loginSms",// 登陆获取短信验证码
    "passwordSms": IP + "/api-user/doctor/passwordSms",// 修改密码获取短信验证码
    "passwordReset": IP + "/api-user/doctor/passwordReset",// 重设 登陆密码
    // "login": IP + "login",// 注册接口
    // "login": IP + "login",// 注册接口
    // "login": IP + "login",// 注册接口
};