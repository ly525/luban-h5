import { animationOptions, animationValue2Name, firstLevelAnimationOptions } from '@/constants/animation.js'
import 'animate.css'

export default {
  data: () => ({
    animationQueue: [],
    activeCollapsePanel: [],
    activePreviewAnimation: '',
    drawerVisible: false
  }),
  methods: {
    addAnimation () {
      this.animationQueue.push({
        type: '',
        duration: 0,
        delay: 0,
        countNum: 1,
        infinite: false
      })
      this.activeCollapsePanel = `${this.animationQueue.length - 1}`
    },
    deleteAnimate (index) {
      this.animationQueue.splice(index, 1)
    },
    runAnimate () {
    },
    renderSecondAnimationTabs (animations) {
      return (
        <a-tabs
          defaultActiveKey={animations[0].value}
          onChange={tab => {}}
          style="width:100%;"
          tabBarStyle={{ marginLeft: '-16px' }}
          size="small"
          tabBarGutter={0}
          tabPosition="left"
        >
          {
            animations.map(group => (
              <a-tab-pane tab={group.label || group.value} key={group.value}>
                <a-list
                  grid={{ gutter: 12, column: 2 }}
                  dataSource={group.children}
                  renderItem={(item, index) => (
                    // [key point] onMouseover vs onMouseenter
                    // https://stackoverflow.com/questions/7286532/jquery-mouseenter-vs-mouseover
                    // https://www.quirksmode.org/js/events_mouse.html#mouseenter
                    <a-list-item>
                      <div
                        class={[this.activePreviewAnimation === item.value && item.value + ' animated', 'shortcut-button']}
                        onMouseenter={(e) => {
                          this.activePreviewAnimation = item.value
                        }}
                        onMouseleave={() => {
                          // [key point] why not set activePreviewAnimation='' after mouseleave, see more here: https://stackoverflow.com/questions/32279782/mouseenter-called-multiple-times
                          // this.activePreviewAnimation = ''
                        }}
                      >
                        {item.label}
                      </div>
                    </a-list-item>
                  )}
                >
                </a-list>
              </a-tab-pane>
            ))
          }
        </a-tabs>
      )
    },
    renderAvaiableAnimations () {
      return (
        <a-tabs
          defaultActiveKey={firstLevelAnimationOptions[0].label}
          onChange={tab => {}}
          style="width:100%;"
          tabBarStyle={{}}
          size="small"
          tabBarGutter={0}
        >
          {
            firstLevelAnimationOptions.map(firstGroup => (
              <a-tab-pane tab={firstGroup.label} key={firstGroup.label}>
                {/* group.label.match(firstGroup.value) <-> !!'abc'.match(/a|e/) === true */}
                {this.renderSecondAnimationTabs(animationOptions.filter(group => !!group.label.match(firstGroup.value)))}
              </a-tab-pane>
            ))
          }
        </a-tabs>
      )
    },
    renderAnimationOptions () {
      return (
        <a-form layout="horizontal">
          <a-form-item label="动画类型" labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }}>
            {/* <a-popover placement="left" title="动画列表" trigger="click">
              <template slot="content">
                {this.renderAvaiableAnimations()}
              </template>
              <a-button type="primary">动画列表</a-button>
            </a-popover> */}
            <a-button type="link" size="small" icon="ordered-list" onClick={() => { this.drawerVisible = true }}>动画列表</a-button>
          </a-form-item>
          <a-form-item label="动画时间" labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <a-slider id="test" defaultValue={30} />
            </a-form-item>
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <a-input-number min={1} max={20} size="small" formatter={value => `${value}秒`}/>
            </a-form-item>
          </a-form-item>
          <a-form-item label="循环播放" labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" />
          </a-form-item>
        </a-form>
      )
    }
  },
  render (h) {
    return (
      <div class="main-animate widget" id="animation-edit-panel">
        <a-button-group>
          <a-button type="primary" onClick={this.addAnimation}><a-icon type="plus" />添加动画</a-button>
          <a-button type="primary" onClick={this.runAnimate}>运行动画<a-icon type="right-circle" /></a-button>
        </a-button-group>
        {
          this.animationQueue.length &&
          <a-collapse activeKey={this.activeCollapsePanel} onChange={(val) => { this.activeCollapsePanel = val }} class="collapse-wrapper">
            {
              this.animationQueue.map((addedAnimation, index) => (
                <a-collapse-panel key={`${index}`}>
                  <template slot="header">
                    <span>动画{index + 1}</span>
                    <a-tag color="orange">{animationValue2Name[addedAnimation.type] }</a-tag>
                    {/* <a-icon onClick={this.deleteAnimate(index)}></a-icon> */}
                  </template>
                  {this.renderAnimationOptions()}
                </a-collapse-panel>
              ))
            }
          </a-collapse>
        }

        <a-drawer
          title="请选择动画"
          placement="left"
          closable={true}
          onClose={() => { this.drawerVisible = false }}
          visible={this.drawerVisible}
          width={400}
          wrapStyle={{ margin: '-16px' }}
        >
          <div style="width: 100%;">
            {this.renderAvaiableAnimations()}
          </div>
        </a-drawer>
      </div>
    )
  }
}
