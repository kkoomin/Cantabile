import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Drawer from "react-native-drawer";
import Metronome from "../components/Metronome";

export default class MetronomeDrawer extends React.Component {
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    return (
      <Drawer>
        <Metronome />
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({});
