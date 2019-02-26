import React from 'react';

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