'use strict';

const model = require('../model')
const m = model([
    'list',
    'add',
    'update',
    'del',
    'querySpot'
], 'spot')

module.exports = {
    ...m,
}
