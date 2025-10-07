// Translation object
const translations = {
    en: {
        "sidebar.title": "<i class=\"fas fa-network-wired\"></i> Intranet Management",
        "sidebar.subtitle": "Modular Management Platform",
        "sidebar.mainFeatures": "Main Features",
        "sidebar.dashboard": "Dashboard",
        "sidebar.devices": "Device Management",
        "sidebar.ports": "Port Management",
        "sidebar.network": "Network Topology",
        "sidebar.systemSettings": "System Settings",
        "sidebar.users": "User Management",
        "sidebar.settings": "System Settings",
        "sidebar.logout": "Logout",
        "sidebar.userInfo": "Admin",
        "page.dashboard": "Dashboard",
        "stats.onlineDevices": "Online Devices",
        "stats.availablePorts": "Available Ports",
        "stats.alerts": "Abnormal Alerts",
        "stats.activeUsers": "Active Users",
        "stats.increase": "increase",
        "stats.decrease": "decrease",
        "network.topology": "Network Topology",
        "actions.refresh": "Refresh",
        "actions.export": "Export",
        "actions.add": "Add",
        "devices.title": "Device Management",
        "devices.name": "Device Name",
        "devices.ipAddress": "IP Address",
        "devices.type": "Device Type",
        "devices.status": "Status",
        "devices.lastOnline": "Last Online",
        "common.actions": "Actions",
        "common.loading": "Loading...",
        "status.online": "Online",
        "status.offline": "Offline",
        "status.warning": "Warning",
        "actions.view": "View",
        "actions.edit": "Edit",
        "actions.delete": "Delete",
        "messages.logoutSuccess": "Logged out successfully",
        "messages.logoutError": "Logout failed",
        "messages.passwordChanged": "Password changed successfully",
        "messages.passwordError": "Password change failed",
        "messages.passwordLength": "Password must be at least 6 characters",
        "messages.passwordMatch": "Passwords do not match",
        "user.role.admin": "Administrator",
        "user.role.user": "User",
        "form.addPort": "Add Port",
        "form.addUser": "Add User",
        "form.submit": "Submit",
        "form.cancel": "Cancel",
        "form.portNumber": "Port Number",
        "form.portDevice": "Device",
        "form.portDescription": "Description",
        "form.username": "Username",
        "form.password": "Password",
        "form.role": "Role",
        "form.confirmPassword": "Confirm Password"
    },
    ja: {
        "sidebar.title": "<i class=\"fas fa-network-wired\"></i> イントラネット管理",
        "sidebar.subtitle": "モジュール管理プラットフォーム",
        "sidebar.mainFeatures": "主要機能",
        "sidebar.dashboard": "ダッシュボード",
        "sidebar.devices": "デバイス管理",
        "sidebar.ports": "ポート管理",
        "sidebar.network": "ネットワークトポロジ",
        "sidebar.systemSettings": "システム設定",
        "sidebar.users": "ユーザー管理",
        "sidebar.settings": "システム設定",
        "sidebar.logout": "ログアウト",
        "sidebar.userInfo": "管理者",
        "page.dashboard": "ダッシュボード",
        "stats.onlineDevices": "オンラインデバイス",
        "stats.availablePorts": "利用可能ポート",
        "stats.alerts": "異常警告",
        "stats.activeUsers": "アクティブユーザー",
        "stats.increase": "増加",
        "stats.decrease": "減少",
        "network.topology": "ネットワークトポロジ",
        "actions.refresh": "更新",
        "actions.export": "エクスポート",
        "actions.add": "追加",
        "devices.title": "デバイス管理",
        "devices.name": "デバイス名",
        "devices.ipAddress": "IPアドレス",
        "devices.type": "デバイスタイプ",
        "devices.status": "ステータス",
        "devices.lastOnline": "最終オンライン",
        "common.actions": "アクション",
        "common.loading": "読み込み中...",
        "status.online": "オンライン",
        "status.offline": "オフライン",
        "status.warning": "警告",
        "actions.view": "表示",
        "actions.edit": "編集",
        "actions.delete": "削除",
        "messages.logoutSuccess": "正常にログアウトしました",
        "messages.logoutError": "ログアウトに失敗しました",
        "messages.passwordChanged": "パスワードが正常に変更されました",
        "messages.passwordError": "パスワードの変更に失敗しました",
        "messages.passwordLength": "パスワードは少なくとも6文字必要です",
        "messages.passwordMatch": "パスワードが一致しません",
        "user.role.admin": "管理者",
        "user.role.user": "ユーザー",
        "form.addPort": "ポートを追加",
        "form.addUser": "ユーザーを追加",
        "form.submit": "送信",
        "form.cancel": "キャンセル",
        "form.portNumber": "ポート番号",
        "form.portDevice": "デバイス",
        "form.portDescription": "説明",
        "form.username": "ユーザー名",
        "form.password": "パスワード",
        "form.role": "役割",
        "form.confirmPassword": "パスワードを確認"
    }
};

