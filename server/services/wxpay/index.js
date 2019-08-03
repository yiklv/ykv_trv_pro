'use strict';
const config = require('../../config');
const constId = require('./common');
const xml2js = require('xml2js'); //引入xml解析模块
const fs = require('fs');
const request = require('request');
const md5 = require('md5');
const WXPay = require('weixin-pay');
const qrcode = require('../../utils/qrcodeutils');
const stringutil = require('../../utils/stringutils');
const dateutil = require('../../utils/dateutils');
const serviceResponse = require('../response/response');

const pool = require('../../db/mysql');

const wxpay = WXPay({
    appid: config.appId,
    /**微信分配的小程序ID*/
    mch_id: config.mch_id,
    /**微信支付分配的商户号*/
    partner_key: config.appSecret, //微信商户平台API密钥
    pfx: fs.readFileSync(config.pfx_path), //微信商户平台证书
});

/**
 *  获取小程序扫码的URL
 *  @author yiklv_yanguo
 *  @date    2019-07-22T22:16:27+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
const queryWepayPrepayUrl = val => {
    let tktId = val.tktId;
    let url = wxpay.createMerchantPrepayUrl({ product_id: tktId });
    let qr_image = qrcode.createQr(url);
    let resList = [{ url: url, qr_image: qr_image }];
    return serviceResponse.setResponse(resList);
}
/**
 *  微信支付，统一下单
 *  应用场景：商户在小程序中先调用该接口在微信支付服务后台生成预支付交易单，返回正确的预支付交易后调起支付。
 *  @author yiklv_yanguo
 *  @date    2019-07-21T23:51:42+0800
 *  @version 1.0.0
 *  @param   Object     val   统一下单参数
 *  @return  Object     结果
 *  
字段名                 变量名              必填      类型          示例值  描述
小程序ID               appid                是     String(32) wxd678efh567hg6787                  微信分配的小程序ID
商户号                 mch_id               是     String(32) 1230000109                          微信支付分配的商户号
设备号                 device_info          否     String(32) 013467007045764                     自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
随机字符串             nonce_str            是     String(32) 5K8264ILTKCH16CQ2502SI8ZNMTM67VS  随机字符串，长度要求在32位以内。推荐随机数生成算法
签名                   sign                 是     String(32)  C380BEC2BFD727A4B6845133519F3AD6  通过签名算法计算得出的签名值，详见签名生成算法
签名类型               sign_type            否     String(32)  MD5                                 签名类型，默认为MD5，支持HMAC-SHA256和MD5。
商品描述               body                 是     String(128) 腾讯充值中心-QQ会员充值             商品简单描述，该字段请按照规范传递，具体请见参数规定
商品详情               detail               否     String(6000)                                      商品详细描述，对于使用单品优惠的商户，该字段必须按照规范上传，详见“单品优惠参数说明”
附加数据               attach               否     String(127) 深圳分店                          附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
商户订单号             out_trade_no         是     String(32) 20150806125346                      商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
标价币种               fee_type             否     String(16)  CNY                                 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详细列表请参见货币类型
标价金额               total_fee            是     Int          88                                 订单总金额，单位为分，详见支付金额
终端IP                 spbill_create_ip     是     String(64)  123.12.12.123                     支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
交易起始时间           time_start           否     String(14)  20091225091010                      订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
交易结束时间           time_expire          否     String(14)  20091227091010                      订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。订单失效时间是针对订单号而言的，由于在请求支付的时候有一个必传参数prepay_id只有两小时的有效期，所以在重入时间超过2小时的时候需要重新请求下单接口获取新的prepay_id。其他详见时间规则 建议：最短失效时间间隔大于1分钟
订单优惠标记           goods_tag            否     String(32)  WXG                                 订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见代金券或立减优惠
通知地址               notify_url           是     String(256) http://www.weixin.qq.com/wxpay/pay.php  异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。
交易类型               trade_type           是     String(16)  JSAPI                             小程序取值如下：JSAPI，详细说明见参数规定
商品ID                 product_id           否     String(32)  12235413214070356458058             trade_type=NATIVE时，此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
指定支付方式           limit_pay            否     String(32)  no_credit                         上传此参数no_credit--可限制用户不能使用信用卡支付
用户标识               openid               否     String(128) oUpF8uMuAJO_M2pxb1Q9zNjWeS6o      trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。openid如何获取，可参考【获取openid】。
电子发票入口开放标识   receipt              否     String(8) Y                                 Y，传入Y时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效
+ 场景信息             scene_info           否     String(256)  {"store_info" :                    该字段常用于线下活动时的场景信息上报，支持上报实际门店信息，商户也可以按需求自己上报相关信息。该字段为JSON对象数据，对象格式为{"store_info":{"id": "门店ID","name": "名称","area_code": "编码","address": "地址" }} ，字段详细说明请点击行前的+展开
                                                                       { "id": "SZTX001", 
                                                                         "name": "腾大餐厅", 
                                                                         "area_code": "440305", 
                                                                         "address": "科技园中一路腾讯大厦" }}  
  -门店id              id                   否     String(32)  SZTX001                            门店编号，由商户自定义
  -门店名称            name                 否     String(64)  腾讯大厦腾大餐厅                   门店名称 ，由商户自定义
  -门店行政区划码      area_code            否     String(6)  440305                              门店所在地行政区划码，详细见《最新县及县以上行政区划代码》
  -门店详细地址        address              否     String(128) 科技园中一路腾讯大厦               门店详细地址 ，由商户自定义
 */
