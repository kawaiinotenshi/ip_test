// 设备监控模块 - 路由
const express = require('express');
const router = express.Router();
const DeviceController = require('./device.controller');
const authMiddleware = require('../../src/middlewares/auth');

// 应用认证中间件（可选，根据需要启用）
// router.use(authMiddleware.authenticate);

// 设备监控API路由
router.get('/api/devices', DeviceController.getAllDevices);
router.get('/api/devices/:id', DeviceController.getDevice);
router.post('/api/devices', DeviceController.addDevice);
router.put('/api/devices/:id', DeviceController.updateDevice);
router.delete('/api/devices/:id', DeviceController.deleteDevice);
router.get('/api/devices/status/:ip_address', DeviceController.checkDeviceStatus);

module.exports = router;