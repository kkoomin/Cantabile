import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

let current_datetime = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let formatted_date =
  (current_datetime.getDate() < 10
    ? "0" + current_datetime.getDate()
    : current_datetime.getDate()) +
  " " +
  months[current_datetime.getMonth()] +
  " " +
  current_datetime.getFullYear();

export default class ChatScreen extends React.Component {
  state = {
    currentDay: formatted_date
  };

  static navigationOptions = {
    title: "Practice Log"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.logTitle}>{this.state.currentDay}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  titleContainer: {
    alignItems: "center"
  },
  logTitle: {
    fontSize: 20,
    margin: 20
  }
});
