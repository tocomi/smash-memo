import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { 
  Avatar,
  Button,
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
          containerStyle={styles.characterSelectAvatarContainer}
          avatarStyle={styles.characterSelectAvatar}
        />
      )
    })

    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.isCharacterOpen}
        onClosed={() => this.props.closeCharacter()}
        swipeToClose={false}
      >
        <ScrollView>
          <View style={styles.characterView}>
            {avatarList}
          </View>
        </ScrollView>
        <Button
          title="close"
          buttonStyle={styles.closeButton}
          onPress={() => this.props.closeCharacter()}
        />
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
    width: 350,
    borderRadius: 20,
  },
  characterView: {
    flexDirection: 'row',
    flex: 2,
    flexWrap: 'wrap',
  },
  characterSelectAvatarContainer: {
    marginTop: 10,
    marginLeft: 7,
  },
  characterSelectAvatar: {
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 25,
  },
  closeButton: {
    backgroundColor: '#DA5A5A',
    height: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
  },
})