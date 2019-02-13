import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

import { 
  SearchBar,
  Input,
  Button,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeigh
const MEMO = "@smashmemo.memo"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      memos: [],
      currendIndex: 0,
      inputText: "",
      filterText: "",
    }
  }

  componentDidMount() {
    this.loadMemo()
  }

  loadMemo = async () => {
    try {
      const memoString = await AsyncStorage.getItem(MEMO)
      if (memoString) {
        const memos = JSON.parse(memoString)
        const currendIndex = memos.length
        this.setState({
          memos: memos,
          currendIndex: currendIndex,
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  saveMemo = async (memos) => {
    try {
      const memoString = JSON.stringify(memos)
      await AsyncStorage.setItem(MEMO, memoString)
    } catch(e) {
      console.log(e)
    }
  }

  onAddItem = () => {
    const title = this.state.inputText
    if (title === "") {
      return;
    }
    const index = this.state.currendIndex
    const newMemo = { index: index, title: title }
    const memos = [...this.state.memos, newMemo]
    this.setState({
      memos: memos,
      currendIndex: index + 1,
      inputText: "",
    })
    this.saveMemo(memos)
  }

  render() {
    const filterText = this.state.filterText
    let memos = this.state.memos
    if (filterText !== "") {
      memos = memos.filter(memo => memo.title.includes(filterText))
    }
    const platform = Platform.OS === 'ios' ? 'ios' : 'android'
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <SearchBar
          platform={platform}
          cancelButtonTitle="Cancel"
          onChangeText={(text) => this.setState({filterText: text})}
          onClear={() => this.setState({filterText: ""})}
          value={this.state.filterText}
          placeholder="Type filter text"
        />
        <ScrollView style={styles.memoList}>
          <FlatList
            data={memos}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtrator={(item, index) => item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Input
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            containerStyle={styles.inputText}
          />
          <Button
            icon={
              <Icon
                name='plus'
                size={30}
                color='white'
              />
            }
            title=""
            onPress={this.onAddItem}
            buttonStyle={styles.inputButton}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  filter: {
    height: 30,
  },
  memoList: {
    flex: 1,
  },
  input: {
    height: 50,
    flexDirection: 'row',
    paddingRight: 10,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputButton: {
    height: 48,
    width: 48,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 48,
  }
});
