import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  AsyncStorage,
  Alert
} from "react-native";
import Layout from "../constants/Layout";
import PasswordForm from "./PasswordForm";

export default class PersonalSetting extends React.Component {
  state = {
    isPasswordOn: false,
    isRemoveOn: false,
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

  render() {
    const { isPasswordOn, isRemoveOn, isFormOpened } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Personal Setting</Text>
        <View style={styles.passwordSet}>
          <Text style={styles.passwordSetTitle}>| Set Password</Text>
          <Switch onValueChange={this._switchOnChange} value={isPasswordOn} />
        </View>
        <View style={styles.removeSet}>
          <Text style={styles.removeDataSetTitle}>| Remove All Data</Text>
          <Switch onValueChange={this._removeAlert} value={isRemoveOn} />
        </View>

        {isPasswordOn && isFormOpened ? (
          <PasswordForm
            handleSubmit={this._handleSubmit}
            toggleForm={this._toggleForm}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Layout.window.width * 0.05
  },
  pageTitle: {
    fontSize: 40,
    alignSelf: "center",
    marginBottom: Layout.window.height * 0.03
  },
  passwordSet: {
    width: "100%",
    padding: Layout.window.width * 0.01,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  removeSet: {
    width: "100%",
    padding: Layout.window.width * 0.01,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  passwordSetTitle: {
    fontSize: 30
  },
  removeDataSetTitle: {
    fontSize: 30
  }
});
