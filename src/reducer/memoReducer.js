import { MEMO } from '../action/actions'
import { TARGET_TYPE } from '../type/targetType'
import { characters } from '../data/characters'

const initialState = {
  memos: [],
  currentIndex: 0,
  isDetailOpen: false,
  isCharacterOpen: false,
  filteredMyCharacter: characters.slice(-1)[0],
  filteredEnemyCharacter: characters.slice(-1)[0],
  selectedMyCharacter: characters.slice(-1)[0],
  selectedEnemyCharacter: characters.slice(-1)[0],
  inputText: "",
  inputDate: "",
  selectedIndex: -1,
  targetType: null,
}

const memos = (state = initialState, action) => {
  switch (action.type) {
    case MEMO.ADD:
      const newMemo = {
        text: action.text,
        date: action.date,
        myCharacter: state.selectedMyCharacter,
        enemyCharacter: state.selectedEnemyCharacter,
        index: state.currentIndex
      }
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
        targetType: action.targetType,
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
            filteredMyCharacter: characters.find((character) => character.name === action.character),
          }
        case TARGET_TYPE.FILTERED_ENEMY:
          return {
            ...state,
            filteredEnemyCharacter: characters.find((character) => character.name === action.character),
          }
        case TARGET_TYPE.SELECTED_MY:
          return {
            ...state,
            selectedMyCharacter: characters.find((character) => character.name === action.character),
          }
        case TARGET_TYPE.SELECTED_ENEMY:
          return {
            ...state,
            selectedEnemyCharacter: characters.find((character) => character.name === action.character),
          }
      }
    case MEMO.SET_SELECTED_MEMO:
      return {
        ...state,
        selectedMyCharacter: action.selectedMemo.myCharacter,
        selectedEnemyCharacter: action.selectedMemo.enemyCharacter,
        inputText: action.selectedMemo.text,
        inputDate: action.selectedMemo.date,
        selectedIndex: action.selectedMemo.index,
      }
    default:
      return state
  }
}
export default memos
