'use strict';

var wxpayConst = {
	/** @type {String} 支付统一下单URL */
	unifiedorderUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder',

	/** @type {String} 查询该用户所有未完成的订单个数 */
	query_order_unfinished_cnt : 'select count(1) cnt from trv_spot_order t where t.open_id = ? and t.order_status = ?',
	/** @type {String} 生成订单信息 */
	insert_order_unfinished: 'insert into trv_spot_order(id_key, order_id, order_info, open_id, tkt_id, trv_time, order_price, tkt_num, sum_price, time_start, time_expire, order_desc, order_status) values(rand_string(36), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	/** @type {String} 合并取票人信息 */
	merge_book_info: 'insert into trv_spot_book_info(id_key,open_id,real_name, mobilePhone, id_no )values (rand_string(36),?,?,?,?) on duplicate key update real_name=?, mobilePhone=?,id_no = ?',
	/** 根据订单号 查询数据库中是否存在 */
	query_order_by_id_sql: 'select count(1) qryCnt from trv_spot_order t where t.order_id = ? and t.time_expire < FROM_UNIXTIME(UNIX_TIMESTAMP(),"%Y%m%d%H%i%s") and t.order_status = ?',
	update_order_id_sql: 'update trv_spot_order t set t.order_status = ? ,order_end_time = ?, t.date_updated = CURRENT_TIMESTAMP() , t.updated_by = ? where t.order_id = ?',
};



module.exports = wxpayConst;

