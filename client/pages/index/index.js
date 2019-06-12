'use strict';
//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');



Page({
    /**
     * 页面的初始数据
     */
    data: {
        host : config.service.host,
        spotLists: [], //服务集市列表
        scrolltop: null, //滚动位置
        page: 0 , //分页
        rows: 10,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 300,
        imgMode: 'scaleToFill',
        circular: true,
        imgUrls: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchAdviceData();
        this.fetchSpotListData();
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
        this.setData({
            page: 0,
            spotLists: []
        })
        this.fetchSpotListData();
        this.goAdviceLink();
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 1000)
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

    },
    goAdviceLink: function (e) {
        console.log(e.target.dataset);
        var imgUrl = e.target.dataset.imgUrl;
        if (imgUrl) {
            console.log(1);
        }
    },
    getSearchFocus: function () {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    scrollHandle: function (e) { //滚动事件
        this.setData({
            scrolltop: e.detail.scrollTop
        })
    },
    goToTop: function () { //回到顶部
        this.setData({
            scrolltop: 0
        })
    },
    scrollLoading: function () { //滚动加载
        this.fetchSpotListData();
    },
    /**
     * 查询首页广告
     */
    fetchAdviceData: function(){
        var that = this;
        qcloud.request({
            url: config.service.common.advUrl,
            login: false,
            method: 'get',
            success(result) {
                var data = result.data;
                if (data.retCode == '200') {
                    that.setData({
                        imgUrls: data.retValue
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
    fetchSpotListData: function(){
        var that = this;
        util.showLoading('加载中');
        this.setData({
            page: this.data.page + 1
        })
        let pageVar = this.data.page;
        let newlist = [];

        qcloud.request({
            url: config.service.spot.spotListUrl,
            login: false,
            method: 'get',
            data:{
                page: pageVar,
                rows: that.data.rows
            },
            success(result) {
                var data = result.data;
                if (data.retCode == '200') {
                    newlist = data.retValue;
                    that.setData({
                        spotLists: that.data.spotLists.concat(newlist)
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
    }
})