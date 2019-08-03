'use strict';

const model = require('../model')
const m = model([
    // 'list',
    // 'add',
    // 'update',
    // 'del',
    'queryWepayPrepayUrl',
    'setUnifiedOrder',
    'updateOrderInfo',
], 'wxpay')

module.exports = {
    ...m,
}  