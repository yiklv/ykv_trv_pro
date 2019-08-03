// pages/my/my.js
'use strict';
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util');
var sessionUtils = require('../../utils/sessionUtils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'), // 判断是否支持微信button登录
    logined: false,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (sessionUtils.checkSessionExpire(qcloud)) {
      qcloud.request({
        url: config.service.requestUrl,
        login: true,
        success(result) {
          util.showSuccess('登录成功');
          that.setData({
            userInfo: result.data.data,
            logined: true
          })
        },

        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        },

      });
    }
  },
  /**
   *  用户登录示例
   */
  login: function(e) {
    if (this.data.logined) return

    util.showBusy('正在登录');
    var that = this;

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功');
          that.setData({
            userInfo: result,
            logined: true
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})