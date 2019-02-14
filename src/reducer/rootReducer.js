import { combineReducers } from 'redux'
import memoReducer from './memoReducer'

export default combineReducers({
  memos: memoReducer,
})
