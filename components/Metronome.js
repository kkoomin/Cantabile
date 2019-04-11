import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Slider } from "react-native";
import { Icon, Audio } from "expo";
import Layout from "../constants/Layout";

//와 이게 플레이 되기는하네 ^^..
//https://snack.expo.io/BkX2ZNfmG
const source = require("../assets/Woodblock.wav");
export default class Metronome extends Component {
  state = {
    playingStatus: "Play",
    setIntervalID: 0,
    bpm: 60,
    sound: null
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

  _timer = () => {
    let interval = (60 / this.state.bpm) * 1000;
    this.state.setIntervalID = setInterval(() => {
      this._play();
    }, interval);
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
          size={100}
          style={{ margin: 5 }}
        />
        <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
          <Text style={styles.buttonText}>{this.state.playingStatus}</Text>
        </TouchableOpacity>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={35}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={this.state.bpm}
          onValueChange={this._handleBpmChange}
          step="5"
        />
        <Text style={{ fontSize: 20, color: "white" }}>
          {this.state.bpm} bpm
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.height * 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#910D01"
  },
  button: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
