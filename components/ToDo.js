import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    content: this.props.content
  };

  _startEditing = () => {
    this.setState({ isEditing: true });
  };

  _finishEditing = () => {
    this.setState({ isEditing: false });
    this.props.updateToDo(this.props.id, this.state.content);
  };

  _toggleCompleted = () => {
    this.props.isCompleted
      ? this.props.uncompleteToDo(this.props.id)
      : this.props.completeToDo(this.props.id);
  };
  _handleInput = text => {
    this.setState({ content: text });
  };

  render() {
    const { id, content, isCompleted, deleteToDo } = this.props;

    return (
      <View style={styles.container}>
        {this.state.isEditing ? (
          <>
            <TouchableOpacity onPress={this._toggleCompleted}>
              <View style={[styles.button, styles.completeBtn]}>
                <Icon.FontAwesome
                  name={isCompleted ? "check-circle-o" : "circle-o"}
                  color={isCompleted ? "#910D01" : "#000"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <TextInput
                style={[styles.text, styles.todoEditText]}
                autoFocus={true}
                value={this.state.content}
                onChangeText={this._handleInput}
                onBlur={this._finishEditing}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._finishEditing}>
              <View style={[styles.button, styles.editBtn]}>
                <Icon.MaterialCommunityIcons
                  name={"checkbox-marked-circle-outline"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={this._toggleCompleted}>
              <View style={[styles.button, styles.completeBtn]}>
                <Icon.FontAwesome
                  name={isCompleted ? "check-circle-o" : "circle-o"}
                  size={30}
                  color={isCompleted ? "#910D01" : "#000"}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : null,
                styles.todoText
              ]}
              multiline={true}
            >
              {content}
            </Text>
            <TouchableOpacity onPress={this._startEditing}>
              <View style={[styles.button, styles.editBtn]}>
                <Icon.MaterialCommunityIcons
                  name={"square-edit-outline"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteToDo(id)}>
              <View style={[styles.button, styles.deleteBtn]}>
                <Icon.MaterialCommunityIcons
                  name={"delete-outline"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "lightgrey"
  },
  text: {
    padding: 5,
    margin: 5,
    fontSize: 20,
    fontFamily: "vollkorn-regular"
  },
  todoText: {
    width: Layout.window.width * 0.7
  },
  todoEditText: {
    width: Layout.window.width * 0.765
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#910D01"
  }
});
