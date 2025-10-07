// 设备监控模块 - 控制器
const { getDB } = require('../../src/config/database');

class DeviceController {
    // 获取所有设备
    static getAllDevices(req, res) {
        try {
            const db = getDB();
            const devices = db.prepare('SELECT * FROM devices ORDER BY created_at DESC').all();
            
            res.json({
                success: true,
                devices: devices
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 获取单个设备详情
    static getDevice(req, res) {
        try {
            const { id } = req.params;
            const db = getDB();
            const device = db.prepare('SELECT * FROM devices WHERE id = ?').get(id);
            
            if (!device) {
                return res.json({
                    success: false,
                    error: 'Device not found'
                });
            }
            
            res.json({
                success: true,
                device: device
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 添加新设备
    static addDevice(req, res) {
        try {
            const { ip_address, hostname, device_type } = req.body;
            
            if (!ip_address) {
                return res.json({
                    success: false,
                    error: 'IP address is required'
                });
            }
            
            // 简单的IP地址格式验证
            const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            if (!ipRegex.test(ip_address)) {
                return res.json({
                    success: false,
                    error: 'Invalid IP address format'
                });
            }
            
            const db = getDB();
            const stmt = db.prepare('INSERT INTO devices (ip_address, hostname, device_type, status, last_seen) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)');
            
            const info = stmt.run(ip_address, hostname || '', device_type || '', 'online');
            
            // 获取新插入的设备数据
            const row = db.prepare('SELECT * FROM devices WHERE id = ?').get(info.lastInsertRowid);
            
            res.json({
                success: true,
                device: row,
                message: 'Device added successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 更新设备信息
    static updateDevice(req, res) {
        try {
            const { id } = req.params;
            const { ip_address, hostname, device_type, status } = req.body;
            
            const db = getDB();
            
            // 检查设备是否存在
            const row = db.prepare('SELECT * FROM devices WHERE id = ?').get(id);
            if (!row) {
                return res.json({
                    success: false,
                    error: 'Device not found'
                });
            }
            
            // 更新设备数据
            const stmt = db.prepare('UPDATE devices SET ip_address = ?, hostname = ?, device_type = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
            
            stmt.run(
                ip_address || row.ip_address,
                hostname !== undefined ? hostname : row.hostname,
                device_type !== undefined ? device_type : row.device_type,
                status !== undefined ? status : row.status,
                id
            );
            
            // 获取更新后的设备数据
            const updatedRow = db.prepare('SELECT * FROM devices WHERE id = ?').get(id);
            
            res.json({
                success: true,
                device: updatedRow,
                message: 'Device updated successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 删除设备
    static deleteDevice(req, res) {
        try {
            const { id } = req.params;
            const db = getDB();
            
            // 检查设备是否存在
            const row = db.prepare('SELECT * FROM devices WHERE id = ?').get(id);
            if (!row) {
                return res.json({
                    success: false,
                    error: 'Device not found'
                });
            }
            
            // 删除设备
            db.prepare('DELETE FROM devices WHERE id = ?').run(id);
            
            res.json({
                success: true,
                message: 'Device deleted successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 检查设备在线状态
    static checkDeviceStatus(req, res) {
        try {
            const { ip_address } = req.params;
            
            // 这里可以添加实际的设备ping或连接检测逻辑
            // 为简化，我们只更新数据库中的最后可见时间
            const db = getDB();
            
            const stmt = db.prepare('UPDATE devices SET last_seen = CURRENT_TIMESTAMP, status = ? WHERE ip_address = ?');
            
            // 模拟状态检查，实际应用中应替换为真实的连接测试
            const isOnline = true; // 这里应该是实际检测的结果
            
            const info = stmt.run(isOnline ? 'online' : 'offline', ip_address);
            
            if (info.changes === 0) {
                return res.json({
                    success: false,
                    error: 'Device not found'
                });
            }
            
            res.json({
                success: true,
                ip_address,
                status: isOnline ? 'online' : 'offline',
                last_seen: new Date().toISOString()
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = DeviceController;