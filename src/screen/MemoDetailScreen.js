import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { 
  Input,
  Button,
  Avatar,
} from 'react-native-elements';

import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux'
import { addMemo, closeDetail, openCharacter, setInputText, setInputDate } from '../action/actionCreators'

import { TARGET_TYPE } from '../type/targetType'

class MemoDetail extends React.Component {

  constructor(props) {
    super(props)
  }

  addItem = () => {
    if (this.props.inputText === "") {
      return;
    }

    this.props.addMemo()
    this.closeAddMemoWindow()
  }

  closeAddMemoWindow = () => {
    this.props.closeDetail()
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.isDetailOpen}
        onClosed={() => this.props.closeDetail()}
      >
        <View style={styles.modal}>
          <View style={styles.inputView}>
            <View style={styles.selectedCharacterView}>
              <Text>You</Text>
              <Avatar
                rounded
                size="medium"
                source={this.props.selectedMyCharacter.image}
                onPress={() => {this.props.openCharacter(TARGET_TYPE.SELECTED_MY)}}
                containerStyle={styles.selectedCharacterAvatar}
                avatarStyle={styles.selectedMyCharacterAvatar}
              />
              <Text>Enemy</Text>
              <Avatar
                rounded
                size="medium"
                source={this.props.selectedEnemyCharacter.image}
                onPress={() => {this.props.openCharacter(TARGET_TYPE.SELECTED_ENEMY)}}
                containerStyle={styles.selectedCharacterAvatar}
                avatarStyle={styles.selectedEnemyCharacterAvatar}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <DatePicker
              style={{width: '100%'}}
              date={this.props.inputDate}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              format='YYYY/MM/DD'
              onDateChange={(date) => this.props.setInputDate(date)}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={this.props.inputText}
              multiline={true}
              numberOfLines={10}
              containerStyle={styles.inputText}
              inputStyle={{ height: 200 }}
              onChangeText={(text) => this.props.setInputText(text)}
            />
          </View>
          <View style={styles.inputButtons}>
            <Button
              title="Cancel"
              onPress={() => this.props.closeDetail()}
              containerStyle={{ borderBottomLeftRadius: 20 }}
              buttonStyle={[ styles.buttonStyle, { borderBottomLeftRadius: 20, backgroundColor: '#DA5A5A' }]}
            />
            <Button
              title="Save"
              onPress={() => this.addItem()}
              containerStyle={{ borderBottomRightRadius: 20 }}
              buttonStyle={[ styles.buttonStyle , { borderBottomRightRadius: 20 }]}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    memos: state.memos.memos,
    inputText: state.memos.inputText,
    inputDate: state.memos.inputDate,
    isDetailOpen: state.memos.isDetailOpen,
    isCharacterOpen: state.memos.isCharacterOpen,
    selectedMyCharacter: state.memos.selectedMyCharacter,
    selectedEnemyCharacter: state.memos.selectedEnemyCharacter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMemo() {
      dispatch(addMemo())
    },
    closeDetail() {
      dispatch(closeDetail())
    },
    openCharacter(targetType) {
      dispatch(openCharacter(targetType))
    },
    setInputText(text) {
      dispatch(setInputText(text))
    },
    setInputDate(date) {
      dispatch(setInputDate(date))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  selectedCharacterView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  selectedCharacterAvatar: {
    marginRight: 20,
  },
  selectedMyCharacterAvatar: {
    borderWidth: 2,
    borderColor: '#EA6A7A',
    borderRadius: 25,
  },
  selectedEnemyCharacterAvatar: {
    borderWidth: 2,
    borderColor: '#288ADD',
    borderRadius: 25,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 210,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modal: {
    height: 395,
    width: 350,
    borderRadius: 20,
  },
  inputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonStyle: {
    width: 175,
    height: 41,
    borderRadius: 0,
  }
});