const setUnifiedOrder = async (val) => {
    // 交易类型是JSAPI的话，此参数必传
    let openid = val.openId;

    // 查询是否有未支付的订单
    let qry_unfinished_order = constId.query_order_unfinished_cnt;
    let parameters = [openid, '1'];
    // 未完成订单个数
    let qryUnifinishedCnt;
    await pool.query(qry_unfinished_order, parameters).then(res => {
        qryUnifinishedCnt = res[0].cnt;
    });
    // 如果有未完成的订单需要完成。或者取消
    if (qryUnifinishedCnt > 0) {
        return serviceResponse.errResponse('您还有未完成的订单，请先完成订单或者取消订单');
    }

    // 调用统一支付下单
    // 小程序appid
    let appid = config.appId;
    // 小程序API密钥
    let partner_key = config.appSecret;
    // 商户号
    let mch_id = config.mch_id;
    // 通知地址
    let notify_url = config.notify_url;
    //  本地服务器地址
    let spbill_create_ip = config.spbill_create_ip;
    // 交易类型  JSAPI--JSAPI支付（或小程序支付）、NATIVE--Native支付、APP--app支付，MWEB--H5支付，不同trade_type决定了调起支付的方式，请根据支付产品正确上传  
    //           MICROPAY--付款码支付，付款码支付有单独的支付接口，所以接口不需要上传，该字段在对账单中会出现
    let trade_type = 'JSAPI';


    let nowDate = new Date(); // 当前时间
    let nextDate = dateutil.addMinute(nowDate, (val.expireTime || 15)); // 15分钟
    // 交易起始时间
    let dateStr = stringutil.formatTime(nowDate); // 时间 yyyymmddhhmiss
    // 交易结束时间
    let dateNextStr = stringutil.formatTime(nextDate); // 时间 yyyymmddhhmiss
    // 订单号
    let order_id = 'ORD' + dateStr + stringutil.random(15, { numbers: true, lettersUpper: true });
    //随机字符串
    let nonce_str = stringutil.random(32, { numbers: true, lettersUpper: true });

    // 商品描述
    let tkt_body_desc = val.body;
    // 费用
    let total_fee = val.totalFee * 100;

    let tktId = val.tktId; // 门票ID
    let tktName = val.tktName; // 门票名称
    let trvDate = val.trvDate; // 购买日期
    let tktPrice = val.tktPrice * 100; // 单价
    let totalNum = val.totalNum; // 数量

    let good_detail = {
        "cost_price": total_fee, // 订单原价
        //"receipt_id": "wx123", // 商家小票ID
        "goods_detail": [ //注意goods_detail字段的格式为"goods_detail":[{}],较多商户写成"goods_detail":{}
            {
                "goods_id": tktId, // 商品编码
                //"wxpay_goods_id": order_id, // 微信支付定义的统一商品编号（没有可不传）
                "goods_name": tktName, // 商品的实际名称
                "quantity": totalNum, // 用户购买的数量
                "price": tktPrice //  单位为：分。
            }
        ]
    };

    let goodDetail_json = JSON.stringify(good_detail);

    let params = { //签名
        appid: appid,
        body: tkt_body_desc,
        mch_id: mch_id,
        nonce_str: nonce_str,
        notify_url: notify_url,
        openid: openid,
        out_trade_no: order_id,
        spbill_create_ip: spbill_create_ip,
        total_fee: total_fee,
        time_start: dateStr,
        time_expire: dateNextStr,
        partner_key: partner_key,
        detail: goodDetail_json,
        trade_type: 'JSAPI'
    }
    let sign = createSign(params);

    // 统一下单URL
    const reqUrl = constId.unifiedorderUrl;
    let formData = '<xml>' +
        '<appid>' + appid + '</appid>' +
        '<mch_id>' + mch_id + '</mch_id>' +
        '<nonce_str>' + nonce_str + '</nonce_str>' +
        '<sign>' + sign + '</sign>' +
        '<body>' + tkt_body_desc + '</body>' +
        '<detail><![CDATA[' + goodDetail_json + ']]></detail>' +
        '<out_trade_no>' + order_id + '</out_trade_no>' +
        '<total_fee>' + total_fee + '</total_fee>' +
        '<spbill_create_ip>' + spbill_create_ip + '</spbill_create_ip>' +
        '<notify_url>' + notify_url + '</notify_url>' +
        '<trade_type>' + trade_type + '</trade_type>' +
        '<openid>' + openid + '</openid>' +
        '<time_start>' + dateStr + '</time_start>' +
        '<time_expire>' + dateNextStr + '</time_expire>' +
        '</xml>';

    return new Promise((resolve, reject) => {
        request({
            url: reqUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: formData
        }, function(error, response, resbody) {

            if (error) {
                console.log('wxpay.setUnifiedOrder error:', error);
                // 接口异常
                reject({ message: error });
            } else if (response.statusCode != 200) {
                console.log('wxpay.setUnifiedOrder response error:', response);
                // URL返回错误
                reject({ message: response.statusMessage });
            } else if (response.statusCode == 200) {

                console.log(resbody, '统一下单接口返回的数据'); // 请求成功的处理逻辑
                // 测试用

                resbody = `<xml><return_code><![CDATA[SUCCESS]]></return_code>
                        <return_msg><![CDATA[OK]]></return_msg>
                        <appid><![CDATA[wx2421b1c4370ec43b]]></appid>
                        <mch_id><![CDATA[10000100]]></mch_id>
                        <nonce_str><![CDATA[IITRi8Iabbblz1Jc]]></nonce_str>
                        <openid><![CDATA[oUpF8uMuAJO_M2pxb1Q9zNjWeS6o]]></openid>
                        <sign><![CDATA[7921E432F65EB8ED0CE9755F0E86D72F]]></sign>
                        <result_code><![CDATA[SUCCESS]]></result_code>
                        <prepay_id><![CDATA[wx201411101639507cbf6ffd8b0779950874]]></prepay_id>
                        <trade_type><![CDATA[JSAPI]]></trade_type></xml>`;

                // 解析json
                xml2js.parseString(resbody, function(error, result) {
                    let reData = result.xml;
                    if (reData.return_code && reData.return_code[0] == 'SUCCESS') {
                        let responseData = {
                            timeStamp: new Date().getTime(),
                            nonceStr: reData.nonce_str[0],
                            package: 'prepay_id=' + reData.prepay_id[0],
                            key: reData.sign[0],
                            appId: appid,
                            signType: 'MD5',
                        }

                        responseData.paySign = createSignAgain(responseData);
                        // 更新取票人信息
                        mergeTktBookInfoService(val);

                        // 插入一条未支付的订单信息
                        let orderParam = {
                            order_id: order_id,
                            tkt_body_desc: tkt_body_desc,
                            openid: openid,
                            tktId: tktId,
                            trvDate: trvDate,
                            tktPrice: tktPrice,
                            totalNum: totalNum,
                            total_fee: total_fee,
                            dateStr: dateStr,
                            dateNextStr: dateNextStr,
                            formData: formData,
                            order_status: '1'
                        };
                        createTktOrderService(orderParam);

                        // 返回订单信息
                        resolve(responseData);
                    } else {
                        console.log('wxpay.setUnifiedOrder response xml fail:', response);
                        reject({ message: reData.return_msg[0] });
                    }
                });

            } else {
                resolve([]);
            }
        });
    });
}

