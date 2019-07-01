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
    formatNumber
}