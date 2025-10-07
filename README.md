# イントラネットIPポート管理ツール (Intranet IP Port Management Tool)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A simple yet powerful intranet IP and port management tool for network administrators and developers. ネットワーク管理者や開発者のためのシンプルで強力なイントラネットIPとポート管理ツールです。

## 📋 機能概要 (Features)

- **IP Address Detection**: Automatically detects and displays real intranet IP addresses
- **Port Management**: CRUD operations for port data (Create, Read, Update, Delete)
- **Data Persistence**: Saves port information to local JSON file
- **Mobile-Friendly Interface**: Responsive design for both desktop and mobile devices
- **Dual Language Support**: English and Japanese language interface
- **One-Click Copy**: Easily copy IP addresses with port information

## 🚀 始め方 (Getting Started)

### 前提条件 (Prerequisites)

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### インストール (Installation)

1. Clone the repository
```bash
git clone https://github.com/kawaiinotenshi/ip_test.git
cd ip_test
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Open your browser and visit
```
http://localhost:3000
```

## 📱 使用方法 (How to Use)

1. Connect your mobile device to the same WiFi network as your computer
2. Copy the real intranet IP address from the web interface
3. Paste the IP address into your mobile browser
4. Start managing your ports from anywhere in your network

## 🛠️ 技術スタック (Tech Stack)

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Data Storage**: JSON file
- **Network**: IP address detection

## 📝 プロジェクト構造 (Project Structure)

```
ip_test/
├── data.json          # Port data storage
├── package.json       # Project configuration
├── package-lock.json  # Dependency lock file
├── public/            # Static files
│   └── index.html     # Main frontend interface
└── server.js          # Backend server logic
```

## 🤝 貢献 (Contributing)

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 ライセンス (License)

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 開発者 (Developer)

kawaiinotenshi

---

Made with 💖 for network administrators worldwide!