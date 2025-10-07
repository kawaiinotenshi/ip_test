# 内网数据管理项目学习指南

## 适合小白的Web开发入门指南

このガイドはWeb開発初心者の方々のために作成されました。
This guide is created for beginners in web development.

## 目录 / 目次

1. [基础概念](#基础概念)
2. [项目结构](#项目结构)
3. [HTML基础知识](#html基础知识)
4. [CSS样式入门](#css样式入门)
5. [JavaScript基础](#javascript基础)
6. [Node.js服务器](#nodejs服务器)
7. [RESTful API简介](#restful-api简介)
8. [数据持久化](#数据持久化)
9. [响应式设计](#响应式设计)
10. [多语言支持](#多语言支持)

## 基础概念

### 什么是IP地址？
IP地址是网络上设备的唯一标识符，类似于家庭住址。内网IP是局域网内设备的地址，如192.168.x.x或10.x.x.x。

### 什么是端口？
端口是设备与外界通信的"门"，每个服务通常使用特定的端口号，如HTTP服务默认使用80端口。

## 项目结构

```
ip_test/
├── public/               # 静态文件目录
│   ├── index.html        # 主页面
│   └── styles.css        # 样式文件
├── server.js             # 服务器端代码
├── data.json             # 数据存储文件
├── package.json          # 项目配置和依赖
├── README.md             # 项目说明文档
└── LEARN_GUIDE.md        # 学习指南（当前文件）
```

## HTML基础知识

HTML是用来创建网页结构的标记语言。

### 基本结构
```html
<!DOCTYPE html>
<html lang="ja">  <!-- 语言属性 -->
<head>
    <meta charset="UTF-8">  <!-- 字符编码 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- 响应式设置 -->
    <title>标题</title>  <!-- 页面标题 -->
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 常用标签
- `<div>`: 容器元素，用于分组
- `<h1>到<h6>`: 标题标签
- `<p>`: 段落
- `<button>`: 按钮
- `<input>`: 输入框
- `<table>`: 表格
- `<ul>`, `<ol>`, `<li>`: 列表

## CSS样式入门

CSS用于美化网页，定义元素的外观。

### 基础语法
```css
选择器 {
    属性: 值;
}
```

### 常用选择器
- 元素选择器: `div`, `p`, `button`
- ID选择器: `#id名称`
- 类选择器: `.class名称`

### 常用属性
- `color`: 文字颜色
- `background-color`: 背景颜色
- `font-size`: 字体大小
- `margin`: 外边距
- `padding`: 内边距
- `border`: 边框

## JavaScript基础

JavaScript是编程语言，使网页具有交互性。

### 变量声明
```javascript
let 变量名 = 值;  // 可变变量
const 常量名 = 值;  // 不可变常量
```

### 函数定义
```javascript
function 函数名(参数1, 参数2) {
    // 函数体
    return 结果;
}

// 箭头函数（现代JavaScript）
const 函数名 = (参数1, 参数2) => {
    // 函数体
};
```

### 事件处理
```javascript
// 给按钮添加点击事件
document.getElementById('buttonId').addEventListener('click', function() {
    // 点击后执行的代码
});
```

### Ajax请求
```javascript
// 获取数据
fetch('/api/endpoint')
    .then(response => response.json())
    .then(data => {
        // 处理返回的数据
    })
    .catch(error => {
        console.error('错误:', error);
    });

// 发送数据
fetch('/api/endpoint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(数据对象)
})
.then(response => response.json())
.then(data => {
    // 处理响应
});
```

## Node.js服务器

Node.js允许使用JavaScript运行服务器端代码。

### 创建简单服务器
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
});

server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### Express框架
本项目使用Express，一个流行的Node.js框架：

```javascript
const express = require('express');
const app = express();

// 静态文件服务
app.use(express.static('public'));

// 启动服务器
app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

## RESTful API简介

RESTful API是一种设计网络接口的方式，使用HTTP方法进行操作。

### 基本HTTP方法
- `GET`: 获取数据
- `POST`: 创建新数据
- `PUT`: 更新现有数据
- `DELETE`: 删除数据

### 示例API端点
```javascript
// 获取所有端口数据
app.get('/api/ports', (req, res) => {
    res.json(portsData);
});

// 添加新端口
app.post('/api/ports', (req, res) => {
    const newPort = req.body;
    portsData.push(newPort);
    res.status(201).json(newPort);
});
```

## 数据持久化

数据持久化是将数据保存到磁盘，使程序重启后数据不丢失。

### 使用fs模块
```javascript
const fs = require('fs');

// 读取数据
function readData() {
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
}

// 保存数据
function saveData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}
```

## 响应式设计

响应式设计使网站在不同设备上（电脑、平板、手机）都能良好显示。

### 媒体查询
```css
/* 在小屏幕设备上的样式 */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    .button-group {
        flex-direction: column;
    }
}
```

### Flex布局
```css
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
```

## 多语言支持

多语言支持使网站可以显示多种语言内容。

### 简单实现方法
```html
<!-- HTML中标记可翻译内容 -->
<h1 class="i18n" data-ja="タイトル" data-en="Title">タイトル</h1>

<script>
// 语言切换函数
function changeLanguage(language) {
    document.querySelectorAll('.i18n').forEach(element => {
        element.textContent = element.dataset[language];
    });
    currentLanguage = language;
}
</script>
```

## 实践建议

1. **从小处开始**：先理解基础概念，再逐步学习更复杂的内容
2. **多动手实践**：修改现有代码，观察效果变化
3. **查看浏览器控制台**：F12打开开发者工具，查看错误信息
4. **参考官方文档**：需要详细信息时，查阅相关技术的官方文档
5. **搜索引擎是你的朋友**：遇到问题时，多搜索解决方案

祝学习愉快！

---

学習を始めるには、まず基本的なHTML、CSS、JavaScriptの概念を理解することをお勧めします。次に、Node.jsとExpressを使った簡単なサーバーを作成し、APIを実装してみましょう。

Good luck with your web development journey!