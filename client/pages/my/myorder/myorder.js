// pages/my/myorder/myorder.js
'use strict';
var qcloud = require('../../../vendor/wafer2-client-sdk/index');
var config = require('../../../config');
var util = require('../../../utils/util');
var sessionUtils = require('../../../utils/sessionUtils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.service.host,
    navTabs: ["全部", "待付款", "已退款", "已完成","已取消"],
    // 初始化将activeIndex置为空
    activeIndex: "",
    // 初始化将payOrder置为空数组
    payOrder: [],
    // 初始化将backOrder置为空数组
    backOrder: [],
    // 初始化将allOrder置为空数组
    allOrder: [],
    // 初始化将finishOrder置为空数组
    finishOrder: [],
    // 初始化将quitOrder置为空数组
    quitOrder: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.setData({
      // 此处获取的activeIndex为user_info页面navigator传过来的参数
      activeIndex: options.activeIndex
    });
    that.queryMyOrderList();
  },
  /**
     * nav item的tap事件
     */
  tapNavItem: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * tap当前订单去当前订单详情页
   */
  showOrderDetail: function (e) {
    // 获取当前订单的ID作为值传入url中
    // const order_id = e.currentTarget.id;
    // PageContent.loadNavigate(`../order_detail/order_detail?order_id=${order_id}`)
  },
  /**
   * 查询所有订单详情
   */
  queryMyOrderList: function(){
    let that = this;
    let userSession = qcloud.getSession();
    let openId = userSession.userinfo.openId;
    qcloud.request({
      url: config.service.order.queryMyOrderList,
      login: true,
      data: { openId: openId },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          console.log(data.retValue);
          if (data.retValue.length > 0){
            that.setData({
              // 初始化将payOrder置为空数组
              payOrder: data.retValue[1].payOrder,
              // 初始化将backOrder置为空数组
              backOrder: data.retValue[4].backOrder,
              // 初始化将allOrder置为空数组
              allOrder: data.retValue[0].allOrder,
              // 初始化将finishOrder置为空数组
              finishOrder: data.retValue[2].finishOrder,
              // 初始化将quitOrder置为空数组
              quitOrder: data.retValue[3].quitOrder,
            });
          }
          // that.setData({
          //   myOrderNumList: data.retValue[0],
          // });
        } else {
          util.showModel('异常', data.msg);
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      },

    });
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