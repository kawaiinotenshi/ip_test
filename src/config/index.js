// 系统主配置文件
const path = require('path');

const config = {
    // 服务器配置
    server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    },
    
    // 会话配置
    session: {
        secret: 'intranet_management_system_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 1小时
            secure: false // 在生产环境中应设置为true
        }
    },
    
    // 模块配置
    modules: {
        enabled: ['authentication', 'port-management', 'device-monitoring', 'network-topology'],
        basePath: path.join(__dirname, '../../modules')
    },
    
    // 视图配置
    views: {
        engine: 'ejs',
        path: path.join(__dirname, '../../src/views')
    },
    
    // 静态文件配置
    static: {
        path: path.join(__dirname, '../../public')
    },
    
    // 日志配置
    logging: {
        level: 'info',
        file: path.join(__dirname, '../../logs/app.log')
    }
};

module.exports = config;