// Current language
let currentLang = 'en';

// Initialize internationalization
function initI18n() {
    // Check if language switcher already exists (added via HTML), if not create it
    let langSwitcher = document.querySelector('.language-switcher');
    if (!langSwitcher) {
        langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        langSwitcher.innerHTML = `
            <button class="lang-btn active" data-lang="en">English</button>
            <button class="lang-btn" data-lang="ja">日本語</button>
        `;
        document.body.appendChild(langSwitcher);
    }
    
    // Add CSS for language switcher if not already added
    if (!document.querySelector('style[data-language-switcher]')) {
        const style = document.createElement('style');
        style.setAttribute('data-language-switcher', 'true');
        style.textContent = `
            .language-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                z-index: 1000;
            }
            
            .lang-btn {
                background: var(--card-bg, #ffffff);
                border: 1px solid var(--border, #e0e0e0);
                color: var(--text-secondary, #757575);
                padding: 6px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
            }
            
            .lang-btn:hover {
                background: rgba(33, 150, 243, 0.1);
                border-color: #2196F3;
            }
            
            .lang-btn.active {
                background: #2196F3;
                color: white;
                border-color: #1976D2;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        // Remove existing event listeners to avoid duplication
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function() {
            switchLanguage(this.getAttribute('data-lang'));
        });
    });
    
    // Add data-i18n attributes to all text elements that don't have them yet
    addI18nAttributes();
    
    // Try to load preferred language from localStorage, otherwise use browser language or default to English
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0]; // Get first part of language code (e.g., 'en' from 'en-US')
    
    // Set initial language
    let initialLang = 'en';
    if (savedLang && translations[savedLang]) {
        initialLang = savedLang;
    } else if (browserLang && translations[browserLang]) {
        initialLang = browserLang;
    }
    
    // Update currentLang and activate the correct button
    currentLang = initialLang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[data-lang="${initialLang}"]`).classList.add('active');
    
    // Initialize page with the selected language
    updateTranslations(initialLang);
    updateDynamicContent();
}

// Add data-i18n attributes to text elements
function addI18nAttributes() {
    // This function maps selectors to their i18n keys
    const mappings = {
        '.sidebar-header h1': 'sidebar.title',
        '.sidebar-header p': 'sidebar.subtitle',
        '.menu-title:nth-child(1)': 'sidebar.mainFeatures',
        '.menu-item:nth-child(1)': 'sidebar.dashboard',
        '.menu-item:nth-child(2)': 'sidebar.devices',
        '.menu-item:nth-child(3)': 'sidebar.ports',
        '.menu-item:nth-child(4)': 'sidebar.network',
        '.menu-title:nth-child(6)': 'sidebar.systemSettings',
        '.menu-item:nth-child(7)': 'sidebar.users',
        '.menu-item:nth-child(8)': 'sidebar.settings',
        '.logout-btn span': 'sidebar.logout',
        '.user-details .user-name': 'sidebar.userInfo',
        '#pageTitle': 'page.dashboard',
        '.stat-card:nth-child(1) .stat-label': 'stats.onlineDevices',
        '.stat-card:nth-child(2) .stat-label': 'stats.availablePorts',
        '.stat-card:nth-child(3) .stat-label': 'stats.alerts',
        '.stat-card:nth-child(4) .stat-label': 'stats.activeUsers',
        '.stat-card .stat-change.increase': 'stats.increase',
        '.stat-card .stat-change.decrease': 'stats.decrease',
        '#network-topology .card-title': 'network.topology',
        '#device-management .card-title': 'devices.title',
        '#refresh-topology span': 'actions.refresh',
        '#export-topology span': 'actions.export',
        '#add-device span': 'actions.add',
        '#device-table th:nth-child(1)': 'devices.name',
        '#device-table th:nth-child(2)': 'devices.ipAddress',
        '#device-table th:nth-child(3)': 'devices.type',
        '#device-table th:nth-child(4)': 'devices.status',
        '#device-table th:nth-child(5)': 'devices.lastOnline',
        '#device-table th:nth-child(6)': 'common.actions',
        '.loading': 'common.loading',
        '.status-online': 'status.online',
        '.status-offline': 'status.offline',
        '.status-warning': 'status.warning',
        '.action-view': 'actions.view',
        '.action-edit': 'actions.edit',
        '.action-delete': 'actions.delete',
        '.port-form h3': 'form.addPort',
        '.user-form h3': 'form.addUser',
        '.port-form .btn-primary': 'form.submit',
        '.user-form .btn-primary': 'form.submit',
        '.port-form .btn-secondary': 'form.cancel',
        '.user-form .btn-secondary': 'form.cancel',
        '.port-form [for="portNumber"]': 'form.portNumber',
        '.port-form [for="portDevice"]': 'form.portDevice',
        '.port-form [for="portDescription"]': 'form.portDescription',
        '.user-form [for="username"]': 'form.username',
        '.user-form [for="password"]': 'form.password',
        '.user-form [for="role"]': 'form.role',
        '.user-form [for="confirmPassword"]': 'form.confirmPassword'
    };
    
    Object.entries(mappings).forEach(([selector, key]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Only add data-i18n attribute if it doesn't already exist
            if (!el.getAttribute('data-i18n')) {
                el.setAttribute('data-i18n', key);
            }
        });
    });
}

