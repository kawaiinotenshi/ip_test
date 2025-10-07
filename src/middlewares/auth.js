// 认证中间件
const { getDB } = require('../config/database');

const auth = {
    // 验证用户会话
    authenticate: (req, res, next) => {
        try {
            // 检查会话是否存在
            if (!req.session || !req.session.user) {
                return res.json({
                    success: false,
                    error: 'Authentication required',
                    code: 'UNAUTHORIZED'
                });
            }
            
            // 如果需要，可以在这里验证用户是否仍然存在于数据库中
            const db = getDB();
            const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.session.user.id);
            
            if (!user) {
                // 用户不存在，清除会话
                req.session.destroy((err) => {
                    if (err) console.error('Error destroying session:', err);
                });
                
                return res.json({
                    success: false,
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }
            
            // 用户已认证，继续处理请求
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.json({
                success: false,
                error: 'Authentication failed',
                code: 'AUTHENTICATION_ERROR'
            });
        }
    },
    
    // 验证管理员权限
    authorizeAdmin: (req, res, next) => {
        try {
            // 首先验证用户已认证
            if (!req.session || !req.session.user) {
                return res.json({
                    success: false,
                    error: 'Authentication required',
                    code: 'UNAUTHORIZED'
                });
            }
            
            // 检查用户角色是否为管理员
            if (req.session.user.role !== 'admin') {
                return res.json({
                    success: false,
                    error: 'Admin privileges required',
                    code: 'FORBIDDEN'
                });
            }
            
            // 管理员验证通过，继续处理请求
            next();
        } catch (error) {
            console.error('Authorization error:', error);
            return res.json({
                success: false,
                error: 'Authorization failed',
                code: 'AUTHORIZATION_ERROR'
            });
        }
    }
};

module.exports = auth;