import React, { Component } from "react";
import {
  DatePickerIOS,
  Text,
  Modal,
  ScrollView,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import DateFormat from "../constants/DateFormat";
import Layout from "../constants/Layout";
import { Icon } from "expo";

export default class ScheduleForm extends Component {
  state = {
    date: new Date(this.props.selectedDateString), // JS datetime format
    pickedDate: DateFormat.scheduleDate(
      new Date(this.props.selectedDateString)
    ), // "2019-04-04"
    pickedTime: null, // "14:00"
    content: "", // title of schedule
    memo: "" // additional note of schedule
  };

  _setDate = newDate => {
    this.setState({
      date: newDate,
      pickedDate: DateFormat.scheduleDate(newDate),
      pickedTime: DateFormat.time(newDate)
    });
  };

  _changeContent = text => {
    this.setState({ content: text });
  };

  _changeMemo = text => {
    this.setState({ memo: text });
  };

  render() {
    const { toggleScheduleForm, selectedDateString, handleSubmit } = this.props;
    const { date, pickedDate, pickedTime, content, memo } = this.state;
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

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <DatePickerIOS date={date} onDateChange={this._setDate} />
            <ScrollView
              contentContainerStyle={styles.innerContainer}
              keyboardShouldPersistTaps="handled" //키보드 열린채 버튼 누르기 가능!
            >
              <TextInput
                style={styles.formInput}
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
              <TouchableOpacity
                style={styles.createScheduleBtnContainer}
                onPress={() => {
                  handleSubmit(pickedDate, pickedTime, content, memo);
                  toggleScheduleForm();
                }}
              >
                <Text style={styles.createScheduleBtn}>Confirm</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
// 'confirm' btn -> set the selectedDateObj into the date just the schedule is created
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
    borderRadius: 50,
    borderWidth: 1
  },
  innerContainer: {
    marginTop: 20,
    height: "50%",
    width: "100%"
  },
  formInput: {
    margin: 10,
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
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
    alignSelf: "center",
    alignItems: "center",
    width: 50
  }
});

// automatically add to ToDo List (practice schedule)
