import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { 
  Avatar,
} from 'react-native-elements';

import Modal from 'react-native-modalbox';

import { connect } from 'react-redux'
import { closeCharacter, setCharacter } from '../action/actionCreators'

class CharacterSelect extends React.Component {

  constructor(props) {
    super(props)
  }

  setCharacter = (character) => {
    this.props.setCharacter(character)
    this.props.closeCharacter()
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.isCharacterOpen}
        onClosed={() => this.props.closeCharacter()}
      >
        <View style={styles.modal}>
          <Avatar
            rounded
            size="medium"
            title="M"
            onPress={() => this.setCharacter('M')}
          />
          <Avatar
            rounded
            size="medium"
            title="DK"
            onPress={() => this.setCharacter('DK')}
          />
          <Avatar
            rounded
            size="medium"
            title="CF"
            onPress={() => this.setCharacter('CF')}
          />
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isCharacterOpen: state.memos.isCharacterOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCharacter() {
      dispatch(closeCharacter())
    },
    setCharacter(character) {
      dispatch(setCharacter(character))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)

const styles = StyleSheet.create({
  modal: {
    height: 440,
  },
})