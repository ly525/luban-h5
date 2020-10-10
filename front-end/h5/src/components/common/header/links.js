/**
 * #!zh: 导航条上的通用外链：文档、交流群、GitHub
 * #!en: common external links on headers: Document、Discussion、GitHub
 */

export default {
  render () {
    return (
      <a-menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', display: 'inline-block' }}
      >
        <a-menu-item key="dingtalk" >
          <a-popover title="👨🏻‍💻👩🏻‍💻欢迎加入鲁班-H5交流群">
            <template slot="content">
              <p>For users in other languages(not zh-CN), <br />please keep using Github issue tracker. 🤟 </p>
              <p>扫描二维码加入 钉钉 讨论组</p>
              <img src="https://user-images.githubusercontent.com/12668546/61447488-a379f700-a983-11e9-9956-139352a2585d.png" width="200" />
              <p>因为微信群二维码会过期，<br />请前往<a href="https://github.com/ly525/luban-h5/issues/57" target="_blank" rel="noopener">微信群和QQ群</a> 查看</p>
            </template>
            <span style={{ color: 'white', lineHeight: '64px', height: '64px', display: 'inline-block' }}><a-icon type="qrcode" />{this.$t('header.chat')}</span>
          </a-popover>
        </a-menu-item>
        <a-menu-item key="document">
          {/* <a href="https://ly525.github.io/luban-h5" target="_blank" rel="noopener" style={{ color: 'white' }}><a-icon type="read" />文档</a> */}
          <a href="https://ly525.github.io/luban-h5/zh/" target="_blank" rel="noopener" style={{ color: 'white' }}><a-icon type="read" />{this.$t('header.chineseDocument')}</a>
        </a-menu-item>
        <a-menu-item key="document-en">
          <a href="https://ly525.github.io/luban-h5" target="_blank" rel="noopener" style={{ color: 'white' }}><a-icon type="read" />Document(En)</a>
        </a-menu-item>
        <a-menu-item key="gitee">
          <a href="https://gitee.com/ly525/luban-h5" target="_blank" rel="noopener" style={{ color: 'white' }}>Gitee</a>
        </a-menu-item>
        <a-menu-item key="github">
          <a href="https://github.com/ly525/luban-h5" target="_blank" rel="noopener" style={{ color: 'white' }}><a-icon type="github" />Github</a>
        </a-menu-item>
      </a-menu>
    )
  }
}
