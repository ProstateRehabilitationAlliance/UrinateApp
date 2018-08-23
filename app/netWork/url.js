const IP = "http://192.168.0.222";//
export let requestUrl = {
    "idCardFrontUrl": 'https://checking-records-1256660245.cos.ap-beijing.myqcloud.com/IDCard_up.jpg',// 身份证示例图片
    "doctorCardFrontUrl": 'https://checking-records-1256660245.cos.ap-beijing.myqcloud.com/IDCard_up.jpg',// 医生执业证示例图片
    "workCardUrl": 'https://checking-records-1256660245.cos.ap-beijing.myqcloud.com/IDCard_up.jpg',// 手持身份证示例图片
    "IP": IP,
    // 登录注册
    "register": IP + "/api-user/doctor/register",// 注册接口
    "login": IP + "/api-user/doctor/login",// 密码登陆接口
    "registerSms": IP + "/api-user/doctor/registerSms",// 注册获取短信验证码
    "smsLogin": IP + "/api-user/doctor/smsLogin",// 验证码登陆接口
    "loginSms": IP + "/api-user/doctor/loginSms",// 登陆获取短信验证码
    "passwordSms": IP + "/api-user/doctor/passwordSms",// 修改密码获取短信验证码
    "passwordReset": IP + "/api-user/doctor/passwordReset",// 重置 登陆密码
    "getUsername": IP + "/api-user/doctor/getUsername",// 获取用户登陆手机号
    "updatePassword": IP + "/api-user/doctor/updatePassword",// 根据旧密码修改密码
    "logOut": IP + "/api-user/doctor/logOut",// 退出登陆


    // 文件上传
    "uploadAuthentication": IP + "/api-third/cos/upload",// 上传认证图片接口
    "uploadHeadImg": IP + "/api-third/cos/upload",// 上传医生头像接口


    // 认证相关
    "addAuthentication": IP + "/api-user/doctor/sign/add",// 提交认证信息
    "getAuthentication": IP + "/api-user/doctor/sign/get",// 查询认证信息
    "updateAuthentication": IP + "/api-user/doctor/sign/update",// 认证失败重新提交资料
    "getSignStatus": IP + "/api-user/doctor/sign/getSignStatus",// 认证状态查询
    "getIdCardInfo": IP + "/api-user/doctor/detail/getIdCardInfo",// 查询身份证信息


    // 静态缓存数据
    "getDoctorTitleJson": IP + "/api-stata/cache/static/getDoctorTitleJson",// 医生职称查询
    "getBranchServiceJson": IP + "/api-stata/cache/static/getBranchServiceJson",// 科室信息查询
    "getHospitalJson": IP + "/api-stata/cache/static/getHospitalJson",// 查询医院信息

    // 个人中心
    "getDoctorDetail": IP + "/api-user/doctor/detail/getDoctorDetail",// 医生查询个人信息
    "updateDoctorDetail": IP + "/api-user/doctor/detail/updateDoctorDetail",// 医生修改个人信息
    "findDoctorList": IP + "/api-user/doctor/detail/findDoctorList",// 条件查询医生列表
    "addFeedback": IP + "/api-stata/feedback/add",// 添加反馈意见
    "queryCount": IP + "/api-goods/goods/inquiry/queryCount",// 医生问诊服务数量查询
    "queryListByToken": IP + "/api-goods/goods/inquiry/queryListByToken",// 根据token查询问诊服务列表
    "queryListByDoctor": IP + "/api-goods/goods/inquiry/queryListByDoctor",// 根医生ID查询问诊服务列表
    "addGoods": IP + "/api-goods/goods/inquiry/add",// 添加服务


    // 通讯录
    "getDoctorDetailById": IP + "/api-user/doctor/detail/getDoctorDetailById",// 其他用户查询医生信息
    "focus": IP + "/api-user/fansStar/focus",// 关注接口
    "unFocus": IP + "/api-user/fansStar/unFocus",// 取消关注
    "findStar": IP + "/api-user/doctor/detail/findStar",// 查询关注的医生

    // 问诊
    "inquiryOrder": [
        IP + "/api-order/order/inquiry/getAllOrderList",//查询全部订单列表
        IP + "/api-order/order/inquiry/getAnsweredOrderList",// 查询待回复订单列表
        IP + "/api-order/order/inquiry/getAcceptedOrderList",// 查询待接受订单列表
        IP + "/api-order/order/inquiry/getBeRejectedOrderList",// 查询已拒绝订单列表
        IP + "/api-order/order/inquiry/getIsDoneOrderList",// 查询已完成订单列表
    ],// 问诊订单列表
    "turnOrder": [
        IP + "/api-order/order/inquiry/getAllTurnOrderList",//查询全部转诊订单列表
        IP + "/api-order/order/inquiry/getAnsweredTurnOrderList",// 查询待回复转诊订单列表
        IP + "/api-order/order/inquiry/getAcceptedTurnOrderList",// 查询待接受转诊订单列表
        IP + "/api-order/order/inquiry/getBeRejectedTurnOrderList",// 查询已拒绝转诊订单列表
        IP + "/api-order/order/inquiry/getIsDoneTurnOrderList",// 查询已完成转诊订单列表
    ],// 转诊订单列表
    "getOrder": IP + "/api-order/order/inquiry/getOrder",// 订单详情
    "getBaseInfoById": IP + "/api-record/patient/getBaseInfoById",// 跟据患者ID查询患者基本信息
    "getByGroupNumber": IP + "/api-archive/medical/report/getByGroupNumber",// 根据档案编号 查询 文件档案路径
    "getByArchive": IP + "/api-assessmen/record/inquiry/getByArchive",// 查询 问诊 回复
    "addDraft": IP + "/api-assessmen/record/inquiry/addDraft",// 添加问诊回复草稿
    "addFinal": IP + "/api-assessmen/record/inquiry/addFinal",// 添加问诊最终回复
    "rejectedOrder": IP + "/api-order/order/inquiry/rejectedOrder",// 拒绝问诊订单
    "acceptedOrder": IP + "/api-order/order/inquiry/acceptedOrder",// 接受问诊订单

    // "login": IP + "login",// 注册接口
    // "login": IP + "login",// 注册接口
    // "login": IP + "login",// 注册接口
};