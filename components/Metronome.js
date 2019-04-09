import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Constants, Audio } from "expo";

//와 이게 플레이 되기는하네 ^^..
// play, stop 버튼 분리하고 setInterval...
//https://snack.expo.io/BkX2ZNfmG
const source = require("../assets/Sticks.wav");

export default class Metronome extends Component {
  state = {
    playingStatus: "Waiting"
  };

  async _play() {
    const { sound } = await Audio.Sound.createAsync(
      source,
      {
        shouldPlay: true,
        isLooping: false
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      playingStatus: "Playing"
    });
  }

  _updateScreenForSoundStatus = status => {
    if (status.isPlaying && this.state.playingStatus !== "Playing") {
      this.setState({ playingStatus: "Playing" });
    }
    // } else if (!status.isPlaying && this.state.playingStatus === "Playing") {
    //   this.setState({ playingStatus: "Stop" });
    // }
  };

  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "Playing") {
        console.log("pausing...");
        await this.sound.pauseAsync();
        console.log("paused!");
        this.setState({
          playingStatus: "Stop"
        });
      } else {
        console.log("playing...");
        await this.sound.playAsync();
        console.log("playing!");
        this.setState({
          playingStatus: "Playing"
        });
      }
    }
    clearInterval(this.timer);
  }

  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "Playing") {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }

  timer = () => {
    setInterval(() => {
      this._play();
    }, 250);
  };

  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case "Waiting":
        this.timer();
        // this._play();
        break;
      case "Stop":
        clearInterval(this.timer);
        // this._play();
        break;
      //   case "Playing":
      //     this._pauseAndPlayRecording();
      //     break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
          <Text style={styles.buttonText}>{this.state.playingStatus}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this._pauseAndPlayRecording}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    height: 200
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
