import { MEMO } from '../action/actions'

const initialState = {
  memos: [],
  currentIndex: 0,
  isDetailOpen: false,
}

const memos = (state = initialState, action) => {
  switch (action.type) {
    case MEMO.ADD:
      const newMemo = { content: action.content, date: action.date, index: state.currentIndex }
      return {
        ...state,
        memos: [ ...state.memos, newMemo ],
        currentIndex: state.currentIndex + 1,
      }
    case MEMO.DELETE:
      const memos = state.memos.filter(memo => memo.index !== action.index)
      return {
        ...state,
        memos: memos,
      }
    case MEMO.OPEN_DETAIL:
      return {
        ...state,
        isDetailOpen: true,
      }
    case MEMO.CLOSE_DETAIL:
      return {
        ...state,
        isDetailOpen: false,
      }
    default:
      return state
  }
}
export default memos
