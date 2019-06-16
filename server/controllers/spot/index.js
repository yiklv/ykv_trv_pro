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
    'querySpotTktContList'
], 'spot')

module.exports = {
    ...m,
}
