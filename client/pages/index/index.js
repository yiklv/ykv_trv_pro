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
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 300,
        imgMode:'scaleToFill',
        circular: true,
        imgUrls: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        qcloud.request({
            url: config.service.common.advUrl,
            login: false,
            method: 'get',
            success(result) {
                var data = result.data;
                if(data.retCode == '200'){
                    that.setData({
                        imgUrls: data.retValue
                    });
                }else{
                    util.showModel('异常', data.msg);
                }
            },

            fail(error) {
                util.showModel('请求失败', error);
            }
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

    },
    goAdviceLink: function(e){
        console.log(e.target.dataset);
        var imgUrl = e.target.dataset.imgUrl;
        if(imgUrl){
            console.log(1);
        }
    },
    getSearchFocus: function(){
        wx.navigateTo({
            url: '/pages/search/search'
        })
    }
})