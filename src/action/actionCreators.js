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
