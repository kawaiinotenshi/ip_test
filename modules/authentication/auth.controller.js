// 认证模块 - 控制器
const { getDB } = require('../../src/config/database');
const bcrypt = require('bcrypt');

class AuthController {
    // 用户登录
    static login(req, res) {
        try {
            const { username, password } = req.body;
            const db = getDB();
            
            if (!username || !password) {
                return res.json({
                    success: false,
                    error: 'Username and password are required'
                });
            }
            
            // 查找用户
            const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
            
            if (!user) {
                return res.json({
                    success: false,
                    error: 'Invalid username or password'
                });
            }
            
            // 验证密码
            const passwordMatch = bcrypt.compareSync(password, user.password);
            
            if (!passwordMatch) {
                return res.json({
                    success: false,
                    error: 'Invalid username or password'
                });
            }
            
            // 设置会话
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 用户登出
    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.json({
                        success: false,
                        error: err.message
                    });
                }
                
                res.json({
                    success: true,
                    message: 'Logout successful'
                });
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 获取当前用户信息
    static getCurrentUser(req, res) {
        try {
            if (!req.session.user) {
                return res.json({
                    success: false,
                    error: 'Not authenticated'
                });
            }
            
            const db = getDB();
            const user = db.prepare('SELECT id, username, role, created_at FROM users WHERE id = ?').get(req.session.user.id);
            
            if (!user) {
                return res.json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            res.json({
                success: true,
                data: {
                    user
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 用户注册（仅供管理员使用）
    static register(req, res) {
        try {
            // 检查是否是管理员操作
            if (!req.session.user || req.session.user.role !== 'admin') {
                return res.json({
                    success: false,
                    error: 'Admin access required'
                });
            }
            
            const { username, password, role } = req.body;
            const db = getDB();
            
            if (!username || !password) {
                return res.json({
                    success: false,
                    error: 'Username and password are required'
                });
            }
            
            // 检查用户名是否已存在
            const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
            
            if (existingUser) {
                return res.json({
                    success: false,
                    error: 'Username already exists'
                });
            }
            
            // 密码加密
            const hashedPassword = bcrypt.hashSync(password, 10);
            
            // 创建新用户
            const stmt = db.prepare('INSERT INTO users (username, password, role, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
            const info = stmt.run(username, hashedPassword, role || 'user');
            
            // 获取新创建的用户
            const newUser = db.prepare('SELECT id, username, role, created_at FROM users WHERE id = ?').get(info.lastInsertRowid);
            
            res.json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: newUser
                }
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 更改密码
    static changePassword(req, res) {
        try {
            if (!req.session.user) {
                return res.json({
                    success: false,
                    error: 'Not authenticated'
                });
            }
            
            const { currentPassword, newPassword } = req.body;
            const db = getDB();
            
            if (!currentPassword || !newPassword) {
                return res.json({
                    success: false,
                    error: 'Current password and new password are required'
                });
            }
            
            // 获取用户信息
            const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.user.id);
            
            if (!user) {
                return res.json({
                    success: false,
                    error: 'User not found'
                });
            }
            
            // 验证当前密码
            const passwordMatch = bcrypt.compareSync(currentPassword, user.password);
            
            if (!passwordMatch) {
                return res.json({
                    success: false,
                    error: 'Current password is incorrect'
                });
            }
            
            // 密码加密并更新
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hashedPassword, user.id);
            
            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = AuthController;