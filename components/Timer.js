import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Alert
} from "react-native";
import DateFormat from "../constants/DateFormat";
import Layout from "../constants/Layout";

export default class Timer extends React.Component {
  state = {
    timers: [],
    setIntervalId: 0,
    isCounting: false,
    hour: 0,
    min: 0,
    sec: 0,
    isCurrentLoaded: false
  };

  _toggleTimer = () => {
    this.setState({ isCounting: !this.state.isCounting });
  };

  _startTimer = () => {
    this.setState({ isCounting: true });
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
    this.setState({ isCounting: false }, () => {
      clearInterval(this.state.setIntervalId);
    });
  };

  _resetTimer = () => {
    clearInterval(this.setIntervalId);
    this.setState({ hour: 0, min: 0, sec: 0 });
  };

  _saveTimer = () => {
    let timers = this.props.timers;
    const newTimer = {
      date: DateFormat.scheduleDate(this.props.currentDay),
      hour: this.state.hour < 10 ? `0${this.state.hour}` : this.state.hour,
      min: this.state.min < 10 ? `0${this.state.min}` : this.state.min,
      sec: this.state.sec < 10 ? `0${this.state.sec}` : this.state.sec
    };

    let newTimers;
    if (timers.find(timer => timer.date === newTimer.date)) {
      newTimers = timers.map(timer => {
        if (timer.date === newTimer.date) {
          newTimer.sec = parseInt(newTimer.sec) + parseInt(timer.sec);
          newTimer.min =
            newTimer.sec < 60
              ? parseInt(newTimer.min) + parseInt(timer.min)
              : parseInt(newTimer.min) + parseInt(timer.min) + 1;
          newTimer.hour =
            newTimer.min < 60
              ? parseInt(newTimer.hour) + parseInt(timer.hour)
              : parseInt(newTimer.hour) + parseInt(timer.hour) + 1;

          newTimer.sec > 60 ? newTimer.sec - 60 : newTimer.sec;
          newTimer.min > 60 ? newTimer.min - 60 : newTimer.min;

          newTimer.sec = newTimer.sec < 10 ? `0${newTimer.sec}` : newTimer.sec;
          newTimer.min = newTimer.min < 10 ? `0${newTimer.min}` : newTimer.min;
          newTimer.hour =
            newTimer.hour < 10 ? `0${newTimer.hour}` : newTimer.hour;

          timer = newTimer;
        }
        return timer;
      });
    } else {
      newTimers = timers.concat(newTimer);
    }

    this.setState({ timers: newTimers }, () => {
      this._saveTimerInStorage(this.state.timers);
    });

    Alert.alert(
      "Alert",
      "Saved! Do you want to reset the timer?",
      [
        {
          text: "Reset",
          onPress: () => this._resetTimer()
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  _saveTimerInStorage = timers => {
    AsyncStorage.setItem("timers", JSON.stringify(timers), () =>
      this.props.handleTimerSave()
    );
  };

  render() {
    const { hour, min, sec, isCounting } = this.state;

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
          {isCounting ? (
            <TouchableOpacity
              style={[styles.button, styles.stopBtn]}
              onPress={this._stopTimer}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.startBtn]}
              onPress={this._startTimer}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.resetBtn]}
            onPress={this._resetTimer}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveBtn]}
            onPress={this._saveTimer}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    justifyContent: "space-around"
  },
  button: {
    margin: 5,
    padding: 5,
    width: Layout.window.width * 0.15
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 20
  }
});
