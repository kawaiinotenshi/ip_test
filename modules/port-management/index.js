// 端口管理模块 - 主入口
const portRoutes = require('./port.routes');

// 模块初始化函数
function initialize(app) {
    // 注册端口管理相关路由
    app.use(portRoutes);
    
    console.log('Port Management module initialized');
}

module.exports = {
    initialize,
    name: 'port-management',
    description: 'Intranet port management module'
};