'use strict';

const model = require('../model')
const m = model([
    // 'list',
    // 'add',
    // 'update',
    // 'del',
    'queryWepayPrepayUrl',
    'setUnifiedOrder',
    'updateOrderInfoCancel',
    'queryOrderPayInfo',
    'queryOrderInfoById',
    'queryOrderInfoByOpenid',
], 'wxpay')

module.exports = {
    ...m,
}  