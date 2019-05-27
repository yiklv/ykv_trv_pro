const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx2d499a770619d136',

    // 微信小程序 App Secret
    appSecret: '6e7fcc0fbc38f4113af126f49b5e874a',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

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
        char: 'utf8mb4'
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
