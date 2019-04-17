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
    date: this.props.data
      ? new Date(this.props.data.date)
      : new Date(this.props.selectedDateString), // JS datetime format
    pickedDate: this.props.data
      ? this.props.data.date
      : DateFormat.scheduleDate(new Date(this.props.selectedDateString)), // "2019-04-04"
    pickedTime: this.props.data ? this.props.data.time : null, // "14:00"
    content: this.props.data ? this.props.data.content : "", // title of schedule
    memo: this.props.data ? this.props.data.memo : "" // additional note of schedule
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
    const { toggleScheduleForm, handleSubmit } = this.props;
    const { date, pickedDate, pickedTime, content, memo } = this.state;
    return (
      <Modal
        style={{ padding: 100 }}
        transparent={false}
        animationType="slide"
        onRequestClose={() => toggleScheduleForm()}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.formTitle}>Add New Schedule</Text>
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
                  this.props.updateSchedule
                    ? this.props.updateSchedule(
                        this.props.data.id,
                        pickedDate,
                        pickedTime,
                        content,
                        memo
                      )
                    : handleSubmit(pickedDate, pickedTime, content, memo);
                  toggleScheduleForm();
                }}
              >
                <Text style={styles.createScheduleBtn}>Confirm</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => toggleScheduleForm()}
        >
          <Icon.Ionicons name={"md-close"} size={40} />
        </TouchableOpacity>
      </Modal>
    );
  }
}
// 'confirm' btn -> set the selectedDateObj into the date just the schedule is created
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "55%",
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
  formTitle: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "vollkorn-regular"
  },
  formInput: {
    margin: 10,
    padding: 5,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20,
    fontFamily: "vollkorn-regular"
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
    color: "#910D01",
    fontFamily: "vollkorn-bold"
  },
  closeBtnContainer: {
    position: "absolute",
    bottom: Layout.window.height * 0.15,
    alignSelf: "center",
    alignItems: "center",
    width: 50
  }
});