/**
 *  微信支付回调接口服务类
 *  @author yiklv_yanguo
 *  @date    2019-07-30T22:34:35+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
const updateOrderInfo = (val) => {
    let xml = val;
    xml = xml.replace(/\\n/g, '').replace(/\s/g, "").replace(/\"/g, '');
    // 解析json
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, function(error, result) {
            let xmlReturnStr = "";
            let reData = result.xml;
            if (reData.return_code && reData.return_code[0] == 'SUCCESS') {
                // 比较appid是否一致
                if (reData.appid[0] == config.appId) {
                    let _orderId = reData.out_trade_no[0];
                    // 查询订单是否存在或者是否有效
                    queryOrderInfoById(_orderId).then(res => {
                        if (res[0].qryCnt === 0) {
                            xmlReturnStr = wxpayReturnXml('FAIL', "out_trade_no is not exists");
                        } else {
                            // 更新状态为成功
                            updateOrderById(_orderId, reData.time_end[0]);
                            xmlReturnStr = wxpayReturnXml('SUCCESS', "OK");
                        }
                    });
                } else {
                    xmlReturnStr = wxpayReturnXml('FAIL', "appid is not exists");
                }
            } else {
                console.log('wxpay.setUnifiedOrder response xml fail:', response);
                xmlReturnStr = wxpayReturnXml('FAIL', reData.return_msg[0]);
            }
            resolve(xmlReturnStr);
        });
    });

}

/**
 *  签名算法
 *  @author yiklv_yanguo
 *  @date    2019-07-27T22:57:40+0800
 *  @version 1.0.0
 *  @param   {OBJECT}                 obj [description]
 *  @return  {String}                     [description]
 */
