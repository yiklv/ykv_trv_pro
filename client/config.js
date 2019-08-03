/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// localhost
var host = 'http://localhost:5757';
var route_path = 'weapp';
// 测试环境
//var host = 'http://192.168.56.102:5757';


var config = {
  // 金钱标志
  currency: '￥',
  // 小程序名称
  weChatProName: "易途门票网",
  // 简称
  weChatShortName: "易途网",
  expireSessionSession: 30 * 60 * 1000,
  constant: {
    CONST_USER_INFO_KEY: "user_info_key"
  },
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/${route_path}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/${route_path}/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/${route_path}/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/${route_path}/upload`,

    // common
    common: {
      // 获取首页广告接口
      advUrl: `${host}/${route_path}/advice/list`,
      // 获取首页广告接口
      advAddUrl: `${host}/${route_path}/advice/add`,
      // 获取首页广告接口
      searchKeysUrl: `${host}/${route_path}/search/keyLists`,
      // 获取订单中的取票人信息
      getBookTktInfo: `${host}/${route_path}/spot/queryBookTktInfo`
    },
    // 景点router
    spot: {
      // 查询所有景点
      spotListUrl: `${host}/${route_path}/spot/list`,
      // 查询景点信息
      spotInfoUrl: `${host}/${route_path}/spot/querySpot`,
      // 查询景点信息
      spotImgsUrl: `${host}/${route_path}/spot/querySpotImgs`,
      // 查询景点门票信息
      spotTicketsUrl: `${host}/${route_path}/spot/querySpotTktList`,
      // 查询景点须知
      spotContentUrl: `${host}/${route_path}/spot/querySpotContentList`,
      // 查询票务须知
      spotTktContUrl: `${host}/${route_path}/spot/querySpotTktContList`,
      // 查询特定的日期价格
      spotTktDatePriceUrl: `${host}/${route_path}/spot/queryTktDatePriceList`,
    },
    wxpay: {
      //获取扫码支付url
      getPrepayUrl: `${host}/${route_path}/wxpay/queryWepayPrepayUrl`,
      // 同意下单接口
      setUnifiedOrderUrl: `${host}/${route_path}/wxpay/setUnifiedOrder`,
      // 更新订单信息
      updateOrderInfo: `${host}/${route_path}/wxpay/updateOrderInfo`,
    }
  }
};

module.exports = config;