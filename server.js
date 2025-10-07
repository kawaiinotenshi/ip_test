const express = require('express');
const session = require('express-session');
const path = require('path');
const os = require('os');
const fs = require('fs');

// 加载配置
const config = require('./src/config');
const { initDatabase } = require('./src/config/database');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || config.server.port || 3000;

// 配置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 配置会话管理
app.use(session({
  secret: config.session.secret || 'default_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge || 3600000,
    httpOnly: true,
    secure: config.session.secure || false
  }
}));

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 添加前端路由重定向
app.use((req, res, next) => {
    // 如果请求的是API路径，继续处理
    if (req.path.startsWith('/api/')) {
        return next();
    }
    
    // 如果请求的文件存在，继续处理
    if (req.path.endsWith('.html') || 
        req.path.endsWith('.js') || 
        req.path.endsWith('.css') || 
        req.path.endsWith('.jpg') || 
        req.path.endsWith('.png') || 
        req.path.endsWith('.svg') || 
        req.path.endsWith('.ico') ||
        req.path.includes('/images/') ||
        req.path.includes('/css/') ||
        req.path.includes('/js/')) {
        return next();
    }
    
    // 如果未找到文件且不是API请求，重定向到适当的页面
    // 对于认证相关的路径，重定向到登录页
    if (req.path === '/login' || req.path === '/register') {
        return res.redirect('/login.html');
    }
    
    // 默认情况下，重定向到登录页
    return res.redirect('/login.html');
});

// 初始化数据库
initDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch(err => console.error('Failed to initialize database:', err));

// 模块加载器
function loadModules() {
  const modulesDir = path.join(__dirname, 'modules');
  
  if (!fs.existsSync(modulesDir)) {
    console.warn(`Modules directory not found: ${modulesDir}`);
    return;
  }
  
  const moduleNames = fs.readdirSync(modulesDir)
    .filter(name => fs.lstatSync(path.join(modulesDir, name)).isDirectory())
    .filter(name => fs.existsSync(path.join(modulesDir, name, 'index.js')));
  
  console.log('Loading modules:', moduleNames);
  
  moduleNames.forEach(moduleName => {
    try {
      const modulePath = path.join(modulesDir, moduleName, 'index.js');
      const module = require(modulePath);
      
      if (module.initialize && typeof module.initialize === 'function') {
        module.initialize(app);
        console.log(`Module initialized: ${moduleName} - ${module.description || 'No description'}`);
      } else {
        console.warn(`Module ${moduleName} does not have a valid initialize function`);
      }
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error);
    }
  });
}

// 获取本地IP地址
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  Object.keys(interfaces).forEach(interfaceName => {
    interfaces[interfaceName].forEach(iface => {
      // 跳过IPv6和本地回环地址
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    });
  });
  
  return addresses;
}

// 模拟IP地址列表 - 保留原有功能
const mockIPs = [
    '10.10.28.14',
    '192.168.0.1',
    '172.16.1.1'
];

// 基础API路由

// 获取本地IP地址
app.get('/api/local-ips', (req, res) => {
  try {
    const ipAddresses = getLocalIPAddress();
    res.json({
      success: true,
      data: ipAddresses
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

// 自定义IP地址验证
app.post('/api/custom-ip', (req, res) => {
  try {
    const { ipAddress, includePort } = req.body;
    
    if (!ipAddress) {
      return res.json({
        success: false,
        error: '请输入IP地址'
      });
    }
    
    // 简单的IP地址验证
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipAddress)) {
      return res.json({
        success: false,
        error: 'IP地址格式不正确'
      });
    }
    
    const showPort = includePort !== 'false';
    const url = `http://${ipAddress}${showPort ? `:${PORT}` : ''}`;
    
    res.json({
      success: true,
      message: 'IP地址验证成功',
      data: ipAddress,
      url: url
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

// 保留原有的配置信息接口
app.get('/api/config', (req, res) => {
    const showPort = req.query.showPort !== 'false';
    const realIPs = getLocalIPAddress();
    
    res.json({
        port: PORT,
        showPort: showPort,
        realIPs: realIPs,
        mockIPs: mockIPs
    });
});



// 加载所有模块
loadModules();

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${config.server?.environment || 'development'}`);
  
  // 显示可用的IP地址
  const localIPs = getLocalIPAddress();
  console.log('');
  console.log('Real Intranet IP Addresses (Recommended for actual connections):');
  localIPs.forEach(ip => {
    console.log(`http://${ip}:${PORT}`);
  });
  console.log('');
  console.log('Mock IP Addresses (For reference only):');
  mockIPs.forEach(ip => {
    console.log(`http://${ip}:${PORT}`);
  });
});