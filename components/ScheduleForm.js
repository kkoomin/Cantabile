import React, { Component } from "react";
import {
  DatePickerIOS,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
  TextInput,
  StyleSheet
} from "react-native";

export default class ScheduleForm extends Component {
  state = {
    pickedDate: new Date(),
    newSchedule: ""
  };

  setDate = newDate => {
    this.setState({ pickedDate: newDate });
  };

  formatted_date = dateObj => {
    // "2019-04-01"
    let formatted_date = `${dateObj.getFullYear()}-${
      dateObj.getMonth() < 10
        ? "0" + (dateObj.getMonth() + 1)
        : dateObj.getMonth() + 1
    }-${dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()}`;
    return formatted_date;
  };

  formatted_time = dateObj => {
    // "16:23"
    let formatted_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
    return formatted_time;
  };

  render() {
    const { toggleScheduleForm } = this.props;
    const { pickedDate, newSchedule } = this.state;
    return (
      <View style={styles.container}>
        <DatePickerIOS date={pickedDate} onDateChange={this.setDate} />
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.formInput}
            placeholder="new date"
            placeholderTextColor={"#999"}
            value={this.formatted_date(pickedDate)}
          />
          <TextInput
            style={styles.formInput}
            placeholder="new schedule"
            placeholderTextColor={"#999"}
            value={newSchedule}
          />
          <Button
            color="#841584"
            onPress={() => toggleScheduleForm()}
            title="Close Form"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 300,
    // padding: 10,
    borderWidth: 2,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    width: 500,
    backgroundColor: "transparent",
    opacity: 0.99
  },
  innerContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "lightblue"
    // justifyContent: "center",
    // alignItems: "center"
  },
  formInput: {
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  }
});
