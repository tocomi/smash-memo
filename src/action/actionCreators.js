import { MEMO } from './actions'

export const addMemo = () => {
  return {
    type: MEMO.ADD,
  }
}

export const deleteMemo = (index) => {
  return {
    type: MEMO.DELETE,
    index,
  }
}

export const openDetail = (mode) => {
  return {
    type: MEMO.OPEN_DETAIL,
    mode,
  }
}

export const closeDetail = () => {
  return {
    type: MEMO.CLOSE_DETAIL,
  }
}

export const openCharacter = (targetType) => {
  return {
    type: MEMO.OPEN_CHARACTER,
    targetType,
  }
}

export const closeCharacter = () => {
  return {
    type: MEMO.CLOSE_CHARACTER,
  }
}

export const setCharacter = (character) => {
  return {
    type: MEMO.SET_CHARACTER,
    character,
  }
}

export const setSelectedMemo = (selectedMemo) => {
  return {
    type: MEMO.SET_SELECTED_MEMO,
    selectedMemo,
  }
}

export const setInputText = (inputText) => {
  return {
    type: MEMO.SET_INPUT_TEXT,
    inputText,
  }
}

export const setInputDate = (inputDate) => {
  return {
    type: MEMO.SET_INPUT_DATE,
    inputDate,
  }
}