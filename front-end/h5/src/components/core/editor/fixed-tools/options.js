import undoRedoHistory from 'core/store/plugins/undo-redo/History'

const fixedTools = [
  {
    i18nTooltip: 'editor.fixedTool.undo',
    icon: 'mail-reply',
    action: () => undoRedoHistory.undo(),
    hotkey: 'ctrl&z,⌘&z',
    hotkeyTooltip: '(ctrl+z)'
  },
  {
    i18nTooltip: 'editor.fixedTool.redo',
    icon: 'mail-forward',
    action: () => undoRedoHistory.redo(),
    hotkey: 'ctrl&y,⌘&u',
    hotkeyTooltip: '(ctrl+y)'
  },
  {
    i18nTooltip: 'editor.fixedTool.preview',
    icon: 'eye',
    action: function () { this.previewDialogVisible = true }
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentPage',
    icon: 'copy',
    action: function () { this.pageManager({ type: 'copy' }) },
    hotkey: 'ctrl&c,⌘&c'
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentElement',
    icon: 'copy',
    action: function () { this.elementManager({ type: 'copy' }) }
  },
  {
    i18nTooltip: 'editor.fixedTool.importPSD',
    text: 'Ps',
    icon: '', // 优先级: icon > text > i18nTooltip
    action: '',
    disabled: true
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomOut',
    icon: 'plus',
    action: function () { this.scaleRate += 0.25 },
    hotkey: 'ctrl&=,⌘&=',
    hotkeyTooltip: '(ctrl +)'
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomIn',
    icon: 'minus',
    action: function () { this.scaleRate -= 0.25 },
    hotkey: 'ctrl&-,⌘&-',
    hotkeyTooltip: '(ctrl -)'
  },
  {
    i18nTooltip: 'editor.fixedTool.issues',
    icon: 'question',
    action: function () { window.open('https://github.com/ly525/luban-h5/issues/110') }
  }
]

export default fixedTools
