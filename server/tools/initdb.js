'use strict';

/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs');
const path = require('path');
const { mysql: config } = require('../config');

console.log('\n======================================');
console.log('开始初始化数据库...');

// 初始化 SQL 文件路径 DDL
const INIT_DB_FILE_DDL = path.join(__dirname, './DDL/cAuth.sql');
// 初始化 SQL 文件路径 DML
const INIT_DB_FILE_DML = path.join(__dirname, './DDL/cAuth.sql');

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
});

console.log(`准备读取 DDL 的 SQL 文件：${INIT_DB_FILE_DDL}`);
// 读取 .sql 文件内容
const contentDDL = fs.readFileSync(INIT_DB_FILE_DDL, 'utf8');

console.log('开始执行 DDL 的 SQL 文件...');

// 执行 .sql 文件内容
DB.raw(contentDDL).then(res => {
    console.log('数据库初始化表成功！');
    process.exit(0);
}, err => {
    throw new Error(err);
});


// console.log(`准备读取 DML 的 SQL 文件：${INIT_DB_FILE_DML}`);
// // 读取 .sql 文件内容
// const contentDML = fs.readFileSync(INIT_DB_FILE_DML, 'utf8');

// console.log('开始执行 DML 的 SQL 文件...');

// // 执行 .sql 文件内容
// DB.raw(contentDML).then(res => {
//     console.log('数据库初始化数据成功！');
//     process.exit(0);
// }, err => {
//     throw new Error(err);
// });