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
import { closeCharacter } from '../action/actionCreators'

class CharacterSelect extends React.Component {

  constructor(props) {
    super(props)
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
            title="Mario"
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)

const styles = StyleSheet.create({
  modal: {
    height: 440,
  },
})