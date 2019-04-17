import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Slider } from "react-native";
import { Icon, Audio, Permissions } from "expo";
import Layout from "../constants/Layout";

export default class Recorder extends React.Component {
  state = {
    isPermitted: false,
    isRecording: false,
    recording: null, // recording obj
    fileUrl: null, // recorded file url
    isPlaying: false,
    isSeeking: false, // playback slider
    shouldCorrectPitch: true,
    volume: 1.0,
    rate: 1.0,
    muted: false,
    soundPosition: null,
    soundDuration: null,
    recordingDuration: null,
    shouldPlay: false
  };

  async componentDidMount() {
    this._getRecordingPermissions();
  }
  async _getRecordingPermissions() {
    let permissionStatus = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    if (permissionStatus.status === "granted") {
      // console.log("granted", permissionStatus);
      this.setState({ isPermitted: true });
    } else {
      alert("Enable microphone access to use recorder.");
    }
  }

  _toggleRecording = () => {
    if (!this.state.isRecording) {
      this._startRecording();
    } else {
      this._stopRecording();
    }
  };

  _startRecording = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
    });

    const recording = new Audio.Recording();
    recording.setProgressUpdateInterval(200);

    try {
      preparing = await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      if (preparing.canRecord === true) {
        await recording.startAsync(); // You are now recording!
        // console.log(recording);
        this.setState({ recording: recording, isRecording: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _stopRecording = async () => {
    try {
      await this.state.recording.stopAndUnloadAsync(); // stop recording
      const {
        sound,
        status
      } = await this.state.recording.createNewLoadedSoundAsync(
        {
          isLooping: true,
          isMuted: this.state.muted,
          volume: this.state.volume,
          rate: this.state.rate,
          shouldCorrectPitch: this.state.shouldCorrectPitch
        },
        this._updateScreenForSoundStatus
      );
      this.sound = sound;
      this.status = status;

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: false,
        allowsRecordingIOS: false, //disable recording
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        playThroughEarpieceAndroid: false
      });
      this.setState({ isRecording: false });
    } catch (error) {
      console.log(error);
    }
  };

  _play = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
        console.log("PAUSED");
        this.setState({ isPlaying: false });
      } else {
        this.sound.playAsync();
        console.log("PAUSE..PLAYED");
        this.setState({ isPlaying: true });
      }
    }
  };

  _updateScreenForSoundStatus = status => {
    // console.log("UPDATING SCREEN FOR SOUND STATUS", status);
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis, // recorded file seconds
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false
      });
      if (status.error) {
        Alert(status.error);
      }
    }
  };

  _onSliderValueChange = value => {
    // console.log("SEEK SLIDER VALUE", value);
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.playThisPosition = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const foundPosition = value * this.state.soundDuration;
      if (this.playThisPosition) {
        this.sound.playFromPositionAsync(foundPosition);
      } else {
        this.sound.setPositionAsync(foundPosition);
      }
    }
  };

  _getSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _formatDuration(ms) {
    const totalSeconds = ms / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const formattedNum = num => {
      const string = num.toString();
      if (num < 10) {
        return `0${string}`;
      }
      return string;
    };
    return `${formattedNum(minutes)}:${formattedNum(seconds)}`;
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._formatDuration(
        this.state.soundPosition
      )} / ${this._formatDuration(this.state.soundDuration)}`;
    }
    return "";
  }

  _createNewRecording = () => {
    this.sound.stopAsync();
    this.setState({ isPlaying: false });
    this.sound = null;
    this.status = null;
  };

  render() {
    const { isRecording } = this.state;
    return (
      <View style={styles.container}>
        {this.sound ? (
          <View style={styles.playingContainer}>
            <Icon.Ionicons
              name={"ios-recording"}
              size={100}
              style={{ margin: 5, justifyContent: "center" }}
            />
            <Slider
              style={{ alignSelf: "stretch" }}
              minimumTrackTintColor="#bbb"
              maximumTrackTintColor="#910D01"
              value={this._getSliderPosition()}
              onValueChange={this._onSliderValueChange}
              onSlidingComplete={this._onSliderSlidingComplete}
            />
            <Text style={styles.timestamp}>{this._getPlaybackTimestamp()}</Text>
            <View style={styles.playBtnContainer}>
              <TouchableOpacity style={styles.playBtn} onPress={this._play}>
                <Text style={styles.playBtnText}>
                  {this.state.isPlaying ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={this._createNewRecording}
              >
                <Text style={styles.playBtnText}>New Recording</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.recordingBtnContainer}
              onPress={this._toggleRecording}
            >
              {isRecording ? (
                <Icon.Foundation
                  name={"stop"}
                  color={"#910D01"}
                  size={100}
                  style={{ margin: 5, justifyContent: "center" }}
                />
              ) : (
                <Icon.Ionicons
                  name={"ios-recording"}
                  color={"#910D01"}
                  size={100}
                  style={{ margin: 5, justifyContent: "center" }}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.recorderTitle}>Petit Recorder</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  recorderTitle: {
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "vollkorn-bold"
  },
  recordingBtnContainer: {
    paddingTop: 10,
    width: 160,
    height: 160,
    margin: 20,
    borderColor: "lightgrey",
    borderRadius: 80,
    borderWidth: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  playBtnContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center"
  },
  playBtn: {
    width: Layout.window.width * 0.2,
    height: 50,
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "grey",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  playBtnText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "vollkorn-regular"
  },
  playingContainer: {
    alignSelf: "center",
    alignItems: "center",
    width: Layout.window.width * 0.3,
    height: Layout.window.height * 0.3,
    backgroundColor: "white"
  },
  timestamp: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "vollkorn-regular"
  }
});
