import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";
import Setting from "../components/Setting";
import Recorder from "../components/Recorder";
import Metronome from "../components/Metronome";

// screenProps : isDataDeleted, toggleDataDelete
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Setting"
  };

  state = {
    isRecorderOpen: true,
    isSettingOpen: false
  };

  _toggleRecorder = () => {
    this.setState({
      isRecorderOpen: true,
      isSettingOpen: false
    });
  };
  _toggleSetting = () => {
    this.setState({
      isSettingOpen: true,
      isRecorderOpen: false
    });
  };

  _handleSubmit = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isRecorderOpen, isSettingOpen } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.metronomeContainer}>
          <Metronome
            isMetronomePlaying={this.props.screenProps.isMetronomePlaying}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.btnDiv,
                {
                  borderRightWidth: isRecorderOpen ? 0 : 1,
                  borderColor: "grey"
                  // backgroundColor: isRecorderOpen ? "#910D01" : "white"
                }
              ]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={this._toggleRecorder}
              >
                <Icon.MaterialCommunityIcons
                  name={"record-rec"}
                  size={75}
                  style={{
                    alignSelf: "center",
                    padding: 0,
                    margin: 10
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.btnDiv,
                {
                  borderRightWidth: isSettingOpen ? 0 : 1,
                  borderTopWidth: 1,
                  borderColor: "grey"
                  // backgroundColor: isSettingOpen ? "#910D01" : "white"
                }
              ]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={this._toggleSetting}
              >
                <Icon.MaterialCommunityIcons
                  name={"settings-outline"}
                  size={75}
                  style={{
                    alignSelf: "center",
                    padding: 0,
                    margin: 10
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.componentContainer}>
            {isRecorderOpen ? <Recorder /> : null}
            {isSettingOpen ? <Setting /> : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  metronomeContainer: {
    height: Layout.window.height * 0.35,
    width: Layout.window.width,
    alignItems: "center",
    justifyContent: "center"
  },
  mainContainer: {
    borderColor: "grey",
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "row"
  },
  buttonContainer: {
    width: Layout.window.width * 0.15,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff"
  },
  btnDiv: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 100,
    width: 100
  },
  componentContainer: {
    width: Layout.window.width * 0.85
  }
});
