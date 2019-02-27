import { MEMO } from '../action/actions'
import { TARGET_TYPE } from '../type/targetType'

const initialState = {
  memos: [],
  currentIndex: 0,
  isDetailOpen: false,
  isCharacterOpen: false,
  filteredMyCharacter: '',
  filteredEnemyCharacter: '',
  selectedMyCharacter: '',
  selectedEnemyCharacter: '',
  targetType: null,
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
    case MEMO.OPEN_CHARACTER:
      return {
        ...state,
        isCharacterOpen: true,
      }
    case MEMO.CLOSE_CHARACTER:
      return {
        ...state,
        isCharacterOpen: false,
      }
    case MEMO.SET_CHARACTER:
      switch(state.targetType) {
        case TARGET_TYPE.FILTERED_MY:
          return {
            ...state,
            filteredMyCharacter: action.character,
          }
        case TARGET_TYPE.FILTERED_ENEMY:
          return {
            ...state,
            filteredEnemyCharacter: action.character,
          }
        case TARGET_TYPE.SELECTED_MY:
          return {
            ...state,
            selectedMyCharacter: action.character,
          }
        case TARGET_TYPE.SELECTED_ENEMY:
          return {
            ...state,
            selectedEnemyCharacter: action.character,
          }
      }
    default:
      return state
  }
}
export default memos
