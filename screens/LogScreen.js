import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Timer from "../components/Timer";
import DateFormat from "../constants/DateFormat";
import ToDoList from "../components/ToDoList";

export default class ChatScreen extends React.Component {
  state = {
    currentDay: new Date()
  };

  static navigationOptions = {
    title: "Practice Log"
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.logTitle}>
              {DateFormat.stringDate(this.state.currentDay)}
            </Text>
          </View>
          <Timer
            timers={this.props.screenProps.timers}
            currentDay={this.state.currentDay}
            handleTimerSave={this.props.screenProps.handleTimerSave}
          />
          <ToDoList />
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>"Practice makes perfect"</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  titleContainer: {
    alignItems: "center"
  },
  logTitle: {
    fontSize: 35,
    margin: 20,
    fontFamily: "vollkorn-bold"
  },
  quoteContainer: {
    position: "absolute",
    bottom: 3,
    margin: 10,
    alignSelf: "center"
  },
  quote: {
    fontSize: 18,
    color: "grey",
    fontFamily: "vollkorn-regular"
  }
});
