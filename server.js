const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 中间件设置
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 数据存储文件路径
const DATA_FILE = path.join(__dirname, 'data.json');

// 初始化数据存储
function initializeData() {
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = {
            ports: [],
            updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// 获取存储的数据
function getData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取数据文件失败:', error);
        return { ports: [], updatedAt: new Date().toISOString() };
    }
}

// 保存数据
function saveData(data) {
    try {
        data.updatedAt = new Date().toISOString();
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('保存数据文件失败:', error);
        return false;
    }
}

// 获取本机内网IP地址
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

// 模拟IP地址列表
const mockIPs = [
    '10.10.28.14',
    '192.168.0.1',
    '172.16.1.1'
];

// 初始化数据
initializeData();

// API接口：获取配置信息
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

// API接口：获取端口数据
app.get('/api/ports', (req, res) => {
    const data = getData();
    res.json({
        success: true,
        ports: data.ports,
        updatedAt: data.updatedAt
    });
});

// API接口：添加端口数据
app.post('/api/ports', (req, res) => {
    const { port, status, description } = req.body;
    
    if (!port || status === undefined) {
        return res.json({
            success: false,
            error: '端口号和状态是必填项'
        });
    }
    
    const data = getData();
    const newPort = {
        id: Date.now().toString(),
        port: parseInt(port),
        status: status,
        description: description || '',
        createdAt: new Date().toISOString()
    };
    
    data.ports.push(newPort);
    
    if (saveData(data)) {
        res.json({
            success: true,
            port: newPort,
            message: '端口数据添加成功'
        });
    } else {
        res.json({
            success: false,
            error: '保存数据失败'
        });
    }
});

// API接口：更新端口数据
app.put('/api/ports/:id', (req, res) => {
    const { id } = req.params;
    const { port, status, description } = req.body;
    
    const data = getData();
    const portIndex = data.ports.findIndex(p => p.id === id);
    
    if (portIndex === -1) {
        return res.json({
            success: false,
            error: '端口数据不存在'
        });
    }
    
    // 更新数据
    if (port !== undefined) data.ports[portIndex].port = parseInt(port);
    if (status !== undefined) data.ports[portIndex].status = status;
    if (description !== undefined) data.ports[portIndex].description = description;
    data.ports[portIndex].updatedAt = new Date().toISOString();
    
    if (saveData(data)) {
        res.json({
            success: true,
            port: data.ports[portIndex],
            message: '端口数据更新成功'
        });
    } else {
        res.json({
            success: false,
            error: '保存数据失败'
        });
    }
});

// API接口：删除端口数据
app.delete('/api/ports/:id', (req, res) => {
    const { id } = req.params;
    
    const data = getData();
    const portIndex = data.ports.findIndex(p => p.id === id);
    
    if (portIndex === -1) {
        return res.json({
            success: false,
            error: '端口数据不存在'
        });
    }
    
    data.ports.splice(portIndex, 1);
    
    if (saveData(data)) {
        res.json({
            success: true,
            message: '端口数据删除成功'
        });
    } else {
        res.json({
            success: false,
            error: '保存数据失败'
        });
    }
});

// API接口：自定义IP地址处理
app.post('/api/custom-ip', (req, res) => {
    const { ipAddress, includePort } = req.body;
    
    if (!ipAddress) {
        return res.json({
            success: false,
            error: '请输入IP地址'
        });
    }
    
    // 简单的IP地址格式验证
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
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
        url: url
    });
});

// 启动服务器
app.listen(PORT, () => {
    const localIPs = getLocalIPAddress();
    console.log(`服务器已启动在 http://localhost:${PORT}`);
    console.log('');
    console.log('真实内网IP地址（请使用这些地址进行实际连接）：');
    localIPs.forEach(ip => {
        console.log(`http://${ip}:${PORT}`);
    });
    console.log('');
    console.log('模拟IP地址（仅供参考）：');
    mockIPs.forEach(ip => {
        console.log(`http://${ip}:${PORT}`);
    });
});