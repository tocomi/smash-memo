import { MEMO } from '../action/actions'

const initialState = {
  memos: [],
  currentIndex: 0,
}

const memos = (state = initialState, action) => {
  switch (action.type) {
    case MEMO.ADD:
      const newMemo = { title: action.text, index: state.currentIndex }
      return {
        ...state,
        memos: [ ...state.memos, newMemo ],
        currentIndex: state.currentIndex + 1,
      }
    default:
      return state
  }
}
export default memos
