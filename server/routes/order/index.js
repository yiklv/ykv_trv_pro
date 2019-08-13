'use strict';

const model = require('../model');
const methods = require('../common/method');

module.exports = {
    //...model,
    'queryMyOrderNumList': { method: methods.get },
    'queryMyOrderList': { method: methods.get },
}
