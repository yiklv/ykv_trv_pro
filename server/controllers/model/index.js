const pojo = require('./response')
const { success, failed } = pojo
module.exports = (config, file) => {
    const services = require(`../../services/${file}`);
     return config.reduce((copy, name) => {
        copy[name] = async ctx => {
            let res;
            try {
                let method = ctx.request.method;
                let val;
                if('GET' == method){
                    val = ctx.query;
                }else if('POST' == method){
                    val = ctx.request.body;
                }else{
                    val = ctx.query;
                }
                await services[name](val).then(result => {
                    res = success(result);
                })
            } catch (err) {
                res = failed(err)
            }
            ctx.body = res
        }
        return copy
    }, {})
}
