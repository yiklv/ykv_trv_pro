
module.exports = (config => {
    return config.reduce((copy, name) => {
        const obj = require(`../${name}`)
        const newArr = Object.keys(obj).reduce((total, each) => {
            let item = { path: `/${name}/${each}`, method: obj[each].method, action: each, service: name }
            total.push(item)
            return total
        }, [])
        copy = copy.concat(newArr);
        return copy
    }, [])
})([
    'advice', /**首页广告展示*/
    'search',  /**搜索信息*/
    'spot' ,   /**景点路由*/
    'wxpay' ,   /**微信支付*/
])
