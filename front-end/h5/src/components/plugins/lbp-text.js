/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-17 21:11:10
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-text.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: luban-h5 text component/plugin
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import PropTypes from '@luban-h5/plugin-common-props'
import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './styles/text-overwrite-quil-snow-theme.scss'
// https://github.com/luban-h5-components/plugin-common-props

export default {
  render (h) {
    const canEdit = this.canEdit && this.editorMode === 'edit'
    const style = {
      position: 'relative',
      color: `${this.color} !important`,
      textDecoration: 'none',
      backgroundColor: this.backgroundColor || 'rgba(255, 255, 255, 0.2)',
      lineHeight: `${this.lineHeight}em`,
      border: `${this.borderWidth}px solid ${this.borderColor}`,
      borderRadius: `${this.borderRadius}px`
    }
    /**
     * https://github.com/ly525/luban-h5/issues/155
     * 需要给预览模式的文字添加 ql-snow 样式原因：文字样式和文字编辑器(ql-editor)的 theme 有关系
     * 比如编辑模式 h1 样式为：.ql-snow .ql-editor h1 {font-size: 2em;}
     * 因此预览模式的文字内容也需要加上 div.ql-snow > div.ql-editor 作为wrapper
     */
    const previewText = <div class="ql-snow"><div domPropsInnerHTML={this.text} class="ql-editor ql-container"></div></div>
    return (
      <div
        onDblclick={e => {
          this.canEdit = true
          e.stopPropagation()
        }}
        onMousedown={e => {
          if (this.canEdit) { e.stopPropagation() }
        }}
        v-click-outside={(e) => {
          this.canEdit = false
        }}
        style={style}
      >
        {
          canEdit
            ? <quillEditor
              content={this.text}
              options={{
                modules: {
                  // toolbar: '#toolbar-wrapper'
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // 切换按钮
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }], // 主题默认下拉，使用主题提供的值
                    [{ 'align': [] }],
                    ['clean'], // 清除格式
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
                    // https://github.com/quilljs/quill/issues/1208
                  ]
                },
                theme: 'snow'
              }}
              onChange={({ quill, html, text }) => {
                this.$emit('input', {
                  value: html,
                  pluginName: 'lbp-text'
                })
              }}>
            </quillEditor>
            : previewText
        }
      </div>
    )
  },
  name: 'lbp-text',
  data () {
    return {
      canEdit: false,
      innerText: this.text || '双击修改文字'
    }
  },
  props: {
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(0, 0, 0, 0)' }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 0 }),
    borderRadius: PropTypes.number({ label: '圆角(px)' }),
    borderColor: PropTypes.color({ label: '边框颜色' }),
    text: PropTypes.string({ label: '内容', defaultValue: '双击修改文字', visible: false }),
    editorMode: PropTypes.string({
      defaultValue: 'preview', // 可选值: preview/edit
      label: '模式',
      visible: false
    })
  },
  editorConfig: {
  }
}
