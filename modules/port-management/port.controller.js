// 端口管理模块 - 控制器
const { getDB } = require('../../src/config/database');

class PortController {
    // 获取所有端口数据
    static getAllPorts(req, res) {
        try {
            const db = getDB();
            const rows = db.prepare('SELECT * FROM ports ORDER BY created_at DESC').all();
            
            res.json({
                success: true,
                ports: rows,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 添加端口数据
    static addPort(req, res) {
        try {
            const { ip_address, port_number, status, description } = req.body;
            
            if (!ip_address || !port_number) {
                return res.json({
                    success: false,
                    error: 'IP address and port number are required'
                });
            }
            
            const db = getDB();
            const insertPort = db.prepare('INSERT INTO ports (ip_address, port_number, status, description) VALUES (?, ?, ?, ?)');
            
            const info = insertPort.run(
                ip_address,
                parseInt(port_number),
                status || 'active',
                description || ''
            );
            
            // 获取新插入的端口数据
            const row = db.prepare('SELECT * FROM ports WHERE id = ?').get(info.lastInsertRowid);
            
            res.json({
                success: true,
                port: row,
                message: 'Port data added successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 更新端口数据
    static updatePort(req, res) {
        try {
            const { id } = req.params;
            const { ip_address, port_number, status, description } = req.body;
            
            const db = getDB();
            
            // 检查端口是否存在
            const row = db.prepare('SELECT * FROM ports WHERE id = ?').get(id);
            
            if (!row) {
                return res.json({
                    success: false,
                    error: 'Port data not found'
                });
            }
            
            // 更新端口数据
            const updatePort = db.prepare(
                'UPDATE ports SET ip_address = ?, port_number = ?, status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            );
            
            updatePort.run(
                ip_address || row.ip_address,
                port_number ? parseInt(port_number) : row.port_number,
                status !== undefined ? status : row.status,
                description !== undefined ? description : row.description,
                id
            );
            
            // 获取更新后的端口数据
            const updatedRow = db.prepare('SELECT * FROM ports WHERE id = ?').get(id);
            
            res.json({
                success: true,
                port: updatedRow,
                message: 'Port data updated successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 删除端口数据
    static deletePort(req, res) {
        try {
            const { id } = req.params;
            const db = getDB();
            
            // 检查端口是否存在
            const row = db.prepare('SELECT * FROM ports WHERE id = ?').get(id);
            
            if (!row) {
                return res.json({
                    success: false,
                    error: 'Port data not found'
                });
            }
            
            // 删除端口数据
            db.prepare('DELETE FROM ports WHERE id = ?').run(id);
            
            res.json({
                success: true,
                message: 'Port data deleted successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = PortController;