import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage
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

  // componentDidMount() {
  //   this._getCurrent();
  // }

  // _getCurrent = async () => {
  //   try {
  //     const hour = await AsyncStorage.getItem("hour");
  //     const min = await AsyncStorage.getItem("min");
  //     const sec = await AsyncStorage.getItem("sec");
  //     this.setState({
  //       isCurrentLoaded: true,
  //       hour: hour || 0,
  //       min: min || 0,
  //       sec: sec || 0
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    let timers = this.state.timers;
    const newTimer = {
      date: DateFormat.scheduleDate(this.props.currentDay),
      hours:
        (this.state.hour < 10 ? `0${this.state.hour}` : this.state.hour) +
        ":" +
        (this.state.min < 10 ? `0${this.state.min}` : this.state.min) +
        ":" +
        (this.state.sec < 10 ? `0${this.state.sec}` : this.state.sec)
    };
    let newTimers = timers.find(timer => timer.date === newTimer.date)
      ? timers.map(timer => {
          if (timer.date === newTimer.date) {
            timer = newTimer;
          }
          return timer;
        })
      : timers.concat(newTimer);
    this.setState({ timers: newTimers }, () => {
      this._saveTimerInStorage(this.state.timers);
    });
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
