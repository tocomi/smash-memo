import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Filter</Text>
        </View>
        <ScrollView style={styles.todoList}>
          <Text>Todo</Text>
        </ScrollView>
        <View style={styles.input}>
          <Text>Input</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
  },
  filter: {
    height: 30,
  },
  todoList: {
    flex: 1,
  },
  input: {
    height: 30,
  },
});
