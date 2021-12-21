
import { cloneDeep } from 'lodash'
import undoRedoHistory from './History'
/**
 * #!zh: setElementCommonStyle 因为是在 mousemove 时候触发的，执行过于频繁，没有必要计入history，因此需要过滤。
 * 主要记录：拖动完成时候(mouseup)时候的位置、删除元素之前的状态等
 */
// const unRecordHistoryMutationTypes = ['editor/setElementCommonStyle']
const recordHistoryMutationTypes = [
  'editor/recordRect',
  'editor/elementManager',
  'editor/setEditingPage' // 用作 firstState，类似打开文件编辑之前的原始文件
]

const undoRedoPlugin = (store) => {
  // initialize and save the starting stage
  undoRedoHistory.init(store)
  /**
   *
   * 注释addState(firstState) 代码
   * 因为 firstState 如果不注释则是整个editor的状态，而非作品的初始状态
   * 作品的初始状态<editor/setEditingPage>，也就是页面有内容最开始有内容时候的状态，注意不是setWork<此时editingPage 仍然为空，也不是 setEditingElement 因为用户可能不操作，直接从左侧列表选择组件，加到画布中>)
   * 如果添加到到history中，会导致history 变为：[editorState, workState1, workState2]
   * 这样执行 ctrl+z 的时候，会导致撤销的到最后一个时候(canUndo-> currentIndex > 0)
   * 其实是 editorState，导致画布区域显示空白（因为那时候 editorState 中的 work 为null，并没有加载work）
   * 为何 canUndo = currentIndex>0，因为 currentIndex = 0 的时候，说明 history 数组中只有一个状态了，也就是最开始时候的状态，回退最终也只能回退到 firstState，不能再退了
   * 类似打开sublime编辑文件，无论怎么改动，撤退到最后一步，其实就是是文件打开时候的状态
   * 同理 在 setWork 的时候，应该进行 undoRedoHistory.addState(firstState)
   */
  // let firstState = cloneDeep(store.state)
  // undoRedoHistory.addState(firstState)

  store.subscribe((mutation, state) => {
    const { type } = mutation
    if (!recordHistoryMutationTypes.includes(type)) return
    // is called AFTER every mutation
    undoRedoHistory.addState(cloneDeep(state))
  })
}

export default undoRedoPlugin
