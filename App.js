import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    timers: [],
    isMetronomePlaying: false
  };

  componentDidMount() {
    this._getTimers();
    // AsyncStorage.clear();
  }

  handleTimerSave = () => {
    this._getTimers();
  };

  _togglePlaying = () => {
    this.setState({ isMetronomePlaying: !this.state.isMetronomePlaying });
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
    return (
      <View style={styles.container}>
        <AppNavigator
          screenProps={{
            timers: this.state.timers,
            togglePlaying: this._togglePlaying,
            handleTimerSave: this.handleTimerSave,
            isDataDeleted: this.state.isDataDeleted,
            toggleDataDelete: this._toggleDataDelete,
            isMetronomePlaying: this.state.isMetronomePlaying
          }}
        />
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
