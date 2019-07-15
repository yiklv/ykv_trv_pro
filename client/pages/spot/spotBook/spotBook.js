// pages/spot/spotBook/spotBook.js
'use strict';
//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js');
//在使用的View中引入WxParse模块
var WxParse = require('../../../vendor/wxParse-richText/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currencyFlag: config.currency,
        tktInfo: null,
        isRuleTrue: false,
        restnumber: 20,
        clickId: 0,
        trvDate: [],
        defalutDate: {},
        checkable: true,
        sumMoney: 0,  // 总金额
        bookNumber: 1, // 初始购买数量
        choPrice: null, // 最终票金额
        choDate: null, // 最终选择日期
        showBookDetail: false,
        animationData:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _that = this;
        _that.setData({
            tktInfo: JSON.parse(options.tktInfo),

        });
        // this.fetchData();
        let _price = _that.data.tktInfo.tktPrice * 1;
        let _sumMoney = _price * _that.data.bookNumber;
        _that.setTravelDate(options);
        _that.setData({
            defalutDate: {
                trv_date: '更多日期 >',
                price: _that.data.tktInfo.tktPrice + '起',
                isChoseable: true
            },
            choPrice: _price,
            sumMoney: _sumMoney
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
    /**
     * 获取订票须知
     */
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
    hideRule: function() {
        this.setData({
            isRuleTrue: false
        });
    },
    // 选择类型
    clickkind: function(e) {
        var choseId = e.currentTarget.id;
        let datePrice  =  e.currentTarget.dataset.datePrice;
        let _date = this.data.trvDate;
        this.setData({
            clickId: choseId,
            choPrice: datePrice,
            sumMoney: this.data.bookNumber * datePrice,
            choDate: _date[choseId].trv_date
        });
    },
    clickChoseDate: function(e) {
        let choseParam = {
            id: e.currentTarget.id,
            price: e.currentTarget.dataset.price,
            tktInfo: this.data.tktInfo,
            bookNumber: this.data.bookNumber
        };

        wx.navigateTo({
            url: '/pages/spot/calender/calender?choseParam=' + JSON.stringify(choseParam),
        });
    },
    // 数量增加
    addNumber: function() {
        var num = this.data.bookNumber;
        let lPrice = this.data.choPrice;
        if (num < this.data.restnumber) {
            num++;
            this.setData({
                bookNumber: num,
                sumMoney: num * lPrice
            });
        } 
    },
    // 数量减少
    reduceNumber: function() {
        let lPrice = this.data.choPrice;
        var num = this.data.bookNumber;
        if (num > 1) {
            num--;
            this.setData({
                bookNumber: num,
                sumMoney: num * lPrice
            });
        }
    },
    // 设置游玩时间
    setTravelDate: function(options) {
        var _this = this;
        _this.fetchSpcDateThrdDay(_this.data.tktInfo, 3);
    },
    fetchSpcDateThrdDay: function(tktInfo, qryCount) {
        var _this = this;
        qcloud.request({
            url: config.service.spot.spotTktDatePriceUrl,
            login: false,
            method: 'get',
            data: {
                tktId: tktInfo.tktId,
                qryCount: qryCount
            },
            success(result) {
                let data = result.data;
                if (data.retCode == '200') {
                    // 该门票对应的特殊票价
                    let content = data.retValue;
                    var tktBookTime = _this.data.tktInfo.tktBookTime;
                    var tktBookDate = null;
                    var currDate = new Date();
                    if (!tktBookTime && tktBookTime > 0) {
                        tktBookDate = util.formatDate(util.addDate(currDate, tktBookTime)) + '23:00:00';
                    } else {
                        tktBookDate = util.formatDate(currDate) + '23:00:00';
                    }
                    var _trvDate = [{
                            trv_date: util.formatDate(new Date()),
                            price: _this.data.tktInfo.tktPrice,
                            isChoseable: new Date() > util.parserDate(tktBookDate)
                        },
                        {
                            trv_date: util.formatDate(util.addDate(new Date(), 1)),
                            price: _this.data.tktInfo.tktPrice,
                            isChoseable: util.addDate(new Date(), 1) > util.parserDate(tktBookDate)
                        },
                        {
                            trv_date: util.formatDate(util.addDate(new Date(), 2)),
                            price: _this.data.tktInfo.tktPrice,
                            isChoseable: util.addDate(new Date(), 2) > util.parserDate(tktBookDate)
                        },
                    ];
                    for (let i = 0; i < content.length; i++) {
                        
                        // 当天
                        if (util.formatDate(new Date(), '') == (content[i].spcDate + content[i].spcDay)) {
                            _trvDate.splice(0, 1, {
                                trv_date: util.formatDate(new Date()),
                                price: content[i].spcPrice,
                                isChoseable: new Date() > util.parserDate(tktBookDate)
                            })
                        }
                        // 明天
                        if (util.formatDate(util.addDate(new Date(), 1), '') == (content[i].spcDate + content[i].spcDay)) {
                            _trvDate.splice(1, 1, {
                                trv_date: util.formatDate(util.addDate(new Date(), 1)),
                                price: content[i].spcPrice,
                                isChoseable: util.addDate(new Date(), 1) > util.parserDate(tktBookDate)
                            })
                        }
                        // 后天
                        if (util.formatDate(util.addDate(new Date(), 2), '') == (content[i].spcDate + content[i].spcDay)) {
                            _trvDate.splice(2, 1, {
                                trv_date: util.formatDate(util.addDate(new Date(), 1)),
                                price: content[i].spcPrice,
                                isChoseable: util.addDate(new Date(), 1) > util.parserDate(tktBookDate)
                            })
                        }
                    }
                    _this.setData({
                        trvDate: _trvDate,
                        choDate: _trvDate[0].trv_date
                    });
                } else {
                    util.showModel('异常', data.msg);
                }

            },
            fail(error) {
                util.showModel('请求失败', error);
            }
        })
    },
    /**
     * 展示订单详细
     */
    bindBookDetailFn: function(){
        let showBookDetail = this.data.showBookDetail;
        if (showBookDetail){
            this.hideBookDetailFn();
        }else{
            this.showBookDetailFn();
        }
    },
    /**
     * 显示遮罩层
     */
    showBookDetailFn: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showBookDetail: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    /** 
     * 隐藏遮罩层
     */
    hideBookDetailFn: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showBookDetail: false
            })
        }.bind(this), 200)
    },
    /**
     * 检查是否勾选条款
     */
    checkboxChange:function(){
        let _checkable =  this.data.checkable;
        this.setData({
            checkable: !_checkable
        })
    },
    showTeamService: function () {
        wx.navigateTo({
            url: '/pages/spot/teamservice/teamservice',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    /**
     * 提交订单
     */
    submitOrder:function(e){
        let _that = this;
        let getTkt = e.detail.value;
        /**取票人信息 */
        let tktUserName = util.trim(getTkt.tktUserName);
        let tktIdNo = util.trim(getTkt.tktIdNo);
        let tktMobilephone = util.trim(getTkt.tktMobilephone);
        if (!tktUserName || '' == tktUserName || (tktUserName).length > 10){
            util.showModel('取票人信息错误','取票人姓名不能为空或者长度不得超过10个汉字');
            return false;
        }
        if (!tktIdNo || '' == tktIdNo || (tktIdNo).length != 18) {
            util.showModel('取票人信息错误', '取票人身份证不能为空或者长度必须为18');
            return false;
        }
        if (!tktMobilephone || '' == tktMobilephone || (tktMobilephone).length != 11) {
            util.showModel('取票人信息错误', '取票人手机号不能为空或者长度必须为11');
            return false;
        }
        if (!util.chineseValidate(tktUserName)) {
            util.showModel('取票人信息错误', '取票人姓名必须是中文');
            return false;
        }
        if (!util.idCardValidate(tktIdNo)) {
            util.showModel('取票人信息错误', '取票人身份证不正确');
            return false;
        }
        if (!util.phoneValidate(tktMobilephone)) {
            util.showModel('取票人信息错误', '取票人手机号不正确');
            return false;
        }

        console.log(_that);
        let checkable = _that.data.checkable;
        if (!checkable){
            util.showModel('错误', '必须勾选网站预购条款');
            return false;
        }

        


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