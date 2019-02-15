import { MEMO } from './actions'

export const addMemo = (text) => {
  return {
    type: MEMO.ADD,
    text,
  }
}

export const deleteMemo = (index) => {
  return {
    type: MEMO.DELETE,
    index,
  }
}
