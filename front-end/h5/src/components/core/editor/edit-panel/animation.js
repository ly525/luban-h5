import { mapState } from 'vuex'
import { animationOptions, animationValue2Name, firstLevelAnimationOptions } from '@/constants/animation.js'

export default {
  computed: {
    ...mapState('editor', ['editingElement']),
    animationQueue () {
      return (this.editingElement && this.editingElement.animations) || []
    }
  },
  data: () => ({
    // animationQueue: [],
    activeCollapsePanel: 0,
    activePreviewAnimation: '',
    drawerVisible: false
  }),
  methods: {
    addAnimation () {
      // TODO move this to vuex
      this.animationQueue.push({
        type: '',
        duration: 1,
        delay: 0,
        interationCount: 1,
        infinite: false
      })
      this.activeCollapsePanel = this.animationQueue.length - 1
    },
    deleteAnimate (index) {
      // TODO move this to vuex
      this.animationQueue.splice(index, 1)
    },
    runAnimate () {
      // front-end/h5/src/components/core/editor/index.js created()
      window.getEditorApp.$emit('RUN_ANIMATIONS')
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
                        onClick={(e) => {
                          // TODO move this to vuex mutation
                          this.editingElement.animations[this.activeCollapsePanel].type = item.value
                        }}
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
          // tabBarStyle={{}}
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
    renderAnimationOptions (animationOption) {
      return (
        <a-form layout="horizontal">
          <a-form-item label={this.$t('editor.editPanel.animation.type')} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }}>
            {/* <a-popover placement="left" title="动画列表" trigger="click">
              <template slot="content">
                {this.renderAvaiableAnimations()}
              </template>
              <a-button type="primary">动画列表</a-button>
            </a-popover> */}
            {/* 动画列表 */}
            <a-button type="link" size="small" icon="ordered-list" onClick={() => { this.drawerVisible = true }}>{this.$t('editor.editPanel.animation.list')}</a-button>
          </a-form-item>
          <a-form-item label={this.$t('editor.editPanel.animation.duration')} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </a-form-item>
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '4px' }}>
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.duration}
                onChange={value => {
                  animationOption.duration = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item label={this.$t('editor.editPanel.animation.delay')} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </a-form-item>
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '4px' }}>
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}秒(s)`}
                value={animationOption.delay}
                onChange={value => {
                  animationOption.delay = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item label={this.$t('editor.editPanel.animation.iteration')} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <a-slider
                defaultValue={2}
                min={0}
                max={20}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </a-form-item>
            <a-form-item style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '4px' }}>
              <a-input-number
                min={0}
                max={20}
                size="small"
                formatter={value => `${value}次(times)`}
                value={animationOption.interationCount}
                onChange={value => {
                  animationOption.interationCount = value
                }}
              />
            </a-form-item>
          </a-form-item>
          <a-form-item label={this.$t('editor.editPanel.animation.inifinite')} labelCol={{ span: 5 }} wrapperCol={{ span: 16, offset: 2 }} style="margin-bottom:0;">
            <a-switch
              value={animationOption.infinite}
              onChange={value => {
                animationOption.infinite = value
              }}
            />
          </a-form-item>
        </a-form>
      )
    }
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return (
      <div class="main-animate widget" id="animation-edit-panel">
        <a-button-group>
          {/* 添加动画、运行动画 */}
          <a-button type="primary" onClick={this.addAnimation}><a-icon type="plus" />{this.$t('editor.editPanel.animation.add')}</a-button>
          <a-button type="primary" onClick={this.runAnimate}>{this.$t('editor.editPanel.animation.run')}<a-icon type="right-circle" /></a-button>
        </a-button-group>
        {
          // Q：这边为何这样写：this.animationQueue.length && ?
          // A：如果这样写的话，当 length === 0，的时候，0会显示在 UI 上
          !!this.animationQueue.length &&
          <a-collapse
            accordion
            class="collapse-wrapper"
            activeKey={'' + this.activeCollapsePanel}
            onChange={(key) => {
              // 当全部收起来时候，key 为 undefined
              this.activeCollapsePanel = typeof key !== 'undefined' ? +key : -1
            }}
          >
            {
              this.animationQueue.map((addedAnimation, index) => (
                <a-collapse-panel key={`${index}`}>
                  <template slot="header">
                    {/* #!zh: 动画{index + 1} */}
                    {/* #!en: Animation{index + 1}</span> */}
                    <span>{this.$t('editor.editPanel.animation.title', { index: index + 1 })}</span>
                    <a-tag color="orange">{animationValue2Name[addedAnimation.type] || addedAnimation.type }</a-tag>
                    <a-icon type="delete" onClick={() => this.deleteAnimate(index)} title="删除动画"></a-icon>
                  </template>
                  {this.renderAnimationOptions(addedAnimation)}
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
