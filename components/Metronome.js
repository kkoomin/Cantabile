import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Slider } from "react-native";
import { Icon, Audio } from "expo";
import Layout from "../constants/Layout";

//https://snack.expo.io/BkX2ZNfmG
const source = require("../assets/Woodblock.wav");

export default class Metronome extends Component {
  state = {
    playingStatus: "Play",
    setIntervalID: 0,
    bpm: 60,
    sound: null
  };

  _timer = () => {
    let interval = (60 / this.state.bpm) * 1000;
    this.state.setIntervalID = setInterval(() => {
      this._play();
    }, interval);
  };

  async _play() {
    sound = await Audio.Sound.createAsync(
      source,
      {
        shouldPlay: true
      },
      (onPlaybackStatusUpdate = null),
      (downloadFirst = false)
    );
  }

  _stop = () => {
    clearInterval(this.state.setIntervalID);
  };

  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case "Play":
        this.setState({
          playingStatus: "Stop"
        });
        this._timer();
        break;
      case "Stop":
        this.setState({ playingStatus: "Play" });
        this._stop();
        break;
    }
  };

  _handleBpmChange = value => {
    this.setState({ bpm: value, playingStatus: "Play" }, () => {
      this._stop();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon.MaterialCommunityIcons
          name={"metronome"}
          size={130}
          color={"#000"}
          style={{ margin: 5 }}
        />
        <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
          <Text style={styles.buttonText}>{this.state.playingStatus}</Text>
        </TouchableOpacity>
        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={35}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={this.state.bpm}
          onValueChange={this._handleBpmChange}
          step="5"
        />
        <Text style={styles.bpmText}>{this.state.bpm} bpm</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#910D01"
  },
  button: {
    width: 200,
    height: 45,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "white",
    fontFamily: "vollkorn-regular"
  },
  bpmText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    fontFamily: "vollkorn-regular"
  }
});
