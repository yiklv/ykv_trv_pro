const success = (result) => {
    return {
        retCode: 200,
        retValue: result
    }
}
const failed = (error) => {
    return {
        retCode: 500,
        msg: error.message || '服务器异常'
    }
}

module.exports = {
    success,
    failed
}