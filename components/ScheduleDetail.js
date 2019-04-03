import React, { Component } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import Layout from "../constants/Layout";

export default class ScheduleDetail extends Component {
  render() {
    const { toggleScheduleDetail, data } = this.props;
    return (
      <Modal style={{ padding: 100 }} transparent={true} animationType="slide">
        <View style={styles.innerContainer}>
          <Text>{data.date}</Text>
          <View style={styles.closeBtnContainer}>
            <Button
              color="#841584"
              onPress={() => toggleScheduleDetail()}
              title="Close"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "white",
    height: "50%",
    width: "80%",
    padding: Layout.window.width * 0.05,
    position: "absolute",
    alignSelf: "center",
    bottom: "30%",
    justifyContent: "center"
  },
  closeBtnContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center"
  }
});
