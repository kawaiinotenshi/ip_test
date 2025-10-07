// 设备监控模块 - 主入口
const deviceRoutes = require('./device.routes');

// 模块初始化函数
function initialize(app) {
    // 注册设备监控相关路由
    app.use(deviceRoutes);
    
    console.log('Device Monitoring module initialized');
}

module.exports = {
    initialize,
    name: 'device-monitoring',
    description: 'Intranet device monitoring module'
};