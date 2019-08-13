'use strict';

const model = require('../model')
const m = model([
    // 'list',
    // 'add',
    // 'update',
    // 'del',
    'queryMyOrderNumList',
    'queryMyOrderList',
], 'order');

module.exports = {
    ...m,
}
