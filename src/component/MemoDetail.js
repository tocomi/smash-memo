import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { 
  Input,
  Button,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux'
import { addMemo, closeDetail } from '../action/actionCreators'

class MemoDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      inputDate: this.getTodayDate(),
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
            <Text style={styles.inputLabel}>Date</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.inputDate}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              format='YYYY/MM/DD'
              onDateChange={(date) => {this.setState({inputDate: date})}}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Memo</Text>
            <Input
              onChangeText={(text) => this.setState({inputText: text})}
              value={this.state.inputText}
              multiline={true}
              numberOfLines={10}
              containerStyle={styles.inputText}
              inputStyle={{ height: 270 }}
            />
          </View>
          <View style={styles.inputButtons}>
            <Button
              icon={
                <Icon
                  name='x-circle'
                  size={30}
                  color='white'
                />
              }
              title=""
              onPress={() => this.props.closeDetail()}
              style={styles.inputButton}
              buttonStyle={{ backgroundColor: '#CC4444' }}
              raised={true}
            />
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
              buttonStyle={{ backgroundColor: '#44CC44' }}
              raised={true}
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
    isDetailOpen: state.memos.isDetailOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMemo(content, date) {
      dispatch(addMemo(content, date))
    },
    closeDetail() {
      dispatch(closeDetail())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetail)

const styles = StyleSheet.create({
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
    height: 280,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modal: {
    height: 440,
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