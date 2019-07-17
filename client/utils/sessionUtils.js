'use strict';
/**
 * 判断Session是否登录或者超时
 * @param qcloud 应用对象
 * @result false 失效 true 有效
 */
const checkSessionExpire = (qcloud) => {
    let sessionRes = false;
    let storageSession = qcloud.getSession();
    let getExpireTimeSession = qcloud.getSessionExpiration();
    let _timestemp = Date.parse(new Date());
    if (storageSession && getExpireTimeSession > _timestemp) {
        sessionRes = true;
    }
    return sessionRes;
}


module.exports = {
    checkSessionExpire,
}