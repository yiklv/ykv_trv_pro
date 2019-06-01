'use strict';

const methods = require('./common/method');

module.exports = {
    'list': { method: methods.get },
    'add': { method: methods.post },
    'update': { method: methods.post },
    'del': { method: methods.post },
}
