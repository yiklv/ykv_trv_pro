'use strict';

const model = require('../model');
const methods = require('../common/method');

module.exports = {
    ...model,
    'querySpot': { method: methods.get },
    'querySpotImgs': { method: methods.get },
    'querySpotTktList': { method: methods.get },
    'querySpotTktContList': { method: methods.get },
    'querySpotContentList': { method: methods.get },
    'queryTktDatePriceList':{ method: methods.get},
    'queryBookTktInfo': { method: methods.get},
}
