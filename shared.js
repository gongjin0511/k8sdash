// 共享的侧边栏 HTML 模板
function getSidebarHTML(activePage) {
    return `
        <aside class="ks-sidebar">
            <div class="ks-sidebar-header">
                <a href="index.html" class="ks-sidebar-logo">
                    <div class="ks-sidebar-logo-icon">KS</div>
                    <span class="ks-sidebar-logo-text">KubeSphere</span>
                </a>
            </div>
            <nav class="ks-sidebar-nav">
                <div class="ks-sidebar-section">
                    <a href="index.html" class="ks-sidebar-item ${activePage === 'index' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        <span class="ks-sidebar-item-text">工作台</span>
                    </a>
                </div>

                <div class="ks-sidebar-section">
                    <div class="ks-sidebar-section-title">集群管理</div>
                    <a href="cluster.html" class="ks-sidebar-item ${activePage === 'cluster' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        <span class="ks-sidebar-item-text">集群概览</span>
                    </a>
                    <a href="nodes.html" class="ks-sidebar-item ${activePage === 'nodes' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                        <span class="ks-sidebar-item-text">节点管理</span>
                    </a>
                </div>

                <div class="ks-sidebar-section">
                    <div class="ks-sidebar-section-title">应用负载</div>
                    <div class="ks-sidebar-item ${['workloads', 'statefulsets', 'daemonsets', 'jobs', 'cronjobs', 'pods'].includes(activePage) ? 'expanded' : ''}" onclick="toggleSubmenu(this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        <span class="ks-sidebar-item-text">工作负载</span>
                        <svg class="ks-sidebar-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                    <div class="ks-sidebar-submenu ${['workloads', 'statefulsets', 'daemonsets', 'jobs', 'cronjobs', 'pods'].includes(activePage) ? 'open' : ''}">
                        <a href="workloads.html" class="ks-sidebar-item ${activePage === 'workloads' ? 'active' : ''}">Deployments</a>
                        <a href="statefulsets.html" class="ks-sidebar-item ${activePage === 'statefulsets' ? 'active' : ''}">StatefulSets</a>
                        <a href="daemonsets.html" class="ks-sidebar-item ${activePage === 'daemonsets' ? 'active' : ''}">DaemonSets</a>
                        <a href="jobs.html" class="ks-sidebar-item ${activePage === 'jobs' ? 'active' : ''}">Jobs</a>
                        <a href="cronjobs.html" class="ks-sidebar-item ${activePage === 'cronjobs' ? 'active' : ''}">CronJobs</a>
                        <a href="pods.html" class="ks-sidebar-item ${activePage === 'pods' ? 'active' : ''}">Pods</a>
                    </div>
                    <div class="ks-sidebar-item ${['services', 'ingresses', 'networkpolicies'].includes(activePage) ? 'expanded' : ''}" onclick="toggleSubmenu(this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        <span class="ks-sidebar-item-text">服务与网络</span>
                        <svg class="ks-sidebar-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                    <div class="ks-sidebar-submenu ${['services', 'ingresses', 'networkpolicies'].includes(activePage) ? 'open' : ''}">
                        <a href="services.html" class="ks-sidebar-item ${activePage === 'services' ? 'active' : ''}">Services</a>
                        <a href="ingresses.html" class="ks-sidebar-item ${activePage === 'ingresses' ? 'active' : ''}">Ingresses</a>
                        <a href="networkpolicies.html" class="ks-sidebar-item ${activePage === 'networkpolicies' ? 'active' : ''}">网络策略</a>
                    </div>
                </div>

                <div class="ks-sidebar-section">
                    <div class="ks-sidebar-section-title">存储管理</div>
                    <a href="storage.html" class="ks-sidebar-item ${activePage === 'storage' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                        <span class="ks-sidebar-item-text">存储卷 (PVC)</span>
                    </a>
                    <a href="storageclasses.html" class="ks-sidebar-item ${activePage === 'storageclasses' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        <span class="ks-sidebar-item-text">存储类</span>
                    </a>
                </div>

                <div class="ks-sidebar-section">
                    <div class="ks-sidebar-section-title">配置中心</div>
                    <a href="configmaps.html" class="ks-sidebar-item ${activePage === 'configmaps' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                        <span class="ks-sidebar-item-text">ConfigMaps</span>
                    </a>
                    <a href="secrets.html" class="ks-sidebar-item ${activePage === 'secrets' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span class="ks-sidebar-item-text">Secrets</span>
                    </a>
                </div>

                <div class="ks-sidebar-section">
                    <div class="ks-sidebar-section-title">监控告警</div>
                    <a href="monitoring.html" class="ks-sidebar-item ${activePage === 'monitoring' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        <span class="ks-sidebar-item-text">监控中心</span>
                    </a>
                    <a href="alerts.html" class="ks-sidebar-item ${activePage === 'alerts' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span class="ks-sidebar-item-text">告警管理</span>
                    </a>
                    <a href="events.html" class="ks-sidebar-item ${activePage === 'events' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        <span class="ks-sidebar-item-text">事件日志</span>
                    </a>
                </div>
            </nav>
        </aside>
    `;
}

// 共享的顶部导航栏模板
function getHeaderHTML(breadcrumbs) {
    const breadcrumbHTML = breadcrumbs.map((item, index) => {
        if (index === breadcrumbs.length - 1) {
            return `<span class="ks-breadcrumb-current">${item.text}</span>`;
        }
        return `<a href="${item.href}">${item.text}</a><span class="ks-breadcrumb-separator">/</span>`;
    }).join('');

    return `
        <header class="ks-header">
            <div class="ks-breadcrumb">${breadcrumbHTML}</div>
            <div class="ks-header-right">
                <div class="ks-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="搜索资源...">
                </div>
                <div class="ks-header-icon" title="通知">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div class="ks-header-icon" title="设置">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
                <div class="ks-user">
                    <div class="ks-user-avatar">A</div>
                    <span class="ks-user-name">admin</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
            </div>
        </header>
    `;
}

// 切换子菜单
function toggleSubmenu(element) {
    element.classList.toggle('expanded');
    const submenu = element.nextElementSibling;
    if (submenu && submenu.classList.contains('ks-sidebar-submenu')) {
        submenu.classList.toggle('open');
    }
}

// 切换 Tab
function switchTab(element) {
    document.querySelectorAll('.ks-tab').forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');
}
