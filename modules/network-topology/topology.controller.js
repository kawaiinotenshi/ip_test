// 网络拓扑模块 - 控制器
const { getDB } = require('../../src/config/database');

class NetworkTopologyController {
    // 获取网络拓扑数据
    static getTopology(req, res) {
        try {
            const db = getDB();
            
            // 获取设备信息
            const devices = db.prepare('SELECT * FROM devices').all();
            
            // 获取端口信息
            const ports = db.prepare('SELECT * FROM ports').all();
            
            // 构建拓扑数据结构
            const nodes = devices.map(device => ({
                id: device.id.toString(),
                label: device.name,
                type: device.type,
                ip: device.ip_address,
                status: device.status
            }));
            
            // 构建连接关系（简化示例：基于IP地址网段关联）
            const edges = [];
            const ipSegments = {};
            
            devices.forEach(device => {
                const segment = device.ip_address.substring(0, device.ip_address.lastIndexOf('.'));
                if (!ipSegments[segment]) {
                    ipSegments[segment] = [];
                }
                ipSegments[segment].push(device.id.toString());
            });
            
            // 在同一网段内创建连接
            Object.values(ipSegments).forEach(segmentDevices => {
                for (let i = 0; i < segmentDevices.length; i++) {
                    for (let j = i + 1; j < segmentDevices.length; j++) {
                        edges.push({
                            source: segmentDevices[i],
                            target: segmentDevices[j],
                            type: 'segment'
                        });
                    }
                }
            });
            
            // 将端口与设备关联
            ports.forEach(port => {
                if (port.device_id) {
                    nodes.push({
                        id: `port-${port.id}`,
                        label: `Port ${port.port_number}`,
                        type: 'port',
                        device_id: port.device_id
                    });
                    
                    edges.push({
                        source: port.device_id.toString(),
                        target: `port-${port.id}`,
                        type: 'port'
                    });
                }
            });
            
            res.json({
                success: true,
                data: {
                    nodes,
                    edges
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 获取网络统计信息
    static getNetworkStats(req, res) {
        try {
            const db = getDB();
            
            // 获取设备统计
            const deviceCount = db.prepare('SELECT COUNT(*) as count FROM devices').get().count;
            
            // 获取在线设备数
            const onlineDevices = db.prepare('SELECT COUNT(*) as count FROM devices WHERE status = ?').bind('online').get().count;
            
            // 获取端口统计
            const portCount = db.prepare('SELECT COUNT(*) as count FROM ports').get().count;
            
            // 获取已使用端口数
            const usedPorts = db.prepare('SELECT COUNT(*) as count FROM ports WHERE status = ?').bind('in_use').get().count;
            
            res.json({
                success: true,
                data: {
                    deviceCount,
                    onlineDevices,
                    portCount,
                    usedPorts,
                    onlineRate: deviceCount > 0 ? (onlineDevices / deviceCount * 100).toFixed(2) + '%' : '0%',
                    portUsageRate: portCount > 0 ? (usedPorts / portCount * 100).toFixed(2) + '%' : '0%'
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = NetworkTopologyController;