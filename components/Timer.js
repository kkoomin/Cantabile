import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default class Timer extends React.Component {
  state = {
    setIntervalId: 0,
    hour: 0,
    min: 0,
    sec: 0
  };

  _startTimer = () => {
    this.state.setIntervalId = setInterval(() => {
      if (this.state.sec < 59) {
        return this.setState({ sec: this.state.sec + 1 });
      } else if (this.state.sec >= 59 && this.state.min < 59) {
        return this.setState({ sec: 0, min: this.state.min + 1 });
      } else {
        return this.setState({ sec: 0, min: 0, hour: this.state.hour + 1 });
      }
    }, 1000);
  };

  _stopTimer = () => {
    // console.log("stop");
    clearInterval(this.state.setIntervalId);
  };

  _resetTimer = () => {
    // console.log("clear");
    clearInterval(this.setIntervalId);
    this.setState({ hour: 0, min: 0, sec: 0 });
  };

  render() {
    const { hour, min, sec } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={{ fontSize: 60 }}>
            {(hour < 10 ? `0${hour}` : hour) +
              ":" +
              (min < 10 ? `0${min}` : min) +
              ":" +
              (sec < 10 ? `0${sec}` : sec)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startBtn]}
            onPress={this._startTimer}
          >
            <Text>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.stopBtn]}
            onPress={this._stopTimer}
          >
            <Text>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.resetBtn]}
            onPress={this._resetTimer}
          >
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  timerContainer: {
    height: 150,
    width: 400,
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    height: 50,
    width: 400,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    margin: 10,
    padding: 5
  }
});
