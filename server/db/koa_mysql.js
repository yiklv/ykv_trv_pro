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
 *  @param   {Object }                condition 条件字段{a:a,b:b}
 *  @return  {object }                returnVal 查询结果
 */
const query = (table, columns, condition) => {

    table = table || '';
    if (!table || table == '') {
        myError.myError('sql error--------->query table is empty, please check it again');
    }
    columns = columns || '*';
    condition = condition || {
        '1': '1'
    };
    return new Promise((resolve, reject) => {
        mysqlKhex.from(table).select(columns).where(condition)
            .then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
    });
}

/**
 *  查询库中数据排序
 *  @author yiklv_yanguo
 *  @date    2019-06-05T22:51:48+0800
 *  @version [version]
 *  @param   {[tring}                 table     表名
 *  @param   {String}                 columns   字段名
 *  @param   {Object }                condition 条件字段{a:a,b:b}
 *  @param   {Array}                  sortCond  排序字段[{ column: 'a' }, { column: 'ab', order: 'desc' }]
 *  @return  {[type]}                           [description]
 */
const querySort = (table, columns, condition, sortCond) => {

    table = table || '';
    if (!table || table == '') {
        myError.myError('sql error--------->querySort table is empty, please check it again');
    }
    columns = columns || '*';
    condition = condition || {
        '1': '1'
    };
    return new Promise((resolve, reject) => {
        mysqlKhex.from(table).select(columns).where(condition).orderBy(sortCond)
            .then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
    });
}


/**
 *  查询库中数据排序
 *  @author yiklv_yanguo
 *  @date    2019-06-05T22:51:48+0800
 *  @version [version]
 *  @param   {[tring}                 table     表名
 *  @param   {Array}                 columns   字段名
 *  @param   {Object }                condition 条件字段{a:a,b:b}
 *  @param   {Array}                  sortCond  排序字段[{ column: 'a' }, { column: 'ab', order: 'desc' }]
 *  @return  {[type]}                           [description]
 */
const querySortLimit = (table, columns, condition, sortCond, limit, offset) => {

    table = table || '';
    offset = offset || 0;
    if (!table || table == '') {
        myError.myError('sql error--------->querySortLimit table is empty, please check it again');
    }
    columns = columns || '*';
    condition = condition || {
        '1': '1'
    };
    offset = offset || 0;
    limit = limit || 9999999999999999;
    console.log(sortCond);
    return new Promise((resolve, reject) => {
        mysqlKhex.from(table).select(columns).where(condition).orderByRaw(sortCond).limit(limit).offset(offset)
            .then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
    });
}


/**
 *  查询库中数据
 *  @author yiklv_yanguo
 *  @date    2019-06-01T22:24:38+0800
 *  @version 1.0.0
 *  @param   {[tring}                 table     表名
 *  @param   {Array }                 condition 条件  [{id: 'aa'}, {id:'bbb'}]
 *  @return  {[type]}                           [description]
 */
const insert = (table, condition) => {

    table = table || '';
    if (!table || table == '') {
        myError.myError('sql error--------->insert table is empty, please check it again');
    }
    condition = condition || [];
    return new Promise((resolve, reject) => {
        mysqlKhex(table).insert(condition).returning('id_key')
            .then(res => {
                console.log(res);
                resolve(res);
            }, err => {
                reject(err);
            });
    });
}


/**
 *  join查询
 *  @author yiklv_yanguo
 *  @date    2019-06-10T07:07:14+0800
 *  @version 1.0.0
 *  @param   {Object}                 table     表名
 *  @param   {Array}                  columns   字段名
 *  @param   {Object}                 condition where 条件
 *  @param   {String}                 joinTable join表
 *  @param   {String}                 joinType  join类型
 *  @param   {Array}                  joinCond  join条件
 *  @return  {[type]}                           [description]
 */
const queryJoin = (table, columns, condition, joinTable, joinType, joinCond) => {
    table = table || '';
    if (!table || table == '') {
        return myError.myError('sql error--------->queryJoin table is empty, please check it again');
    }
    if (!joinTable || joinTable == '') {
        return myError.myError('sql error--------->join table is empty');
    }
    if (!joinCond || joinCond == '') {
        return myError.myError('sql error--------->join condition is empty');
    }
    columns = columns || '*';
    condition = condition || {
        '1': '1'
    };
    joinType = joinType || 'inner';

    return new Promise((resolve, reject) => {
        if (joinType == 'inner') {
            mysqlKhex.from(table).select(columns).where(condition).join(joinTable, function() {
                    this.on(joinCond[0].first, joinCond[0].operator, joinCond[0].second);
                    for (var i = 1; i < joinCond.length; i++) {
                        if ('and' == joinCond[i].conn) {
                            this.andOn(joinCond[i].first, joinCond[i].operator, joinCond[i].second);
                        }
                        if ('or' == joinCond[i].conn) {
                            this.orOn(joinCond[i].first, joinCond[i].operator, joinCond[i].second);
                        }
                    }

                })
                .then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        }

    });
}


module.exports = {
    query: query,
    querySortLimit: querySortLimit,
    querySort: querySort,
    insert: insert,
    queryJoin: queryJoin,
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