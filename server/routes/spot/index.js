'use strict';

const model = require('../model');
const methods = require('../common/method');

module.exports = {
    ...model,
    'querySpot': { method: methods.get },
    'querySpotImgs': {method: methods.get},
    'querySpotTktList': {method: methods.get}
}