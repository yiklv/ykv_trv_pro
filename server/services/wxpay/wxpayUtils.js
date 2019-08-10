'use strict';

const md5 = require('md5');
/**
 *  签名算法
 *  @author yiklv_yanguo
 *  @date    2019-07-27T22:57:40+0800
 *  @version 1.0.0
 *  @param   {OBJECT}                 obj [description]
 *  @return  {String}                     [description]
 */
const createSign = (obj) =>{ //签名算法（把所有的非空的参数，按字典顺序组合起来+key,然后md5加密，再把加密结果都转成大写的即可）
    /*var stringA = 'appid=' + obj.appid + '&body=' + obj.body + '&mch_id=' + obj.mch_id + '&nonce_str=' + obj.nonce_str + '&notify_url=' + obj.notify_url +
        '&openid=' + obj.openid + '&out_trade_no=' + obj.out_trade_no + '&spbill_create_ip=' + obj.spbill_create_ip + '&total_fee=' + obj.total_fee + '&trade_type=' + obj.trade_type;
    let stringSignTemp = stringA + '&key=' + obj.partner_key;
    */
    let stringSignTemp = raw(obj);
    console.log('sign string', stringSignTemp);
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
const createSignAgain = (obj) =>{ //签名算法（把所有的非空的参数，按字典顺序组合起来+key,然后md5加密，再把加密结果都转成大写的即可）
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
const randomStr = () => { //产生一个32位随机字符串  
    var str = "";
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (var i = 1; i <= 32; i++) {
        var random = Math.floor(Math.random() * arr.length);
        str += arr[random];
    }

    return str;
}



/**
 *  object 转String
 *  @author yiklv_yanguo
 *  @date    2019-07-29T20:43:01+0800
 *  @version [version]
 *  @param   {[type]}                 args [description]
 *  @return  {[type]}                      [description]
 */
const raw = (args) => {
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
const wxpayReturnXml = (resCode, resMsg) =>{
    return `<xml><return_code><![CDATA[${resCode}]]></return_code><return_msg><![CDATA[${resMsg}]]></return_msg></xml>`;
}

module.exports = {
	createSign:createSign,
	createSignAgain:createSignAgain,
	randomStr:randomStr,
	raw:raw,
	wxpayReturnXml:wxpayReturnXml,
};