function createSign(obj) { //签名算法（把所有的非空的参数，按字典顺序组合起来+key,然后md5加密，再把加密结果都转成大写的即可）
    /*var stringA = 'appid=' + obj.appid + '&body=' + obj.body + '&mch_id=' + obj.mch_id + '&nonce_str=' + obj.nonce_str + '&notify_url=' + obj.notify_url +
        '&openid=' + obj.openid + '&out_trade_no=' + obj.out_trade_no + '&spbill_create_ip=' + obj.spbill_create_ip + '&total_fee=' + obj.total_fee + '&trade_type=' + obj.trade_type;
    let stringSignTemp = stringA + '&key=' + obj.partner_key;
    */
    let stringSignTemp = raw(obj);
    stringSignTemp = md5(stringSignTemp);
    let signValue = stringSignTemp.toUpperCase();
    return signValue;
}

/**
 *  二次签名算法
 *  @author yiklv_yanguo
 *  @date    2019-07-27T22:57:40+0800
 *  @version 1.0.0
 *  @param   {OBJECT}                 obj [description]
 *  @return  {String}                     [description]
 *  appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111
 */
function createSignAgain(obj) { //签名算法（把所有的非空的参数，按字典顺序组合起来+key,然后md5加密，再把加密结果都转成大写的即可）
    /*var stringA = 'appId=' + obj.appId + '&nonceStr=' + obj.nonceStr + '&package=' + obj.package + '&signType=' + obj.signType + '&timeStamp=' + obj.timeStamp ;
    let stringSignTemp = stringA + '&key=' + obj.key;*/

    let stringSignTemp = raw(obj);
    stringSignTemp = md5(stringSignTemp);
    let signValue = stringSignTemp.toUpperCase();
    return signValue;
}

