const pojo = require('./response')
const { success, failed } = pojo
module.exports = (config, file) => {
    const services = require(`../../services/${file}`);
     return config.reduce((copy, name) => {
        copy[name] = async ctx => {
            let res;
            try {
                const val = ctx.request.body;
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
