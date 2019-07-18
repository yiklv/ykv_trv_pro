'use strict';
var Session = require('./session');

/**
 * 拓展对象
 */
function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < sources.length; i += 1) {
        var source = sources[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

/**
 * 加入登录session的判断
 */
const checkLoginStatus = () =>{
    let session = Session.get();
    let getExpireTimeSession = Session.getSessionExpiration();
    let _timestemp = Date.parse(new Date());
    if (session && getExpireTimeSession > _timestemp) {
        return true;
    }else{
        return false;
    }
}

module.exports = {
    checkLoginStatus,
    extend,
}