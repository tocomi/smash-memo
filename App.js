import React from 'react'
import MemoScreen from './src/MemoScreen'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MemoScreen/>
      </Provider>
    )
  }
}