import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "expo";
import Metronome from "./Metronome";
import Layout from "../constants/Layout";

export default class MetronomeDrawer extends React.Component {
  render() {
    const { toggleDrawer } = this.props;
    return (
      <Modal
        style={{ padding: 100 }}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleDrawer}
      >
        <TouchableOpacity onPress={toggleDrawer}>
          <View style={{ height: "70%" }} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Metronome />
          <TouchableOpacity
            style={styles.closeBtnContainer}
            onPress={toggleDrawer}
          >
            <Icon.Ionicons
              name={"ios-close-circle-outline"}
              size={40}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "30%",
    width: "100%",
    // padding: Layout.window.width * 0.05,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    justifyContent: "center",

    borderWidth: 1,
    flex: 1
  },
  closeBtnContainer: {
    position: "absolute",
    top: 20,
    right: 20
  }
});