/**
 *  生成随机数
 *  @author yiklv_yanguo
 *  @date    2019-07-27T23:37:50+0800
 *  @version [version]
 *  @return  {[type]}                 [description]
 */
function randomStr() { //产生一个32位随机字符串  
    var str = "";
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (var i = 1; i <= 32; i++) {
        var random = Math.floor(Math.random() * arr.length);
        str += arr[random];
    }

    return str;
}

/**
 *  更新取票人信息
 *  @author yiklv_yanguo
 *  @date    2019-07-28T22:42:49+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
function mergeTktBookInfoService(val) {
    let bookInfo = val.bookInfo;
    let openid = val.openId;
    let sql_spot_book = constId.merge_book_info;
    let bookParam = [openid, bookInfo.tktUserName, bookInfo.tktMobilephone, bookInfo.tktIdNo, bookInfo.tktUserName, bookInfo.tktMobilephone, bookInfo.tktIdNo];
    pool.insert(sql_spot_book, bookParam);
}
/**
 *  生成订单信息
 *  @author yiklv_yanguo
 *  @date    2019-07-28T22:48:17+0800
 *  @version 1.0.0
 *  @param   {Object}                 obj [description]
 *  @return  {[type]}                     [description]
 */
function createTktOrderService(obj) {
    let sql_spot_order = constId.insert_order_unfinished;
    let orderParam = [obj.order_id, obj.tkt_body_desc, obj.openid, obj.tktId, obj.trvDate, obj.tktPrice, obj.totalNum, obj.total_fee, obj.dateStr, obj.dateNextStr, obj.formData, obj.order_status];
    pool.insert(sql_spot_order, orderParam);
}

/**
 *  object 转String
 *  @author yiklv_yanguo
 *  @date    2019-07-29T20:43:01+0800
 *  @version [version]
 *  @param   {[type]}                 args [description]
 *  @return  {[type]}                      [description]
 */
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function(key) {
        // newArgs[key.toLowerCase()] = args[key];
        newArgs[key] = args[key];
    });
    var str = '';
    for (var k in newArgs) {
        str += '&' + k + '=' + newArgs[k];
    }
    str = str.substr(1);
    console.log(str);
    return str;
}

/**
 *  微信通知返回报文
 *  @author yiklv_yanguo
 *  @date    2019-08-01T21:59:02+0800
 *  @version [version]
 *  @param   {[type]}                 resCode SUCCESS/FAIL
 *  @param   {[type]}                 resMsg    返回信息，如非空，为错误原因：签名失败 参数格式校验错误
 *  @return  {[type]}                         [description]
 */
function wxpayReturnXml(resCode, resMsg) {
    return `<xml><return_code><![CDATA[${resCode}]]></return_code><return_msg><![CDATA[${resMsg}]]></return_msg></xml>`;
}

/**
 *  查询订单是否存在 或者是否过期
 *  @author yiklv_yanguo
 *  @date    2019-08-01T23:28:34+0800
 *  @version [version]
 *  @param   {[type]}                 orderId [description]
 *  @return  {[type]}                         [description]
 */
function queryOrderInfoById(orderId) {

    let _orderId = orderId;
    let query_order_exists = constId.query_order_by_id_sql;
    let param = [_orderId, '1'];
    return pool.query(query_order_exists, param);
}
/**
 *  更新订单状态
 *  @author yiklv_yanguo
 *  @date    2019-08-01T23:30:07+0800
 *  @version [version]
 *  @param   {[type]}                 orderId [description]
 *  @return  {[type]}                         [description]
 */
function updateOrderById(orderId, endTime) {
    let _orderId = orderId;
    let update_order_id_sql = constId.update_order_id_sql;
    let param = ['2', endTime, 'wxpay_return', _orderId];
    return pool.update(update_order_id_sql, param);
}



module.exports = {
    queryWepayPrepayUrl,
    setUnifiedOrder,
    updateOrderInfo,
}