import { MEMO } from './actions'

export const addMemo = (text) => {
  return {
    type: MEMO.ADD,
    text
  }
}
