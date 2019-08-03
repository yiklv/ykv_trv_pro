// pages/spot/spotdetail/spotdetail.js
'use strict';
//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util');
var sessionUtils = require('../../../utils/sessionUtils');
//在使用的View中引入WxParse模块
var WxParse = require('../../../vendor/wxParse-richText/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spacedata: {},
    showView: true,
    choseId: null,
    spaceimgs: [],
    currentIndex: 1,
    host: config.service.host,
    spotData: {}, // 景点详情
    spotImgs: [], // 景点图片
    spotTicket: [],
    tktNoteDesc: {}, //门票须知
    isRuleTrue: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var spotId = options.spotId;
    that.fetchSpotDetail(spotId);
    that.fetchSpotImages(spotId);
    that.fetchSpotTicketList(spotId);
    that.fetchSpotNoticeContent(spotId);
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

  },

  setCurrent: function(e) { //当前图片索引
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  imgPreview: function() { //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex - 1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  getAddress: function(e) {
    const d = e.currentTarget.dataset;
    const address = d.address;
    const latitude = d.latitude;
    const longitude = d.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      // name: address,
      address: address,
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      success: function(res) {
        console.log(res);
      }
    })
  },
  reserveHandle: function() {
    wx.navigateTo({
      url: '../spacereserve/spacereserve'
    })
  },
  goApply: function() {
    wx.navigateTo({
      url: '../apply/apply'
    })
  },
  /**
   * 查询景点详情
   */
  fetchSpotDetail: function(spotId) {
    var that = this;
    util.showLoading('加载中');
    qcloud.request({
      url: config.service.spot.spotInfoUrl,
      login: false,
      method: 'get',
      data: {
        spotId: spotId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          that.setData({
            spotData: data.retValue[0]
          });

        } else {
          util.showModel('异常', data.msg);
        }
        util.hiddenLoading();
      },
      fail(error) {
        util.hiddenLoading();
        util.showModel('请求失败', error);
      }
    });
  },
  /**
   * 查询景点图片
   */
  fetchSpotImages: function(spotId) {
    var that = this;
    util.showLoading('加载中');
    qcloud.request({
      url: config.service.spot.spotImgsUrl,
      login: false,
      method: 'get',
      data: {
        spotId: spotId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          that.setData({
            spotImgs: data.retValue
          });

        } else {
          util.showModel('异常', data.msg);
        }
        util.hiddenLoading();
      },
      fail(error) {
        util.hiddenLoading();
        util.showModel('请求失败', error);
      }
    });
  },
  /**
   * 查询所有门票
   */
  fetchSpotTicketList: function(spotId) {
    var that = this;

    qcloud.request({
      url: config.service.spot.spotTicketsUrl,
      login: false,
      method: 'get',
      data: {
        spotId: spotId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          console.log(data.retValue);
          that.setData({
            spotTicket: data.retValue,
            choseId: data.retValue[0].typeId,
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
  /**
   * 展示门票
   */
  showTicketDetail: function(event) {
    var that = this;
    var _showView = !that.data.showView;
    var _typeId = event.currentTarget.dataset.typeId;
    if (that.data.choseId != _typeId) {
      _showView = true;
    }
    that.setData({
      choseId: _typeId,
      showView: _showView
    });
  },
  /**
   * 获取景区须知
   */
  fetchSpotNoticeContent: function(spotId) {
    var that = this;

    qcloud.request({
      url: config.service.spot.spotContentUrl,
      login: false,
      method: 'get',
      data: {
        spotId: spotId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          var content = data.retValue[0].spotNoteDesc;
          /**
           * WxParse.wxParse(bindName , type, data, target,imagePadding)
           * 1.bindName绑定的数据名(必填)
           * 2.type可以为html或者md(必填)
           * 3.data为传入的具体数据(必填)
           * 4.target为Page对象,一般为this(必填)
           * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
           */
          WxParse.wxParse('noticContent', 'html', content, that, 5);

        } else {
          util.showModel('异常', data.msg);
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    });
  },
  /**
   * 门票预订
   */
  bookTicket: function(event) {
    var _that = this;
    let wxStorageSession = qcloud.getSession();
    if (!sessionUtils.checkSessionExpire(qcloud)) {
      wx.switchTab({
        url: '/pages/my/my'
      })
    } else {
      var tktInfo = event.currentTarget.dataset.tktInfo;
      wx.navigateTo({
        url: '/pages/spot/spotBook/spotBook?tktInfo=' + JSON.stringify(tktInfo),
        success: function(res) {

        },
        fail: function(res) {

        },
        complete: function(res) {

        },
      })
    }

  },
  fetchTicketNoticeDesc: function(tktId) {
    var that = this;

    qcloud.request({
      url: config.service.spot.spotTktContUrl,
      login: false,
      method: 'get',
      data: {
        tktId: tktId
      },
      success(result) {
        var data = result.data;
        if (data.retCode == '200') {
          var content = data.retValue[0].tktNoteDesc;
          /**
           * WxParse.wxParse(bindName , type, data, target,imagePadding)
           * 1.bindName绑定的数据名(必填)
           * 2.type可以为html或者md(必填)
           * 3.data为传入的具体数据(必填)
           * 4.target为Page对象,一般为this(必填)
           * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
           */
          WxParse.wxParse('tktNoteDesc', 'html', content, that, 5);
          that.setData({
            tktNoteDesc: that.data.tktNoteDesc,
            isRuleTrue: true
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
  /**
   * 购票须知
   */
  noticeTicket: function(event) {
    var tktId = event.currentTarget.dataset.tktId;
    var _that = this;
    _that.fetchTicketNoticeDesc(tktId);

  },
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    });
  }
})