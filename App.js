import React from 'react'
import MemoScreen from './src/screen/MemoScreen'
import { Provider } from 'react-redux'
import store, { persistor } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoScreen/>
        </PersistGate>
      </Provider>
    )
  }
}