'use strict';

var wxpayConst = {
	/**
	 *  常量
	 */
	/** 支付成功 */
	TRADE_STATUS_SUCCESS:'SUCCESS',
	/** 未支付 */
	TRADE_STATUS_NOTPAY:'NOTPAY',
	/** 转入退款 */
	TRADE_STATUS_REFUND:'REFUND',
	/** 已关闭 */
	TRADE_STATUS_CLOSED:'CLOSED',
	/**已撤销（刷卡支付） */
	TRADE_STATUS_REVOKED: 'REVOKED',
	/**--用户支付中 */
	TRADE_STATUS_USERPAYING:'USERPAYING', 
	/**--支付失败(其他原因，如银行返回失败)*/
	TRADE_STATUS_PAYERROR:'PAYERROR',
	/**
	 *  url
	 */
	/** @type {String} 支付统一下单URL */
	unifiedorderUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder',

	/** @type {String} 微信查询订单URL */
	orderQueryUrl: 'https://api.mch.weixin.qq.com/pay/orderquery',

	/**
	 *  sql
	 */
	/** @type {String} 查询该用户所有未完成的订单个数 */
	query_order_unfinished_cnt : 'select count(1) cnt from trv_spot_order t where t.open_id = ? and t.order_status = ?',
	/** @type {String} 生成订单信息 */
	insert_order_unfinished: 'insert into trv_spot_order(id_key, order_id, order_info, open_id, tkt_id, trv_time, order_price, tkt_num, sum_price, time_start, time_expire, order_req_xml, order_status, order_unified_xml) values(rand_string(36), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
	/** @type {String} 合并取票人信息 */
	merge_book_info: 'insert into trv_spot_book_info(id_key,open_id,real_name, mobilePhone, id_no )values (rand_string(36),?,?,?,?) on duplicate key update real_name=?, mobilePhone=?,id_no = ?',
	/** 根据订单号 查询数据库中是否存在 */
	query_order_cnt_by_id_sql: 'select count(1) qryCnt from trv_spot_order t where t.order_id = ? and t.time_expire < FROM_UNIXTIME(UNIX_TIMESTAMP(),"%Y%m%d%H%i%s") and t.order_status = ?',
	/** @type {} 更新订单状态*/
	update_order_id_sql: 'update trv_spot_order t set t.order_status = ? ,order_end_time = ?, t.date_updated = CURRENT_TIMESTAMP() , t.updated_by = ? where t.order_id = ?',
	/** @type {} 根据订单查询订单信息*/
	query_detail_info_by_id: `select ord.order_info,ord.trv_time, ord.tkt_num, ord.order_status,spot.spot_address,spot.open_time_desc,tkt.tkt_name, spot.spot_name,bok.real_name, bok.id_no, spot.spot_id,
	                                CONCAT(substring(bok.mobilephone, 1, length(bok.mobilephone)- 4),'****') as mobile_phone,ord.order_id,FORMAT((ord.sum_price/100),2) as order_price, DATE_FORMAT(ord.date_created,'%Y-%m-%d') as order_time
	                           from trv_spot_order ord,trv_tkt_info tkt,trv_spot_info spot, trv_spot_book_info bok
	                          where tkt.tkt_id = ord.tkt_id and tkt.spot_id = spot.spot_id and bok.open_id = ord.open_id and ord.order_id = ?`,
	/** @type {} 查询用户的订单信息*/
	query_order_info_by_openid: 'select * from trv_spot_order t where t.open_id = ?',
	/** @type {} 查询订单信息*/
	query_order_info_by_id: 'select * from trv_spot_order t where t.order_id = ?',
};



module.exports = wxpayConst;

