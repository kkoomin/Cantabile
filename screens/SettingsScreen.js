import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Alert
} from "react-native";
import Recorder from "../components/Recorder";
import Metronome from "../components/Metronome";

// screenProps : isDataDeleted, toggleDataDelete
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Setting"
  };

  _removeAlert = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove all data? This process cannot be undone.",
      [
        {
          text: "Confirm",
          onPress: () => this._removeData()
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

  // _removeData = () => {
  //   AsyncStorage.clear();
  //   Alert.alert(
  //     "Alert",
  //     "All data deleted!",
  //     [
  //       {
  //         text: "OK",
  //         onPress: () => console.log("deleted!")
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={styles.clearDataBtnContainer}
          onPress={this._removeAlert}
        >
          <Text style={styles.clearDataBtn}>Remove all data</Text>
        </TouchableOpacity> */}
        <Recorder />
        <Metronome
          isMetronomePlaying={this.props.screenProps.isMetronomePlaying}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  clearDataBtnContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  clearDataBtn: {
    margin: 15,
    alignSelf: "center"
  }
});
