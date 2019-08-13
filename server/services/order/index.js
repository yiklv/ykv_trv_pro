'use strict';

const pool = require('../../db/mysql');
const { random } = require('../../utils/stringutils');
const serviceResponse = require('../response/response');
const { query, insert } = pool;

const ORDER_STATUS_CONST = {
    ORDER_STAUTS_WAIT: '1',
    ORDER_STAUTS_FINISH: '2',
    ORDER_STAUTS_QUIT: '3',
    ORDER_STAUTS_OUTTIME: '4',
    ORDER_STATUS_BACK: '5',
}

// 新添管理员
const add = (val) => {
    console.log(val);
    let insertParam = val;
    insertParam['id_key'] = random(32);
    return null;
}


// 更改管理员
const update = (val) => {

    return null;
}

// 查询管理员
const list = (val) => {
    /** @type {Number} 所有订单个数*/
    let all_num = 0;
    return null;
}

// 删除管理员
const del = val => {

    return null;
}

/**
 *  查询订单状态对应的个数
 *  @author yiklv_yanguo
 *  @date    2019-08-12T23:28:09+0800
 *  @version 1.0.0
 *  @param   {Object}                 val 参数
 *  @return  {Object}                     数据个数集合
 */
const queryMyOrderNumList = async (val) => { /** @type {Number} 所有订单个数*/
    let order_all_num = 0;
    /** @type {Number} 待支付订单个数*/
    let order_wait_num = 0;
    /** @type {Number} 退款中订单个数*/
    let order_back_num = 0;
    /** @type {Number} 完成订单个数*/
    let order_finish_num = 0;
    /** @type {Number} 已取消订单个数*/
    let order_quit_num = 0;
    /** @type {Number} 已失效订单个数*/
    let order_outtime_num = 0;

    let openId = val.openId;

    // 查询所有订单个数
    let query_myorder_cnt = ' select count(1) orderNum from trv_spot_order tt where tt.open_id = ? ';
    let param = [openId];
    await query(query_myorder_cnt, param).then(result => {
        order_all_num = result[0].orderNum;
    });
    // where 条件
    let query_myorder_cnt_status = 'select order_status,count(1) ordStatus from trv_spot_order t where t.open_id = ? group by t.order_status';
    // 查询待支付的个数
    await query(query_myorder_cnt_status, param).then(result => {
        for (var i = 0; i < result.length; i++) {
            let order_state = result[i].order_status;
            if (ORDER_STATUS_CONST.ORDER_STAUTS_WAIT == order_state) {
                order_wait_num = result[i].ordStatus;
            } else if (ORDER_STATUS_CONST.ORDER_STAUTS_FINISH == order_state) {
                order_finish_num = result[i].ordStatus;
            } else if (ORDER_STATUS_CONST.ORDER_STAUTS_QUIT == order_state) {
                order_quit_num = result[i].ordStatus;
            } else if (ORDER_STATUS_CONST.ORDER_STATUS_BACK == order_state) {
                order_back_num = result[i].ordStatus;
            } else {
                order_outtime_num = result[i].ordStatus;
            }
        }
    });

    let resultList = [];

    let returnObj = {
        order_all_num: order_all_num,
        order_wait_num: order_wait_num,
        order_back_num: order_back_num,
        order_finish_num: order_finish_num,
        order_quit_num: order_quit_num,
        order_outtime_num: order_outtime_num,
    };
    resultList.push(returnObj);
    return serviceResponse.setResponse(resultList);
}

/**
 *  查询订单列表
 *  @author yiklv_yanguo
 *  @date    2019-08-12T23:44:39+0800
 *  @version 1.0.0
 *  @param   {Object}                 val 参数
 *  @return  {Object}                     List
 */
const queryMyOrderList = async (val) => {
    let openId = val.openId;

    let orderList = [];
    // 全部订单
    await queryMyOrderListByStatus(openId, null).then(result => {
        orderList.push({
            allOrder: result
        });
    });
    // 待支付订单
    await queryMyOrderListByStatus(openId, '1').then(result => {
        orderList.push({
            payOrder: result
        });
    });
    // 已支付订单
    await queryMyOrderListByStatus(openId, '2').then(result => {
        orderList.push({
            finishOrder: result
        });
    });

    let quitOrderTmp = [];
    // 已取消订单
    await queryMyOrderListByStatus(openId, '3').then(result => {
        quitOrderTmp = quitOrderTmp.concat(result);
    });
    // 已失效订单
    await queryMyOrderListByStatus(openId, '4').then(result => {
        quitOrderTmp = quitOrderTmp.concat(result);
    });
    orderList.push({
        quitOrder: quitOrderTmp
    });
    // 退款订单
    await queryMyOrderListByStatus(openId, '5').then(result => {
        orderList.push({
            backOrder: result
        });
    });
    return serviceResponse.setResponse(orderList);
}


const queryMyOrderListByStatus = (openId, orderStatus) => {
    let _openId = openId;
    let _orderStatus = orderStatus || null;
    // 查询所有订单
    let query_myorder_list = ' select order_id,order_status,sum_price, order_info,tkt_num,(select image_url from trv_spot_info sp, trv_tkt_info tkt where sp.spot_id = tkt.spot_id and tkt.tkt_id = tt.tkt_id) as img_url from trv_spot_order tt where tt.open_id =? ';

    if (orderStatus && orderStatus != null) {
        query_myorder_list = query_myorder_list + ' and tt.order_status = ? ';
    }

    let param = [_openId, _orderStatus];
    return query(query_myorder_list, param);
}



module.exports = {
    queryMyOrderNumList,
    queryMyOrderList,
}