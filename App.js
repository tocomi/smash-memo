import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeigh
const MEMO = "@smashmemo.memo"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      memo: [],
      currendIndex: 0,
      inputText: "",
    }
  }

  componentDidMount() {
    this.loadMemo()
  }

  loadMemo = async () => {
    try {
      const memoString = await AsyncStorage.getItem(MEMO)
      if (memoString) {
        const memo = JSON.parse(memoString)
        const currendIndex = memo.length
        this.setState({
          memo: memo,
          currendIndex: currendIndex,
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  saveMemo = async (memo) => {
    try {
      const memoString = JSON.stringify(memo)
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
    const memo = [...this.state.memo, newMemo]
    this.setState({
      memo: memo,
      currendIndex: index + 1,
      inputText: "",
    })
    this.saveMemo(memo)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.filter}>
          <Text>Filter</Text>
        </View>
        <ScrollView style={styles.memoList}>
          <FlatList
            data={this.state.memo}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtrator={(item, index) => item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <TextInput
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            style={styles.inputText}
          />
          <Button
            onPress={this.onAddItem}
            title="Add"
            style={styles.inputButton}
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
    height: 30,
    flexDirection: 'row',
  },
  inputText: {
    flex: 1,
  },
  inputButton: {
    width: 100,
    color: '#841584',
  }
});
