import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import Login from "./components/Login";

export default class App extends React.Component {
  state = {
    isLocked: false,
    timers: []
  };

  componentDidMount() {
    this._getTimers();
    this._getLockScreen();
    // AsyncStorage.clear();
  }

  _getLockScreen = async () => {
    const password = await AsyncStorage.getItem("password");
    if (password) {
      const passwordObj = JSON.parse(password);
      if (passwordObj.isLocked) this.setState({ isLocked: true });
    }
  };

  // Login Fn
  _handleSubmit = async args => {
    try {
      const password = await AsyncStorage.getItem("password");
      const passwordObj = JSON.parse(password);
      if (
        passwordObj.password ===
        `${args.password1}${args.password2}${args.password3}${args.password4}`
      ) {
        this.setState({ isLocked: false });
      } else {
        alert("Please check your password again.");
        this.setState({ isLocked: true });
      }
    } catch (err) {
      console.log(err);
    }

    this.setState({ isLoggedIn: true });
  };

  // Timer sending Fn
  handleTimerSave = () => {
    this._getTimers();
  };

  _getTimers = async () => {
    try {
      const timers = await AsyncStorage.getItem("timers");
      const parsedTimers = JSON.parse(timers);
      this.setState({
        timers: parsedTimers || []
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { timers, isLoggedIn, isLocked } = this.state;
    return (
      <View style={styles.container}>
        {!isLocked ? (
          <AppNavigator
            screenProps={{
              timers: timers,
              togglePlaying: this._togglePlaying,
              handleTimerSave: this.handleTimerSave,
              isDataDeleted: this.state.isDataDeleted,
              toggleDataDelete: this._toggleDataDelete
            }}
          />
        ) : (
          <Login handleSubmit={this._handleSubmit} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});
