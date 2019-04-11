import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio, Permissions } from "expo";
import PitchFinder from "pitchfinder";
import Layout from "../constants/Layout";

export default class Recorder extends React.Component {
  state = {
    isPermitted: false,
    isRecording: false,
    recording: null,
    fileUrl: null,
    isPlaying: false
  };

  componentDidMount() {
    this._getRecordingPermissions();
    this.setState({
      pitchFinder: new PitchFinder.YIN({ sampleRate: this.state.sampleRate })
    });
  }

  async _getRecordingPermissions() {
    let permissionStatus = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    if (permissionStatus.status === "granted") {
      console.log("granted", permissionStatus);
      this.setState({ isPermitted: true });
    } else {
      console.log("error", permissionStatus);
    }
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
    });
  }

  _recording = async () => {
    const recording = new Audio.Recording();
    recording.setProgressUpdateInterval(200);

    try {
      preparing = await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      if (preparing.canRecord === true) {
        await recording.startAsync(); // You are now recording!
        console.log("recording");
        this.setState({ recording: recording });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _stopRecording = async () => {
    try {
      await this.state.recording.stopAndUnloadAsync();
    } catch (error) {
      console.log(error);
    }

    // if (this.state.recording) {
    //   const fileUrl = this.state.recording.getURI();
    //   this.state.recording.setOnRecordingStatusUpdate(null);
    //   this.setState({ recording: null, fileUrl: fileUrl }, () =>
    //     console.log(this.state.recording, this.state.fileUrl)
    //   );
    // }
  };

  _play = () => {
    if (!this.state.isPlaying && this.state.recording !== null) {
      recorded = this.state.recording.createNewLoadedSoundAsync({
        shouldPlay: true
      });
      this.setState({ isPlaying: true });
      console.log(recorded);
    }
    // } else {
    //   this.state.recording.stopAsync();
    //   this.setState({ isPlaying: false });
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.recordingBtnContainer}
          onPress={this._recording}
        >
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordingBtnContainer}
          onPress={this._stopRecording}
        >
          <Text>Stop</Text>
        </TouchableOpacity>
        <Text>============</Text>
        <TouchableOpacity
          style={styles.recordingBtnContainer}
          onPress={this._play}
        >
          <Text>{this.state.isPlaying ? "Stop" : "Play"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  recordingBtnContainer: {
    padding: 10,
    backgroundColor: "pink",
    width: Layout.window.width * 0.2,
    alignSelf: "center",
    alignItems: "center",
    margin: 10
  }
});
