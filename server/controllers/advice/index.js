const model = require('../model')
const m = model([
    'list',
    'add',
    'update',
    'del'
], 'advice')

module.exports = {
    ...m,
}
