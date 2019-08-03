// var wxbarcode = require("../../vendor/wxPay-sdk/index"),
//     app = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        // wx.setStorageSync("id", e.id), app.util.request({
        //     url: "entry/wxapp/Url",
        //     cachetime: "0",
        //     success: function (e) {
        //         t.setData({
        //             url: e.data
        //         });
        //     }
        // });
        // t.setData({
        //     details: {
        //         state: 2,
        //         is_serve:0,
        //         order_num: 1,
        //         pay_time:'20190701',
        //         id:'1231231',
        //         gocar:'周大福十大发射点发',
        //         user_name:'afsdfa',
        //         good_img:"11231",
        //         good_name: "shagnping123",
        //         pre_type: "afdad",
        //         good_num: 12,
        //         money: 123.01
        //     },
        //     url:''
        // });
        // var a = '{ "id": ' + 'SPOOT12312312312' + ', "ordertype": 1}';
        // wxbarcode.qrcode("qrcode", a, 280, 280);
    },
    onReady: function() {},
    onShow: function() {
        var t = this,
            e = wx.getStorageSync("id");
        // app.util.request({
        //     url: "entry/wxapp/OrderDetails",
        //     cachetime: "0",
        //     data: {
        //         id: e
        //     },
        //     success: function (e) {
        //         console.log(e.data), t.setData({
        //             details: e.data
        //         });
        //     }
        // });
    },
    // topay: function(e) {
    //     var t = e.currentTarget.dataset.id;
    //     wx.navigateTo({
    //         url: "/fyly_sun/pages/product/bookNow/oldorderpay?id=" + t
    //     });
    // },
    // deleteProduct: function(e) {
    //     var t = this,
    //         a = e.currentTarget.dataset.id,
    //         o = wx.getStorageSync("users").id;
    //     // app.util.request({
    //     //     url: "entry/wxapp/deleteOrder",
    //     //     cachetime: "0",
    //     //     data: {
    //     //         user_id: o,
    //     //         order_id: a
    //     //     },
    //     //     success: function (e) {
    //     //         "success" == e.data.code ? (wx.showToast({
    //     //             title: "订单删除成功",
    //     //             icon: "none"
    //     //         }), t.onLoad()) : wx.showToast({
    //     //             title: "删除失败",
    //     //             icon: "none"
    //     //         });
    //     //     }
    //     // });
    // },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});