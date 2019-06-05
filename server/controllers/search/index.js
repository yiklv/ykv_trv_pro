'use strict';

const model = require('../model')
const m = model([
    'list',
    'add',
    'update',
    'del',
    'keyLists'
], 'search')

module.exports = {
    ...m,
}
