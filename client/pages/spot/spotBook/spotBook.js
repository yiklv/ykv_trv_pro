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
        industryarr: [],
        industryindex: 0,
        statusarr: [],
        statusindex: 0,
        jobarr: [],
        jobindex: 0,
        hasfinancing: false,  //是否已融资
        isorg: false,  //是否是机构
        tktInfo: null,
        isRuleTrue: false,
        goodskinds: [],
        restnumber: 5,
        clickId: 0,
        bookNumber: 1, // 初始购买数量
        trvDate:[],
        defalutDate:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            tktInfo: JSON.parse(options.tktInfo),
            
        });
        // this.fetchData();
        this.setTravelDate(options);
        this.setData({
            defalutDate: {
                trv_date: '更多日期 >',
                price: this.data.tktInfo.tktPrice + '起',
                isChoseable: true
            }
        });
    },
    // fetchData: function () {
    //     this.setData({
    //         industryarr: ["请选择", "移动互联网", "手机游戏", "互联网金融", "O2O", "智能硬件", "SNS社交", "旅游", "影视剧", "生活服务", "电子商务", "教育培训", "运动和健康", "休闲娱乐", "现代农业", "文化创意", "节能环保", "新能源", "生物医药", "IT软件", "硬件", "其他"],
    //         statusarr: ["请选择", "初创时期", "市场扩展期", "已经盈利"],
    //         jobarr: ["请选择", "创始人", "联合创始人", "产品", "技术", "营销", "运营", "设计", "行政", "其他"]
    //     })
    // },
    bindPickerChange: function (e) { //下拉选择
        const eindex = e.detail.value;
        const name = e.currentTarget.dataset.pickername;
        // this.setData(Object.assign({},this.data,{name:eindex}))
        switch (name) {
            case 'industry':
                this.setData({
                    industryindex: eindex
                })
                break;
            case 'status':
                this.setData({
                    statusindex: eindex
                })
                break;
            case 'job':
                this.setData({
                    jobindex: eindex
                })
                break;
            default:
                return
        }
    },
    setFinance: function (e) { //选择融资
        this.setData({
            hasfinancing: e.detail.value == "已融资" ? true : false
        })
    },
    setIsorg: function (e) { //选择投资主体
        this.setData({
            isorg: e.detail.value == "机构" ? true : false
        })
    },
    applySubmit: function () {
        wx.navigateTo({
            url: '../service/service'
        })
    },

    /**
         * 购票须知
         */
    noticeTicket: function (event) {
        var tktId = event.currentTarget.dataset.tktId;
        var _that = this;
        console.log(tktId);
        _that.fetchTicketNoticeDesc(tktId);

    },
    /**
     * 获取订票须知
     */
    fetchTicketNoticeDesc: function (tktId) {
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
    hideRule: function () {
        this.setData({
            isRuleTrue: false
        });
    },
    // 选择类型
    clickkind: function (e) {
        var choseId = e.currentTarget.id;
        this.setData({
            clickId: choseId
        });
    },
    clickChoseDate: function(e){
        console.log(1);
        var choseParam = {
            id: e.currentTarget.id,
            price: e.currentTarget.dataset.price,
            tktInfo: this.data.tktInfo
        };
        wx.navigateTo({
            url: '/pages/spot/calender/calender?choseParam=' + JSON.stringify(choseParam),
        })
    },
    // 数量增加
    addNumber: function () {
        var num = this.data.bookNumber;
        if (num < this.data.restnumber) {
            num++;
            this.setData({
                bookNumber: num
            })
        } else {
            console.log('您的购买数量已达到上限')
        }
    },
    // 数量减少
    reduceNumber: function () {
        var num = this.data.bookNumber;
        if (num > 1) {
            num--;
            this.setData({
                bookNumber: num
            })
        }
    },
    // 设置游玩时间
    setTravelDate:function(options){
        var _this = this;
        var tktBookTime = _this.data.tktInfo.tktBookTime;
        var tktBookDate = null;
        var currDate = new Date();
        if (!tktBookTime && tktBookTime > 0){
            tktBookDate = util.formatDate(util.addDate(currDate, tktBookTime)) + '23:00:00';
        }else{
            tktBookDate = util.formatDate(currDate) + '23:00:00';
        }
        
        console.log('currDate',currDate);
        var _trvDate = [
            { trv_date: util.formatDate(currDate ), price: _this.data.tktInfo.tktPrice, isChoseable: currDate > util.parserDate(tktBookDate) },
            { trv_date: util.formatDate(util.addDate(currDate, 1)), price: _this.data.tktInfo.tktPrice, isChoseable: util.addDate(currDate, 1) > util.parserDate(tktBookDate)},
            { trv_date: util.formatDate(util.addDate(currDate, 1)), price: _this.data.tktInfo.tktPrice, isChoseable: util.addDate(currDate, 2) > util.parserDate(tktBookDate)},
        ];
        _this.setData({
            trvDate: _trvDate
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