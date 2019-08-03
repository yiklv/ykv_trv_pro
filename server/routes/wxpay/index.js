'use strict';

const model = require('../model');
const methods = require('../common/method');

module.exports = {
    // ...model,
    'queryWepayPrepayUrl':{ method: methods.get},
    'setUnifiedOrder':{ method: methods.post},
    //'updateOrderInfo':{ method: methods.post},
}
