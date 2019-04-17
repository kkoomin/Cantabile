import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  AsyncStorage,
  Alert,
  Linking
} from "react-native";
import Layout from "../constants/Layout";
import PasswordForm from "./PasswordForm";

export default class PersonalSetting extends React.Component {
  state = {
    isPasswordOn: false,
    isRemoveOn: false,
    isLinkOn: false,
    isFormOpened: false
  };

  componentDidMount() {
    this._getPasswordStatus();
  }

  _getPasswordStatus = async () => {
    const password = await AsyncStorage.getItem("password");
    if (password) {
      const passwordObj = JSON.parse(password);
      if (passwordObj.isLocked) this.setState({ isPasswordOn: true });
    }
  };

  _switchOnChange = () => {
    if (this.state.isPasswordOn) {
      this.setState({ isPasswordOn: false });
      AsyncStorage.removeItem("password");
    } else {
      this.setState({ isPasswordOn: true, isFormOpened: true });
    }
  };

  _handleSubmit = args => {
    const passwordObj = {
      password: `${args.password1}${args.password2}${args.password3}${
        args.password4
      }`,
      isLocked: true
    };
    AsyncStorage.setItem("password", JSON.stringify(passwordObj));
    this._toggleForm();
    this.setState({ isPasswordOn: true });
  };

  _toggleForm = () => {
    this.setState({
      isFormOpened: !this.state.isFormOpened,
      isPasswordOn: false
    });
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

  _removeData = () => {
    AsyncStorage.clear();
    this.setState({ isRemoveOn: true });
    Alert.alert(
      "Alert",
      "All data deleted! Please restart the app.",
      [
        {
          text: "OK",
          onPress: () => console.log("deleted!")
        }
      ],
      { cancelable: false }
    );
  };

  _linkToIMSLP = () => {
    Linking.openURL("https://imslp.org/");
  };

  render() {
    const { isPasswordOn, isRemoveOn, isLinkOn, isFormOpened } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Personal Setting</Text>
        <View style={styles.optionSet}>
          <Text style={styles.setTitle}>| Set Password</Text>
          <Switch
            onValueChange={this._switchOnChange}
            value={isPasswordOn}
            trackColor={{ false: "lightgrey", true: "#910D01" }}
          />
        </View>
        <View style={styles.optionSet}>
          <Text style={styles.setTitle}>| Remove All Data</Text>
          <Switch
            onValueChange={this._removeAlert}
            value={isRemoveOn}
            trackColor={{ false: "lightgrey", true: "#910D01" }}
          />
        </View>
        <View style={styles.optionSet}>
          <Text style={styles.setTitle}>| Open IMSLP</Text>
          <Switch
            onValueChange={this._linkToIMSLP}
            value={isLinkOn}
            trackColor={{ false: "lightgrey", true: "#910D01" }}
          />
        </View>

        {isPasswordOn && isFormOpened ? (
          <PasswordForm
            handleSubmit={this._handleSubmit}
            toggleForm={this._toggleForm}
          />
        ) : null}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"Cantabile"</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.window.width * 0.07
  },
  pageTitle: {
    fontSize: 35,
    alignSelf: "center",
    marginBottom: Layout.window.height * 0.03,
    fontFamily: "vollkorn-bold"
  },
  optionSet: {
    width: "100%",
    padding: Layout.window.width * 0.01,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  setTitle: {
    fontSize: 25,
    fontFamily: "vollkorn-regular"
  },
  quoteContainer: {
    position: "absolute",
    bottom: 3,
    margin: 10,
    alignSelf: "center"
  },
  quote: {
    fontSize: 18,
    color: "grey",
    fontFamily: "vollkorn-regular"
  }
});
