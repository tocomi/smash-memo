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
import { characters } from '../data/characters'

class CharacterSelect extends React.Component {

  constructor(props) {
    super(props)
  }

  setCharacter = (characterName) => {
    this.props.setCharacter(characterName)
    this.props.closeCharacter()
  }

  render() {
    avatarList = []
    characters.forEach((character) => {
      avatarList.push(
        <Avatar
          rounded
          size="medium"
          key={character.name}
          source={character.image}
          onPress={() => this.setCharacter(character.name)}
          avatarStyle={styles.characterSelectAvatar}
        />
      )
    })

    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.isCharacterOpen}
        onClosed={() => this.props.closeCharacter()}
      >
        <View style={styles.characterView}>
          {avatarList}
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
    setCharacter(characterName) {
      dispatch(setCharacter(characterName))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)

const styles = StyleSheet.create({
  modal: {
    height: 440,
  },
  characterView: {
    flexDirection: 'row',
    flex: 2,
    flexWrap: 'wrap',
  },
  characterSelectAvatar: {
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 25,
  },
})