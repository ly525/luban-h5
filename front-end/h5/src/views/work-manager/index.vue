<script>
// import PreView from '@/pages/preview';
// import Sidebar from './components/sidebar.vue'
import '@/components/core/styles/index.scss'
import LogoOfHeader from '@/components/common/header/logo.js'
import ExternalLinksOfHeader from '@/components/common/header/links.js'

const sidebarMenus = [
  {
    label: '我的作品',
    value: 'workManager',
    antIcon: 'bars',
    key: '1',
    routerName: 'work-manager-list'
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
        key: '3-1',
        routerName: 'work-manager-templates'
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
    LogoOfHeader,
    ExternalLinksOfHeader
  },
  methods: {
    renderSidebar (menus) {
      const renderLabel = menu => menu.routerName ? <router-link to={{ name: menu.routerName }} >{menu.label}</router-link> : menu.label

      return menus.map(menu => (
        menu.children
          ? (
            <a-sub-menu key={menu.key}>
              <span slot="title"><a-icon type={menu.antIcon} />{menu.label}</span>
              {
                (menu.children).map(submenu => (
                  <a-menu-item key={submenu.key}>{renderLabel(submenu)}</a-menu-item>
                ))
              }
            </a-sub-menu>
          )
          : (
            <a-menu-item key={menu.key}>
              <a-icon type={menu.antIcon}></a-icon>
              {/** 这边有个疑惑，不知是否为 antd-vue 的 bug，需要用 span 包裹，否则不会显示 label */}
              <span>{renderLabel(menu)}</span>
            </a-menu-item>
          )
      ))
    }
  },
  render (h) {
    return (
      <a-layout id="luban-work-manager-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <LogoOfHeader />
          {/* TODO we can show the plugins shortcuts here */}
          <a-dropdown style={{ float: 'right', background: 'transparent', margin: '0 28px 16px 0', cursor: 'pointer' }}>
            <a-menu slot="overlay" onClick={() => {}}>
              <a-menu-item key="1">
                <span>someone@luban</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2"><a-icon type="setting" />账号设置</a-menu-item>
              <a-menu-item key="3"><a-icon type="logout" />退出登录</a-menu-item>
            </a-menu>
            <a-menu-item><a-icon type="user" style={{ color: 'white' }} /></a-menu-item>
          </a-dropdown>
          <ExternalLinksOfHeader />
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="160" style="background: #fff">
            <a-menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['1', '2', '3']}
              style="height: 100%"
            >
              {this.renderSidebar(sidebarMenus)}
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
