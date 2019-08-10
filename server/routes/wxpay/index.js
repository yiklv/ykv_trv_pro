'use strict';

const model = require('../model');
const methods = require('../common/method');

module.exports = {
    // ...model,
    'queryWepayPrepayUrl':{ method: methods.get},
    'setUnifiedOrder':{ method: methods.post},
    'updateOrderInfoCancel':{ method: methods.post},
    'queryOrderPayInfo':{method: methods.get},
    'queryOrderInfoById':{method: methods.get},
    'queryOrderInfoByOpenid':{method: methods.get}
}
