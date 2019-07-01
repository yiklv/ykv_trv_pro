// pages/spot/calender/calender.js
'use strict';
//index.js

import initCalendar, {
    jump, // 跳转至指定日期
    getSelectedDay, // 获取当前选择的日期  getSelectedDay()
    setTodoLabels, // 设置待办标记
    deleteTodoLabels, //删除代办标记 deleteTodoLabels([{ year: 2018, month: 5, day: 12 }, { year: 2018, month: 5, day: 15}]);
    clearTodoLabels, //清空代办标记 clearTodoLabels();
    getTodoLabels, // 获取所有代办日期 getTodoLabels();
    disableDay, // 禁选指定日期 e.g. disableDay([{ year: 2018, month: 7, day: 31}]); 
    enableArea,
    enableDays, // 指定可选日期
    /** 指定可选时间区域 enableArea(['2018-11-12', '2018-11-30']);
     *  指定特定可选日期 enableDays(['2018-11-12', '2018-12-3', '2019-1-3']);
     */
} from '../../../component/calendar/main.js';

var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        tktInfo: null,
        id: null,
        price: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let param = JSON.parse(options.choseParam);
        this.setData({
            tktInfo: param.tktInfo,
            price: param.price,
            id: param.id,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let that = this;
        const conf = {
            multi: false, // 是否开启多选,
            disablePastDay: true, // 是否禁选过去的日期
            inverse: true, // 单选模式下是否支持取消选中
            /**
             * 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
             * 注意：若想初始化时不默认选中当天，则将该值配置为除 undefined 以外的其他非值即可，如：空字符串, 0 ,false等。
             */
            //defaultDay: '2018-3-6', // 初始化后是否默认选中指定日期
            noDefault: true, // 初始化后是否自动选中当天日期，优先级高于defaultDay配置，两者请勿一起配置
            /**
             * 选择日期后执行的事件
             * @param { object } currentSelect 当前点击的日期
             * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
             */
            afterTapDay: (currentSelect, allSelectedDays) => {
                console.log('afterTapDay', currentSelect);
                console.log('afterTapDay', allSelectedDays);

            },
            /**
             * 当改变月份时触发
             * @param { object } current 当前年月
             * @param { object } next 切换后的年月
             */
            whenChangeMonth: (current, next) => {
                let param = JSON.parse(that.options.choseParam);
                //当前年月
                let curYear = next.year;
                let curMonth = next.month;
                that.fetchTicketPriceDate(param.tktInfo, curYear, curMonth);
            },
            /**
             * 日期点击事件（此事件会完全接管点击事件）
             * @param { object } currentSelect 当前点击的日期
             * @param { object } event 日期点击事件对象
             */
            onTapDay(currentSelect, event) {
                // console.log('onTapDay', currentSelect);
                // console.log('onTapDay', event);
                // let param = JSON.parse(that.options.choseParam);
                // let choseDate = {
                //     choseDate: '' + currentSelect.year + '-' + util.formatNumber(currentSelect.month) + '-' + util.formatNumber(currentSelect.day),
                //     chosePrice: currentSelect.todoText,
                //     id: param.id,
                // }
                let param = JSON.parse(that.options.choseParam);
                let pages = getCurrentPages();
                let currPage = pages[pages.length - 1];   //当前页面
                let prevPage = pages[pages.length - 2];  //上一个页面
                let cPrice = currentSelect.todoText.replace(config.currency, '');
                prevPage.setData({
                    defalutDate: {
                        trv_date: '' + currentSelect.year + '-' + util.formatNumber(currentSelect.month) + '-' + util.formatNumber(currentSelect.day),
                        price: cPrice,
                        isChoseable: true
                    },
                    clickId: param.id,
                    choPrice: cPrice * 1,
                    sumMoney: cPrice * 1 * param.bookNumber
                })
                wx.navigateBack({
                    url: that.route
                })

            },
            /**
             * 日历初次渲染完成后触发事件，如设置事件标记
             * @param { object } ctx 当前页面实例
             */
            afterCalendarRender(ctx) {
                let param = JSON.parse(ctx.options.choseParam);
                //当前年月
                let currDate = new Date();
                let curYear = currDate.getFullYear();
                let curMonth = currDate.getMonth() + 1;
                ctx.fetchTicketPriceDate(param.tktInfo, curYear, curMonth);

            },
        }
        initCalendar(conf); // 使用默认配置初始化日历
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // let currDate = new Date();
        // let year = currDate.getFullYear()
        // let month = currDate.getMonth() + 1
        // let day = currDate.getDate()
        // jump(year, month, day);
    },

    /**
     * 获取对应月份的价格
     * @param { object } tktInfo 票务信息
     * @param { object } year 年
     * @param { object } month 月
     */
    fetchTicketPriceDate: function(tktInfo, year, month) {
        let that = this;

        qcloud.request({
            url: config.service.spot.spotTktDatePriceUrl,
            login: false,
            method: 'get',
            data: {
                tktId: tktInfo.tktId,
                qryDate: year + util.formatNumber(month)
            },
            success(result) {
                let data = result.data;
                if (data.retCode == '200') {
                    // 该门票对应的特殊票价
                    let content = data.retValue;

                    // 获取当前月有多少天
                    let curDays = new Date(year, month, 0).getDate();
                    // 设置日历的价格的数组
                    let todoDays = [];
                    // 循环添加每一天的价格
                    a: for (let i = 1; i <= curDays; i++) {
                        // 日期的拼接字段
                        let tmpDate = '' + year + util.formatNumber(month) + util.formatNumber(i);
                        console.log(tmpDate);
                        // 日期对应价格
                        let todText = config.currency + tktInfo.tktPrice;
                        // 循环判断日期和数据库中配置的日期匹配
                        b: for (let j = 0; j < content.length; j++) {
                            // 数据库中配置的日期
                            let specDate = content[j].spcDate + content[j].spcDay;
                            if (tmpDate == specDate) {
                                todText = config.currency + content[j].spcPrice;
                                break b;
                            } else {
                                continue;
                            }
                        }
                        todoDays.push({
                            year: year,
                            month: month,
                            day: i,
                            todoText: todText
                        });
                    }
                    // 添加日历的价格
                    setTodoLabels({
                        // 待办点标记设置
                        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
                        dotColor: '#40', // 待办点标记颜色
                        // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
                        circle: false, // 待办
                        days: todoDays,
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