const IP = "http://192.168.0.222";//
export let requestUrl = {
    "IP": IP,
    // 登录注册
    "register": IP + "/api-user/doctor/register",// 注册接口
    "login": IP + "/api-user/doctor/login",// 密码登陆接口
    "registerSms": IP + "/api-user/doctor/registerSms",// 注册获取短信验证码
    "smsLogin": IP + "/api-user/doctor/smsLogin",// 验证码登陆接口
    "loginSms": IP + "/api-user/doctor/loginSms",// 登陆获取短信验证码
    "passwordSms": IP + "/api-user/doctor/passwordSms",// 修改密码获取短信验证码
    "passwordReset": IP + "/api-user/doctor/passwordReset",// 重设 登陆密码
    // 文件上传
    "uploadAuthentication": IP + "/api-third/cos/upload",// 上传认证图片接口
    "loginImg": IP + "/api-third/cos/upload",// 上传医生头像接口


    // 认证相关
    "addAuthentication": IP + "/api-user/doctor/sign/add",// 提交认证信息
    "getAuthentication": IP + "/api-user/doctor/sign/get",// 查询认证信息
    "updateAuthentication": IP + "/doctor/sign/update",// 认证失败重新提交资料
    "getSignStatus": IP + "/api-user/doctor/sign/getSignStatus",// 认证状态查询
    "getIdCardInfo": IP + "/api-user/doctor/detail/getIdCardInfo",// 查询身份证信息


    // 静态缓存数据
    "getDoctorTitleJson": IP + "/api-stata/cache/static/getDoctorTitleJson",// 医生职称查询
    "getBranchServiceJson": IP + "/api-stata/cache/static/getBranchServiceJson",// 科室信息查询
    "getHospitalJson": IP + "/api-stata/cache/static/getHospitalJson",// 查询医院信息


    // "login": IP + "login",// 注册接口
};