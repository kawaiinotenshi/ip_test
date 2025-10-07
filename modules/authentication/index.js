// 认证模块 - 主入口
const authRoutes = require('./auth.routes');

// 模块初始化函数
function initialize(app) {
    // 注册认证相关路由
    app.use(authRoutes);
    
    console.log('Authentication module initialized');
}

module.exports = {
    initialize,
    name: 'authentication',
    description: 'User authentication and authorization module'
};