// Update UI elements with translations
function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // For elements that need HTML content (like those with icons)
            if (key.includes('title') || key === 'sidebar.title' || key === 'sidebar.userInfo') {
                element.innerHTML = translations[lang][key];
            } else {
                // For normal text content
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update page title
    document.title = lang === 'en' ? 'Intranet Management System - Dashboard' : 'イントラネット管理システム - ダッシュボード';
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
    
    // Update translations
    updateTranslations(lang);
    
    // Update any dynamic content
    updateDynamicContent();
    
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Update dynamic content with current language
function updateDynamicContent() {
    // Update status badges
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        if (badge.classList.contains('status-online')) {
            badge.textContent = translations[currentLang]['status.online'];
        } else if (badge.classList.contains('status-offline')) {
            badge.textContent = translations[currentLang]['status.offline'];
        } else if (badge.classList.contains('status-warning')) {
            badge.textContent = translations[currentLang]['status.warning'];
        }
    });
    
    // Update action buttons with icons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        if (btn.classList.contains('action-view')) {
            const icon = btn.querySelector('i') || '';
            btn.innerHTML = icon ? `${icon.outerHTML} ${translations[currentLang]['actions.view']}` : translations[currentLang]['actions.view'];
        } else if (btn.classList.contains('action-edit')) {
            const icon = btn.querySelector('i') || '';
            btn.innerHTML = icon ? `${icon.outerHTML} ${translations[currentLang]['actions.edit']}` : translations[currentLang]['actions.edit'];
        } else if (btn.classList.contains('action-delete')) {
            const icon = btn.querySelector('i') || '';
            btn.innerHTML = icon ? `${icon.outerHTML} ${translations[currentLang]['actions.delete']}` : translations[currentLang]['actions.delete'];
        }
    });
    
    // Update user role text if exists
    const roleElements = document.querySelectorAll('.user-role');
    roleElements.forEach(el => {
        if (el.textContent.trim() === 'Administrator' || el.textContent.trim() === '管理者') {
            el.textContent = translations[currentLang]['user.role.admin'];
        } else if (el.textContent.trim() === 'User' || el.textContent.trim() === 'ユーザー') {
            el.textContent = translations[currentLang]['user.role.user'];
        }
    });
}

// Function to display translated messages
function showMessage(messageKey, type = 'info') {
    // Create message element
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.setAttribute('data-i18n', messageKey);
    message.textContent = translations[currentLang]?.[messageKey] || messageKey;
    
    // Add message to the body
    document.body.appendChild(message);
    
    // Show message with animation
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Run initialization when DOM is loaded
function initializeI18n() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Small delay to ensure all elements are rendered
            setTimeout(initI18n, 100);
        });
    } else {
        // Small delay to ensure all elements are rendered
        setTimeout(initI18n, 100);
    }
}

// Expose functions to the global scope for use in other scripts
window.switchLanguage = switchLanguage;
window.showMessage = showMessage;
window.updateTranslations = updateTranslations;
window.currentLang = currentLang;

// Initialize i18n
initializeI18n();