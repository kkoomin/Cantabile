import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";

export default class Score extends React.Component {
  render() {
    const {
      id,
      composer,
      title,
      comment,
      fileUri,
      openFile,
      deleteScore
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openFile(fileUri)}>
          <View style={styles.score}>
            <Text style={[styles.text, styles.composerText]}>{composer}</Text>
            <View style={styles.scoreInfo}>
              <Text style={[styles.text, styles.titleText]}>{title}</Text>
              <Text style={[styles.text, styles.commentText]}>{comment}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteScore(id)}>
          <View style={styles.deleteBtn}>
            <Icon.MaterialCommunityIcons name={"delete-outline"} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    alignSelf: "center",
    width: Layout.window.width * 0.9
  },
  text: {
    padding: 5,
    margin: 5,
    fontSize: 20,
    fontFamily: "vollkorn-regular"
  },
  score: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  composerText: {
    width: Layout.window.width * 0.2
  },
  titleText: {
    width: Layout.window.width * 0.6,
    marginBottom: 0
  },
  commentText: {
    fontSize: 15,
    color: "grey",
    marginTop: 0
  },
  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  }
});
