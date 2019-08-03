'use strict';

var numbers = '0123456789';
var lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lettersLower = 'abcdefghijklmnopqrstuvwxyz';
var specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
const random = (length, options) => {
    length || (length = 8);
    options || (options = {});

    var chars = '';
    var result = '';

    if (options === true) {
        chars = numbers + letters + specials;
    } else if (typeof options == 'string') {
        chars = options;
    } else {
        if (options.numbers !== false) {
            chars += (typeof options.numbers == 'string') ? options.numbers : numbers;
        }
        // 大写
        if (options.lettersUpper !== false) {
            chars += (typeof options.lettersUpper == 'string') ? options.lettersUpper : lettersUpper;
        }
        // 小写
        if (options.lettersLower !== false) {
            chars += (typeof options.lettersLower == 'string') ? options.lettersLower : lettersLower;
        }

        if (options.specials) {
            chars += (typeof options.specials == 'string') ? options.specials : specials;
        }
    }

    while (length > 0) {
        length--;
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}


const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 *  时间格式化   yyyymmddhhmiss
 *  @author yiklv_yanguo
 *  @date    2019-07-22T00:49:07+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @return  {[type]}                      [description]
 */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('') + '' + [hour, minute, second].map(formatNumber).join('')
}


module.exports = {
    random: random,
    formatTime:formatTime,
};