// 端口管理模块 - 路由
const express = require('express');
const router = express.Router();
const PortController = require('./port.controller');
const authMiddleware = require('../../src/middlewares/auth');

// 应用认证中间件（可选，根据需要启用）
// router.use(authMiddleware.authenticate);

// 端口管理API路由
router.get('/api/ports', PortController.getAllPorts);
router.post('/api/ports', PortController.addPort);
router.put('/api/ports/:id', PortController.updatePort);
router.delete('/api/ports/:id', PortController.deletePort);

module.exports = router;