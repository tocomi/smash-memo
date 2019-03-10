import { MEMO } from '../action/actions'
import { TARGET_TYPE } from '../type/targetType'
import { MODE_TYPE } from '../type/modeType'
import { characters } from '../data/characters'
import { getTodayDate } from '../lib/DateUtil'

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
  inputDate: getTodayDate(),
  selectedIndex: -1,
  targetType: null,
  modeType: null,
}

const memos = (state = initialState, action) => {
  switch(action.type) {
    case MEMO.ADD:
      switch(state.modeType) {
        case MODE_TYPE.ADD:
          const newMemo = {
            text: state.inputText,
            date: state.inputDate,
            myCharacter: state.selectedMyCharacter,
            enemyCharacter: state.selectedEnemyCharacter,
            index: state.currentIndex
          }
          return {
            ...state,
            memos: [ ...state.memos, newMemo ],
            currentIndex: state.currentIndex + 1,
            inputText: "",
            inputDate: getTodayDate(),
          }
        case MODE_TYPE.EDIT:
          const targetIndex = state.memos.findIndex((memo) => memo.index === state.selectedIndex)
          if (targetIndex < 0) {
            alert('Update error.')
            return state
          }
          const targetMemo = state.memos[targetIndex]
          const updateMemo = {
            text: state.inputText,
            date: state.inputDate,
            myCharacter: state.selectedMyCharacter,
            enemyCharacter: state.selectedEnemyCharacter,
            index: targetMemo.index
          }
          state.memos.splice(targetIndex, 1, updateMemo)
          return {
            ...state,
            memos: state.memos,
          }
      }
    case MEMO.DELETE:
      const memos = state.memos.filter(memo => memo.index !== action.index)
      return {
        ...state,
        memos: memos,
      }
    case MEMO.OPEN_DETAIL:
      switch(action.mode) {
        case MODE_TYPE.ADD:
          return {
            ...state,
            isDetailOpen: true,
            modeType: action.mode,
            inputText: "",
            inputDate: getTodayDate(),
            selectedIndex: -1,
          }
        case MODE_TYPE.EDIT:
          return {
            ...state,
            isDetailOpen: true,
            modeType: action.mode
          }
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
    case MEMO.SET_INPUT_TEXT:
      return {
        ...state,
        inputText: action.inputText,
      }
    case MEMO.SET_INPUT_DATE:
      return {
        ...state,
        inputDate: action.inputDate,
      }
    default:
      return state
  }
}
export default memos
