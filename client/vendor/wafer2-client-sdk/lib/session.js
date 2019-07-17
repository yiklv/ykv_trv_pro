var constants = require('./constants');
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;

var Session = {
    get: function () {
        return wx.getStorageSync(SESSION_KEY) || null;
    },

    set: function (session) {
        wx.setStorageSync(SESSION_KEY, session);
    },

    clear: function () {
        wx.removeStorageSync(SESSION_KEY);
    },
    /**设置session的有效时间 */
    setSessionExpiration: function(expireTime){
        wx.setStorageSync(constants.WX_SESSION_TIME_EXPIRATION, expireTime);
    },
    /**获取session的有效时间 */
    getSessionExpiration: function () {
        return wx.getStorageSync(constants.WX_SESSION_TIME_EXPIRATION);
    },
};

module.exports = Session;