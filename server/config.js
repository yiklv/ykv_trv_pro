const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx2d499a770619d136',

    // 微信小程序 App Secret
    appSecret: '6e7fcc0fbc38f4113af126f49b5e874a',

    mch_id: '10000100', // 小程序商户id
    pfx_path: './public/crt/wxpay_cert.p12', //微信商户平台证书路径
    // 通知地址 异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。
    notify_url: 'http://localhost:5757/weapp/advice/list',
    // 终端IP  支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
    spbill_create_ip:'127.0.0.1',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    // knex client
    knexClient: 'mysql', 

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '192.168.56.101',
        port: 3306,
        user: 'trvdata',
        db: 'cAuth',
        pass: 'trvdata1234',
        char: 'utf8mb4',
        poolMinSize: 0,
        poolMaxSize: 100
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh',
    serverHost: '1234567.qcloud.la',
    tunnelServerUrl: '1234567.ws.qcloud.la',
    tunnelSignatureKey: 'abcdefghijkl',
    qcloudAppId: 'wx2d499a770619d136',
    qcloudSecretId: '6e7fcc0fbc38f4113af126f49b5e874a',
    qcloudSecretKey: 'abcdefghijkl',
    wxMessageToken: 'abcdefghijkl'
}

module.exports = CONF
