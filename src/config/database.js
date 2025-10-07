// 数据库配置和初始化
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

// 数据库文件路径
const dbPath = path.join(__dirname, '../../database.db');

// 数据库连接实例
let db = null;

// 初始化数据库
async function initDatabase() {
    try {
        // 创建数据库连接
        db = new Database(dbPath);
        console.log('成功连接到SQLite数据库');
        
        // 创建用户表
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // 创建端口表
        db.exec(`
            CREATE TABLE IF NOT EXISTS ports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ip_address TEXT NOT NULL,
                port_number INTEGER NOT NULL,
                status TEXT DEFAULT 'active',
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // 创建设备表
        db.exec(`
            CREATE TABLE IF NOT EXISTS devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ip_address TEXT UNIQUE NOT NULL,
                hostname TEXT,
                device_type TEXT,
                status TEXT DEFAULT 'online',
                last_seen TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // 创建管理员用户（如果不存在）
        await createAdminUserIfNotExists();
        
        console.log('数据库表创建成功');
        return db;
    } catch (error) {
        console.error('初始化数据库错误:', error);
        throw error;
    }
}

// 创建管理员用户（如果不存在）
async function createAdminUserIfNotExists() {
    try {
        // 检查管理员用户是否已存在
        const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
        
        if (!adminExists) {
            // 创建默认管理员用户
            const hashedPassword = await bcrypt.hash('admin123', 10);
            db.prepare(`
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            `).run('admin', hashedPassword, 'admin');
            
            console.log('默认管理员用户创建成功: username=admin, password=admin123');
        }
    } catch (error) {
        console.error('创建管理员用户错误:', error);
    }
}

// 获取数据库连接
function getDB() {
    if (!db) {
        throw new Error('数据库未初始化，请先调用initializeDatabase()');
    }
    return db;
}

// 关闭数据库连接
function closeDB() {
    if (db) {
        try {
            db.close();
            console.log('数据库连接已关闭');
        } catch (err) {
            console.error('关闭数据库连接失败:', err.message);
        }
    }
}

module.exports = {
    initDatabase,
    getDB,
    closeDB
};