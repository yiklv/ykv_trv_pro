'use strict';

const model = require('../model')
const m = model([
    'list',
    'add',
    'update',
    'del',
    'querySpot',
    'querySpotImgs',
    'querySpotTktList',
    'querySpotContentList',
    'querySpotTktContList',
    'queryTktDatePriceList'
], 'spot')

module.exports = {
    ...m,
}
