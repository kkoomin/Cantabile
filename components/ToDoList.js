import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  AsyncStorage
} from "react-native";
import Layout from "../constants/Layout";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

export default class ToDoList extends React.Component {
  state = {
    toDos: [],
    isLoaded: false,
    newToDoText: ""
  };

  componentDidMount = () => {
    this._getToDos();
  };

  _handleInput = text => {
    this.setState({
      newToDoText: text
    });
  };

  _getToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        isLoaded: true,
        toDos: parsedToDos || []
      });
    } catch (err) {
      console.log(err);
    }
  };

  _addToDo = () => {
    const newId = uuidv1();
    const newToDo = {
      id: newId,
      content: this.state.newToDoText,
      isCompleted: false,
      createdAt: new Date().getTime()
    };
    let newToDos = [newToDo].concat(this.state.toDos);
    this.setState({ toDos: newToDos, newToDoText: "" }, () => {
      this._saveToDos(this.state.toDos);
    });
  };

  _deleteToDo = id => {
    let toDos = this.state.toDos;
    toDos = toDos.filter(toDo => toDo.id !== id);
    this.setState({ toDos: toDos }, () => this._saveToDos(this.state.toDos));
  };

  _uncompleteToDo = id => {
    let toDos = this.state.toDos;
    toDos = toDos.map(toDo => {
      if (toDo.id === id) {
        toDo.isCompleted = false;
      }
      return toDo;
    });
    this.setState({ toDos: toDos }, () => this._saveToDos(this.state.toDos));
  };

  _completeToDo = id => {
    let toDos = this.state.toDos;
    toDos = toDos.map(toDo => {
      if (toDo.id === id) {
        toDo.isCompleted = true;
      }
      return toDo;
    });
    this.setState({ toDos: toDos }, () => this._saveToDos(this.state.toDos));
  };

  _updateToDo = (id, text) => {
    let toDos = this.state.toDos;
    console.log(toDos);
    let newToDos = toDos.map(toDo => {
      if (toDo.id === id) {
        toDo.content = text;
      }
      return toDo;
    });
    this.setState({ toDos: newToDos }, () => this._saveToDos(this.state.toDos));
  };

  _saveToDos = toDos => {
    toDos = toDos.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
    AsyncStorage.setItem("toDos", JSON.stringify(toDos));
  };

  render() {
    const { toDos, newToDoText } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"What are you gonna do today?"}
            placeholderTextColor={"#999"}
            value={newToDoText}
            onChangeText={this._handleInput}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
        </View>
        <ScrollView contentContainerStyle={styles.toDos}>
          {toDos.map(toDo => (
            <ToDo
              key={toDo.id}
              id={toDo.id}
              content={toDo.content}
              isCompleted={toDo.isCompleted}
              deleteToDo={this._deleteToDo}
              uncompleteToDo={this._uncompleteToDo}
              completeToDo={this._completeToDo}
              updateToDo={this._updateToDo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * 0.9,
    // backgroundColor: "red",
    marginTop: Layout.window.height * 0.05
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "lightgrey"
  },
  input: {
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "500"
  },
  toDos: {
    marginTop: 20
  }
});
