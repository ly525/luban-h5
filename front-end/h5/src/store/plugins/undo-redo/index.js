
import { cloneDeep } from 'lodash'
import undoRedoHistory from './History'
/**
 * #!zh: setElementCommonStyle 因为是在 mousemove 时候触发的，执行过于频繁，没有必要计入history，因此需要过滤。
 * 主要记录：拖动完成时候(mouseup)时候的位置、删除元素之前的状态等
 */
// const unRecordHistoryMutationTypes = ['editor/setElementCommonStyle']
const recordHistoryMutationTypes = [
  'editor/recordRect',
  'editor/elementManager'
]

const undoRedoPlugin = (store) => {
  // initialize and save the starting stage
  undoRedoHistory.init(store)
  let firstState = cloneDeep(store.state)
  undoRedoHistory.addState(firstState)

  store.subscribe((mutation, state) => {
    const { type } = mutation
    if (!recordHistoryMutationTypes.includes(type)) return
    // is called AFTER every mutation
    undoRedoHistory.addState(cloneDeep(state))
  })
}

export default undoRedoPlugin
