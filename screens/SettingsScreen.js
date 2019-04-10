import React from "react";
import Tuner from "../components/Tuner";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Tuner"
  };

  render() {
    return <Tuner />;
  }
}
