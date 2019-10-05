import './gallery.scss'
import PersonalTab from './tabs/personal.js'
import PixabayTab from './tabs/pixabay.js'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tabs: [
      {
        value: 'personal',
        label: '我的图库'
      },
      {
        value: 'pixabay',
        label: 'Pixabay图库'
      }
    ],
    activeTab: 'personal',
    innerVisible: false,
    pixabayList: []
  }),
  computed: {
  },
  watch: {
    visible (value) {
      this.innerVisible = value
    }
  },
  methods: {
    handleClose () {
      this.innerVisible = false
    },
    changeTab ({ key }) {
      this.activeTab = key
    },
    handleSelectImage (item) {
      this.handleClose()
      this.$emit('change', item.previewURL)
    },
    renderContent () {
      switch (this.activeTab) {
        case 'personal':
          return <PersonalTab onChangeItem={item => {
            this.handleSelectImage(item)
          }}/>
        case 'pixabay':
          return <PixabayTab onChange={item => {
            this.handleSelectImage(item)
          }}/>
      }
    },
    renderDefaultActivator () {
      const activatorWithoutImg = (
        <div
          class="default-activator cursor-pointer "
          onClick={() => { this.innerVisible = true }}
        >
          <a-icon type="plus" />
        </div>
      )

      const activatorWithImg = (
        <div
          class="default-activator cursor-pointer "
          onClick={() => { this.innerVisible = true }}
        >
          <img src={this.value} style={{ width: '100%' }} />
          <div class="flex-space-between" style="margin-top: 8px;">
            <a-button>更换图片</a-button>
            <a-button onClick={e => {
              e.stopPropagation()
            }}>裁剪图片</a-button>
          </div>
        </div>
      )
      return (this.value ? activatorWithImg : activatorWithoutImg)
    }
  },
  render (h) {
    return (
      <div>
        <slot>{this.renderDefaultActivator()}</slot>
        <a-modal
          closable
          title="图片库"
          width="65%"
          visible={this.innerVisible}
          onOk={this.handleClose}
          onCancel={this.handleClose}
          bodyStyle={{ margin: 0, padding: 0 }}
        >
          <a-layout style="height: 500px; position: relative;">
            <a-layout-sider width="200px" style="background-color: white;">
              <a-menu mode="inline" defaultSelectedKeys={['personal']} onClick={this.changeTab}>
                {
                  this.tabs.map((tab, index) => (
                    <a-menu-item key={tab.value} >
                      <a-icon type="user" />
                      <span>{tab.label}</span>
                    </a-menu-item>
                  ))
                }
              </a-menu>
            </a-layout-sider>
            <a-layout-content>
              {this.renderContent()}
            </a-layout-content>
          </a-layout>
        </a-modal>
      </div>
    )
  }
}
