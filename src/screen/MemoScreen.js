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
  ListItem,
  Icon,
  Avatar,
} from 'react-native-elements';

import Swipeout from 'react-native-swipeout'

import MemoDetail from './MemoDetailScreen'
import CharacterSelect from './CharacterSelectScreen'

import {
  ifIphoneX,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { connect } from 'react-redux'
import { deleteMemo, openDetail, openCharacter, setSelectedMemo} from '../action/actionCreators'

import { TARGET_TYPE } from '../type/targetType'
import { MODE_TYPE } from '../type/modeType'

const STATUSBAR_HEIGHT = getStatusBarHeight()

class MemoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filterText: "",
    }
  }

  deleteItem = (item) => {
    this.props.deleteMemo(item.index)
  }

  closeAddMemoWindow = () => {
    this.refs.addMemoWindow.close()
  }

  openEditMemoWindow = (memo) => {
    this.props.setSelectedMemo(memo)
    this.props.openDetail(MODE_TYPE.EDIT)
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
    if (this.props.filteredMyCharacter.name !== 'any') {
      memos = memos.filter(memo => memo.myCharacter.name === this.props.filteredMyCharacter.name)
    }
    if (this.props.filteredEnemyCharacter.name !== 'any') {
      memos = memos.filter(memo => memo.enemyCharacter.name === this.props.filteredEnemyCharacter.name)
    }
    if (filterText !== "") {
      memos = memos.filter(memo => memo.text.includes(filterText))
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
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
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
                  title={item.text}
                  subtitle={item.date}
                  subtitleStyle={{ fontSize: 12, color: 'gray' }}
                  bottomDivider
                  leftAvatar={{ source: item.myCharacter.image, avatarStyle: styles.listMyAvatar }}
                  rightAvatar={{ source: item.enemyCharacter.image, avatarStyle: styles.listEnemyAvatar, size: 'small' }}
                  onLongPress={() => this.openEditMemoWindow(item)}
                />
              </Swipeout>
            }
            keyExtractor={(item, index) => item.index.toString()}
          />
        </ScrollView>

        <View style={styles.input}>
          <View style={styles.characterFilter}>
            <Avatar
              rounded
              size="medium"
              source={this.props.filteredMyCharacter.image}
              onPress={() => {this.props.openCharacter(TARGET_TYPE.FILTERED_MY)}}
              containerStyle={styles.filterAvatar}
              avatarStyle={styles.filterMyAvatar}
            />
            <Avatar
              rounded
              size="medium"
              source={this.props.filteredEnemyCharacter.image}
              onPress={() => {this.props.openCharacter(TARGET_TYPE.FILTERED_ENEMY)}}
              containerStyle={styles.filterAvatar}
              avatarStyle={styles.filterEnemyAvatar}
            />
          </View>
          <Icon
            raised
            type='octicon'
            name='pencil'
            color='#EA5A5A'
            reverse={true}
            onPress={() => this.props.openDetail(MODE_TYPE.ADD)}
          />
        </View>

        <MemoDetail/>
        <CharacterSelect/>

      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    memos: state.memos.memos,
    filteredMyCharacter: state.memos.filteredMyCharacter,
    filteredEnemyCharacter: state.memos.filteredEnemyCharacter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMemo(index) {
      dispatch(deleteMemo(index))
    },
    openDetail(mode) {
      dispatch(openDetail(mode))
    },
    openCharacter(targetType) {
      dispatch(openCharacter(targetType))
    },
    setSelectedMemo(memo) {
      dispatch(setSelectedMemo(memo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...ifIphoneX({
      paddingTop: STATUSBAR_HEIGHT + 10,
    }, {
      paddingTop: STATUSBAR_HEIGHT,
    }),
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderBottomWidth: 1,
  },
  memoList: {
    flex: 1,
  },
  listMyAvatar: {
    borderWidth: 1.5,
    borderColor: '#EA6A7A',
    borderRadius: 20,
  },
  listEnemyAvatar: {
    borderWidth: 1,
    borderColor: '#288ADD',
    borderRadius: 17,
  },
  input: {
    ...ifIphoneX({
      height: 90,
      paddingBottom: 40,
    }, {
      height: 65,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  characterFilter: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  filterAvatar: {
    marginTop: 7,
    marginRight: 10,
  },
  filterMyAvatar: {
    borderWidth: 2,
    borderColor: '#EA6A7A',
    borderRadius: 25,
  },
  filterEnemyAvatar: {
    borderWidth: 2,
    borderColor: '#288ADD',
    borderRadius: 25,
  },
  addButton: {
    height: 60,
    width: 60,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 48,
  },
});
