// 认证模块 - 路由
const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const authMiddleware = require('../../src/middlewares/auth');

// 公共路由
router.post('/api/login', AuthController.login);
router.post('/api/logout', AuthController.logout);
router.post('/api/auth/logout', AuthController.logout); // 支持前端使用的路径

// 需要认证的路由
router.get('/api/user', authMiddleware.authenticate, AuthController.getCurrentUser);
router.get('/api/auth/current', authMiddleware.authenticate, AuthController.getCurrentUser); // 支持前端使用的路径
router.post('/api/register', authMiddleware.authenticate, AuthController.register);
router.post('/api/auth/change-password', authMiddleware.authenticate, AuthController.changePassword); // 更改密码路由

module.exports = router;