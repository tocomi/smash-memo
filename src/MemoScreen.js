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
  Button,
  ListItem,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather'
import Swipeout from 'react-native-swipeout'

import MemoDetail from './component/MemoDetail'

import {
  ifIphoneX,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { connect } from 'react-redux'
import { deleteMemo, openDetail } from './action/actionCreators'

const STATUSBAR_HEIGHT = getStatusBarHeight()

class MemoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      inputDate: this.getTodayDate(),
      filterText: "",
    }
  }

  getTodayDate = () => {
    const now = new Date()
    return now.getFullYear() + '/' + this.addZeroForDate(now.getMonth() + 1) + '/' + this.addZeroForDate(now.getDate())
  }

  addZeroForDate = (number) => {
    return ('00' + number).slice(-2)
  }

  addItem = () => {
    const content = this.state.inputText
    if (content === "") {
      return;
    }

    this.props.addMemo(content, this.state.inputDate)
    this.setState({
      inputText: "",
      inputDate: this.getTodayDate(),
    })

    this.closeAddMemoWindow()
  }

  deleteItem = (item) => {
    this.props.deleteMemo(item.index)
  }

  closeAddMemoWindow = () => {
    this.refs.addMemoWindow.close()
  }

  swipeButton = (item) => {
    return [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: '#F55',
        onPress: () => { this.deleteItem(item) }
      }
    ]
  }

  render() {
    const filterText = this.state.filterText
    let memos = this.props.memos
    if (filterText !== "") {
      memos = memos.filter(memo => memo.content.includes(filterText))
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
              <Swipeout
                right={this.swipeButton(item)}
                autoClose={true}
              >
                <ListItem
                  title={item.content}
                  subtitle={item.date}
                  subtitleStyle={{fontSize: 12, color: 'gray'}}
                  bottomDivider
                />
              </Swipeout>
            }
            keyExtractor={(item, index) => item.index.toString()}
          />
        </ScrollView>

        <View style={styles.input}>
          <Button
            icon={
              <Icon
                name='plus'
                size={30}
                color='white'
              />
            }
            title=""
            onPress={() => this.props.openDetail()}
            buttonStyle={styles.addButton}
          />
        </View>

        <MemoDetail />

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
    deleteMemo(index) {
      dispatch(deleteMemo(index))
    },
    openDetail() {
      dispatch(openDetail())
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
      height: 90,
      paddingBottom: 40,
    }, {
      height: 65,
    }),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  addButton: {
    height: 60,
    width: 60,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 48,
  },
});
