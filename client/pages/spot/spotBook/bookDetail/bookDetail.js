'use strict';

var qcloud = require('../../../../vendor/wafer2-client-sdk/index')
var config = require('../../../../config')
var util = require('../../../../utils/util');
var sessionUtils = require('../../../../utils/sessionUtils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:null,
    tktOrderInfo: null,
    kefuPhone: config.kefuPhone,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let orderId = options.orderId;
    that.setData({
      orderId: orderId,
    });
    that.queryBaseInfo(orderId);
  },
  /**
   * 查询订单的信息
   */
  queryBaseInfo:function(orderId){
    var that = this;

    qcloud.request({
      url: config.service.wxpay.queryOrderInfoById,
      login: true,
      method: 'get',
      data: {
        orderId: orderId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          var tktOrderInfo = data.retValue[0];
          console.log(tktOrderInfo);
          that.setData({
            tktOrderInfo: tktOrderInfo 
          });

        } else {
          util.showModel('异常', data.msg);
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    });
  },
  reOrderticket: function(event){
    var _that = this;
    let wxStorageSession = qcloud.getSession();
    if (!sessionUtils.checkSessionExpire(qcloud)) {
      wx.switchTab({
        url: '/pages/my/my'
      })
    } else {
      var spot_id = event.currentTarget.dataset.spotId;
      wx.navigateTo({
        url: '/pages/spot/spotdetail/spotdetail?spotId=' + spot_id
      })
    }
  },
  repayOrder: function(){
    var _that = this;
    let wxStorageSession = qcloud.getSession();
    if (!sessionUtils.checkSessionExpire(qcloud)) {
      wx.switchTab({
        url: '/pages/my/my'
      })
    } else {
      var orderId = event.currentTarget.dataset.orderId;
      qcloud.request({
        url: config.service.wxpay.queryOrderInfoById,
        login: true,
        method: 'get',
        data: {
          orderId: orderId
        },
        success(result) {
          let data = result.data;
          if (data.retCode == '200') {
            console.log(data);
            let payData = data.retValue;
            wx.requestPayment({
              timeStamp: payData.timeStamp,
              nonceStr: payData.nonceStr,
              package: payData.package,
              signType: payData.signType,
              paySign: payData.paySign,
              success: function (res) {
                console.log('支付成功');
              },
              fail: function (res) {
                console.log('支付失败');
                return;
              },
              complete: function (res) {
                console.log('支付完成');
                var url = that.data.url;
                console.log('get url', url)
                if (res.errMsg == 'requestPayment:ok') {
                  util.showSuccess('支付成功');
                  // if (url) {
                  //   setTimeout(function() {
                  //     wx.redirectTo({
                  //       url: '/pages' + url
                  //     });
                  //   }, 2000);
                  // } else {
                  //   setTimeout(() => {
                  //     wx.navigateBack()
                  //   }, 2000)
                  // }
                } else if (res.errMsg == 'requestPayment:fail cancel') {
                  util.showSuccess('支付取消');
                }
                /**查询微信平台的订单支付情况 */
                queryOrderPayInfo(payData.order_id);
                wx.navigateTo({
                  url: '/pages/spot/spotBook/bookDetail/bookDetail?orderId' + payData.order_id,
                })
              }
            });

          } else {
            util.showModel('异常', data.msg);
          }

        },
        fail(error) {
          util.showModel('请求失败', error);
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})