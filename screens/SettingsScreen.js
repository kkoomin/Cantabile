import React from "react";
import Setting from "../components/Setting";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Setting"
  };

  render() {
    return <Setting />;
  }
}
