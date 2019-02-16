import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Text,
} from 'react-native';

import { 
  SearchBar,
  Input,
  Button,
  ListItem,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather'
import Swipeout from 'react-native-swipeout'
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker'

import {
  ifIphoneX,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { connect } from 'react-redux'
import { addMemo, deleteMemo } from './action/actionCreators'

const STATUSBAR_HEIGHT = getStatusBarHeight()

class MemoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      inputDate: "",
      filterText: "",
    }
  }

  addItem = () => {
    const title = this.state.inputText
    if (title === "") {
      return;
    }

    this.props.addMemo(title)
    this.setState({
      inputText: "",
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
              <Swipeout
                right={this.swipeButton(item)}
                autoClose={true}
              >
                <ListItem
                  title={item.title}
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
            onPress={() => this.refs.addMemoWindow.open()}
            buttonStyle={styles.addButton}
          />
        </View>

        <Modal
          style={styles.modal}
          ref={"addMemoWindow"}
        >
          <View style={styles.modal}>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Title</Text>
              <Input
                onChangeText={(text) => this.setState({inputText: text})}
                value={this.state.inputText}
                containerStyle={styles.inputText}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Date</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.inputDate}
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                onDateChange={(date) => {this.setState({inputDate: date})}}
              />
            </View>
            <View style={styles.inputButtons}>
              <Button
                icon={
                  <Icon
                    name='check-circle'
                    size={30}
                    color='white'
                  />
                }
                title=""
                onPress={() => this.addItem()}
                style={styles.inputButton}
              />
              <Button
                icon={
                  <Icon
                    name='x-circle'
                    size={30}
                    color='white'
                  />
                }
                title=""
                onPress={() => this.refs.addMemoWindow.close()}
                style={styles.inputButton}
              />
            </View>
          </View>
        </Modal>
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
    deleteMemo(index) {
      dispatch(deleteMemo(index))
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
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputLabel: {
    backgroundColor: '#333',
    color: '#EEE',
    paddingTop: 8,
    width: 100,
    fontSize: 20,
    textAlign: 'center',
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addButton: {
    height: 60,
    width: 60,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 48,
  },
  modal: {
    height: 400,
  },
  inputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  inputButton: {
    width: 120,
  }
});
