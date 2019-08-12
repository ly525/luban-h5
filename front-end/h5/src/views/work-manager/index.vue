<script>
// import PreView from '@/pages/preview';
// import Sidebar from './components/sidebar.vue'
import '@/components/core/styles/index.scss'

const sidebarMenus = [
  {
    label: '我的作品',
    value: 'workManager',
    antIcon: 'bars',
    key: '1'
  },
  {
    label: '数据中心',
    value: 'dataCenter',
    antIcon: 'snippets',
    key: '2',
    children: [
      {
        label: '基础数据',
        value: 'basicData',
        antIcon: 'snippets',
        key: '2-1',
        routerName: 'form-stat'
      },
      {
        label: '表单统计',
        value: 'formData',
        antIcon: 'snippets',
        key: '2-2'
      }
    ]
  },
  {
    label: '模板中心',
    value: 'templateCenter',
    antIcon: 'snippets',
    key: '3',
    children: [
      {
        label: '免费模板',
        value: 'freeTemplates',
        antIcon: 'snippets',
        key: '3-1'
      }
    ]
  },
  {
    label: '账号中心',
    value: 'freeTemplate',
    antIcon: 'appstore',
    key: '4'
  }
]

export default {
  components: {
    // PreView,
    // Sidebar
  },
  render (h) {
    return (
      <a-layout id="luban-work-manager-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <div class="logo">鲁班 H5</div>
          {/* TODO we can show the plugins shortcuts here */}
          <a-dropdown style={{ float: 'right', background: 'transparent', margin: '16px 28px 16px 0' }}>
            <a-menu slot="overlay" onClick={() => {}}>
              <a-menu-item key="1">
                <span>someone@luban</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2"><a-icon type="setting" />账号设置</a-menu-item>
              <a-menu-item key="3"><a-icon type="logout" />退出登录</a-menu-item>
            </a-menu>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-dropdown>
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="160" style="background: #fff">
            <a-menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['1', '2', '3']}
              style="height: 100%"
            >
              {
                sidebarMenus.map(menu => (
                  menu.children
                    ? <a-sub-menu key={menu.key}>
                      <span slot="title"><a-icon type={menu.antIcon} />{menu.label}</span>
                      {
                        (menu.children).map(submenu => (
                          <a-menu-item key={submenu.key}>
                            { submenu.routerName ? <router-link to={{ name: submenu.routerName }}>{submenu.label}</router-link> : submenu.label }
                          </a-menu-item>
                        ))
                      }
                    </a-sub-menu>
                    : <a-menu-item key={menu.key}>
                      <a-icon type={menu.antIcon} />
                      <span>{menu.label}</span>
                    </a-menu-item>
                ))
              }
            </a-menu>
          </a-layout-sider>
          <a-layout style="padding: 0 24px 24px">
            <a-layout-content style={{ padding: '24px', margin: 0, minHeight: '280px' }}>
              <router-view />
            </a-layout-content>
          </a-layout>
        </a-layout>
        {/** <PreviewDialog visible={this.previewVisible} handleClose={() => { this.previewVisible = false }} /> */}
      </a-layout>)
  }
}
</script>
