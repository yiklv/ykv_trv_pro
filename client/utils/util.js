/**
 * YYYY/MM/DD HH24:mi:ss
 */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * YYYY/MM/DD
 */
const formatDate = (date, split) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate();
    if (split == undefined || split == null){
        split = '-';
    }
    return [year, month, day].map(formatNumber).join(split);
}
/**
 * 转换成日期格式  
 * 格式：2017-12-13 16:00:00
 */
var parserDate = function(date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
}

// 日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(dateParam, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = dateParam;
    date.setDate(date.getDate() + days);
    var month = date.getMonth();
    var day = date.getDate() + 1;
    return date;
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

/**
 * Loading页面
 */
var showLoading = text => wx.showLoading({
    title: text
})

var hiddenLoading = () => wx.hideLoading();


var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X
/**
 * 校验身份证号是否正确
 * @param a_idCard 身份证号码数组
 * @return true 验证通过  false 验证失败
 */   
var idCardValidate = (idCard) =>{
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**  
* 判断身份证号码为18位时最后的验证位是否正确  
* @param a_idCard 身份证号码数组  
* @return  
*/
var isTrueValidateCodeBy18IdCard = (a_idCard) =>{
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    let valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**  
  * 验证18位数身份证号码中的生日是否是有效生日  
  * @param idCard 18位书身份证字符串  
  * @return  
  */
var isValidityBrithBy18IdCard = (idCard18) => {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**  
 * 验证15位数身份证号码中的生日是否是有效生日  
 * @param idCard15 15位书身份证字符串  
 * @return  
 */
var isValidityBrithBy15IdCard = (idCard15) => {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格   
var trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}  
/**
 * 手机号校验
 * @param phone 手机号码
 * @return true 通过 false 不通过
 */
const phoneValidate = (phone) => {
    return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone));
}

/**
 * 判断是否是中文
 * @param val 参数
 * @return true 是 false 否 
 */
const chineseValidate = (val) => {
    let reg = /^[\u4E00-\u9FA5]+$/;
    return reg.test(val);
}
/**
 * 字符长度 汉字算两个字符
 */
const getStrLen = (val) => {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 1;
        }
        else {
            len += 2;
        }
    }
    return len;
}

module.exports = {
    formatTime,
    formatDate,
    parserDate,
    addDate,
    showBusy,
    showSuccess,
    showModel,
    hiddenLoading,
    showLoading,
    formatNumber,
    idCardValidate,
    phoneValidate, 
    chineseValidate,
    trim,
    getStrLen,
}