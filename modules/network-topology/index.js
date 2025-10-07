// 网络拓扑模块 - 主入口
const topologyRoutes = require('./topology.routes');

// 模块初始化函数
function initialize(app) {
    // 注册网络拓扑相关路由
    app.use(topologyRoutes);
    
    console.log('Network Topology module initialized');
}

module.exports = {
    initialize,
    name: 'network-topology',
    description: 'Intranet network topology visualization module'
};