/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://localhost:5757';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // common
        common: {
            // 获取首页广告接口
            advUrl: `${host}/weapp/advice/list`,
            // 获取首页广告接口
            advAddUrl: `${host}/weapp/advice/add`,
            // 获取首页广告接口
            searchKeysUrl: `${host}/weapp/search/keyLists`
        }, 
        // 景点router
        spot:{
            spotListUrl: `${host}/weapp/spot/list`, // 查询所有景点
            spotInfoUrl: `${host}/weapp/spot/querySpot` // 查询景点信息
        }  
    }
};

module.exports = config;
