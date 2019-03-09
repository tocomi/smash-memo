import { MEMO } from './actions'

export const addMemo = (content, date) => {
  return {
    type: MEMO.ADD,
    content,
    date,
  }
}

export const deleteMemo = (index) => {
  return {
    type: MEMO.DELETE,
    index,
  }
}

export const openDetail = () => {
  return {
    type: MEMO.OPEN_DETAIL,
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

export const setSelectedCharacter = (myCharacter, enemyCharacter) => {
  return {
    type: MEMO.SET_SELECTED_CHARACTER,
    myCharacter,
    enemyCharacter,
  }
}
