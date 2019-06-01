'use strict';
const config = require('../config');
const myError = require('../error/error');

const mysqlKhex = require('knex')({
    client: config.knexClient, //指明数据库类型，还可以是mysql，sqlite3等等
    connection: { //指明连接参数
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.pass,
        database: config.mysql.db,
        charset: config.mysql.char,
        multipleStatements: true
    },
    debug: true, //指明是否开启debug模式，默认为true表示开启
    pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
        min: config.mysql.poolMinSize,
        max: config.mysql.poolMaxSize,
    },
    acquireConnectionTimeout: 10 * 1000 //指明连接计时器大小，默认为60000ms
});


/**
 *  查询库中数据
 *  @author yiklv_yanguo
 *  @date    2019-06-01T22:24:38+0800
 *  @version 1.0.0
 *  @param   {[tring}                 table     表名
 *  @param   {String}                 columns   字段名
 *  @param   {Object }                 condition [description]
 *  @return  {[type]}                           [description]
 */
const query = (table, columns, condition) => {
    table = table || '';
    if (table || table == '') {
        myError.myError('query table is empty, please check it again');
    }

    return new Promise((resolve, reject) => {
        mysqlKhex.from(table).select(columns).where(condition)
            .then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
    });
}


module.exports = {
    query: query
}


/*
const mysql = require('mysql');
const config = require('../config')

const pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true,
    acquireTimeout: 60 * 1000
});

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}


module.exports = {
    query
}
*/