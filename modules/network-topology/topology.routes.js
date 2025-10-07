// 网络拓扑模块 - 路由
const express = require('express');
const router = express.Router();
const NetworkTopologyController = require('./topology.controller');
const authMiddleware = require('../../src/middlewares/auth');

// 应用认证中间件（可选，根据需要启用）
// router.use(authMiddleware.authenticate);

// 网络拓扑API路由
router.get('/api/network/topology', NetworkTopologyController.getTopology);
router.get('/api/network/stats', NetworkTopologyController.getNetworkStats);

module.exports = router;