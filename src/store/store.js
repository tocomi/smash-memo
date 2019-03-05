import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducer/rootReducer'

const persistConfig = {
  key: 'MEMO',
  storage,
  whitelist: [ 'memos', 'currentIndex', 'selectedMyCharacter' ],
  blacklist: [ 'isDetailOpen', 'isCharacterOpen', 'filteredMyCharacter', 'filteredEnemyCharacter', 'selectedEnemyCharacter']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
export const persistor = persistStore(store)
export default store
