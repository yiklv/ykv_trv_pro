'use strict';

const pool = require('../../db/mysql');
const {random}= require('../../utils/stringutils');

// const { NtNUpdate } = require('../../helper')
// const STATUS = require('../../enum')
// const TYPES = {
//     NORMAL: 0,
// }
const { query } = pool

const queryAllAdvices = () =>{
    const _sql = 'select * from trv_wrk_advice where adv_status = ? order by adv_seq asc';
    return query(_sql, ['Y']);
}
// 新添管理员
const add = (val) => {
    // const { account, phone, password, name, creator } = val
    // const _sql = 'insert into lottery_admin(account,phone,password,create_time,creator,name,type,status) values(?,?,?,now(),?,?,?,?);'
    // return query(_sql, [account, phone, password, creator, name, TYPES.NORMAL, STATUS.NORMAL])
    // 
    console.log(val);
    let insertParam = val;
    insertParam['id_key'] = random(32);
    return null;
}


// 更改管理员
const update = (val) => {
    // const { account, phone, password, name, type, id } = val
    // const _sql = 'update lottery_admin set '
    // const { sql, args } = NtNUpdate({ account, phone, password, name, type }, _sql)
    // _sql = sql + 'where id = ?'
    // return query(_sql, [...args, id])
    // 
    return null;
}

// 查询管理员
const list = (val) => {
    // const _sql = 'select * from trv_wrk_advise where adv_status = ? order by adv_seq asc';
    // return query(_sql, ['Y']);
    // return query('trv_wrk_advise','*', {adv_status: 'Y'});

    const _sql = 'select * from trv_wrk_advise where adv_status = ? order by adv_seq asc';
    return query(_sql, ['Y']);
}

// 删除管理员
const del = val => {
    // const { id } = val
    // const sql = 'update lottery_admin set status = ? where id = ?'
    // return query(sql, [STATUS.DEL, id])
    // 
    return null;
}

module.exports = {
    list,
    add,
    update,
    del
}