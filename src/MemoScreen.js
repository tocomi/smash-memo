import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import { 
  SearchBar,
  Input,
  Button,
  ListItem,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather'

import {
  ifIphoneX,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { connect } from 'react-redux'
import { addMemo } from './action/actionCreators'

const STATUSBAR_HEIGHT = getStatusBarHeight()

class MemoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      filterText: "",
    }
  }

  onAddItem = () => {
    const title = this.state.inputText
    if (title === "") {
      return;
    }

    this.props.addMemo(title)
    this.setState({
      inputText: "",
    })
  }

  render() {
    const filterText = this.state.filterText
    let memos = this.props.memos
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
            renderItem={({item}) => 
              <ListItem
                title={item.title}
                bottomDivider
              />
            }
            keyExtractor={(item, index) => item.index.toString()}
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

const mapStateToProps = (state) => {
  return {
    memos: state.memos.memos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMemo(text) {
      dispatch(addMemo(text))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoScreen)

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
    ...ifIphoneX({
      height: 80,
      paddingBottom: 30,
    }, {
      height: 50,
    }),
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
