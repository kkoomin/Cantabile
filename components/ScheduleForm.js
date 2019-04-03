import React, { Component } from "react";
import {
  DatePickerIOS,
  Text,
  Modal,
  ScrollView,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import DateFormat from "../constants/DateFormat";
import Layout from "../constants/Layout";
import { Icon } from "expo";

export default class ScheduleForm extends Component {
  state = {
    pickedDate: new Date(this.props.selectedDateString),
    content: "",
    memo: ""
  };

  _setDate = newDate => {
    this.setState({ pickedDate: newDate });
  };

  _changeContent = text => {
    this.setState({ content: text });
  };

  _changeMemo = text => {
    this.setState({ memo: text });
  };

  render() {
    const { toggleScheduleForm, selectedDateString } = this.props;
    const { pickedDate, content, memo } = this.state;
    return (
      <Modal
        style={{ padding: 100 }}
        transparent={true}
        animationType="slide"
        onRequestClose={() => toggleScheduleForm()}
      >
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => toggleScheduleForm()}
        >
          <Icon.Ionicons name={"ios-close-circle-outline"} size={40} />
        </TouchableOpacity>

        <View style={styles.container}>
          <DatePickerIOS date={pickedDate} onDateChange={this._setDate} />
          <ScrollView contentContainerStyle={styles.innerContainer}>
            <TextInput
              style={styles.formInput}
              multiline={true}
              returnKeyType={"done"}
              placeholder="Schedule Name"
              placeholderTextColor={"#999"}
              value={content}
              onChangeText={this._changeContent}
            />
            <TextInput
              style={[styles.formInput, styles.textArea]}
              multiline={true}
              returnKeyType={"done"}
              placeholder="Additional Note"
              placeholderTextColor={"#999"}
              value={memo}
              onChangeText={this._changeMemo}
            />
            <TouchableOpacity style={styles.createScheduleBtnContainer}>
              <Text style={styles.createScheduleBtn}>Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "50%",
    width: "80%",
    padding: Layout.window.width * 0.05,
    position: "absolute",
    alignSelf: "center",
    bottom: "25%",
    justifyContent: "center",
    borderRadius: 50
  },
  innerContainer: {
    height: "50%",
    width: "100%"
  },
  formInput: {
    margin: 10,
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  createScheduleBtnContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgrey",
    padding: 10,
    width: 100,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center"
  },
  createScheduleBtn: {
    fontSize: 18,
    color: "#910D01"
  },
  closeBtnContainer: {
    position: "absolute",
    bottom: "20%",
    alignSelf: "center"
  }
});

// automatically add to ToDo List (practice schedule)
