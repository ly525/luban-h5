
import { cloneDeep } from 'lodash'
import undoRedoHistory from './History'
const unRecordHistoryMutationTypes = ['element/setElementCommonStyle']

const undoRedoPlugin = (store) => {
  // initialize and save the starting stage
  undoRedoHistory.init(store)
  let firstState = cloneDeep(store.state)
  undoRedoHistory.addState(firstState)

  store.subscribe((mutation, state) => {
    const { type } = mutation
    if (unRecordHistoryMutationTypes.includes(type)) return
    // is called AFTER every mutation
    undoRedoHistory.addState(cloneDeep(state))
  })
}

export default undoRedoPlugin
