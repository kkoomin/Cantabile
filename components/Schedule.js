import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";

// props: data(id, date, time, content, memo, starred)
export default class Schedule extends React.Component {
  render() {
    const star = (
      <Icon.AntDesign
        name={"star"}
        size={20}
        style={{ color: "#910D01" }}
        onPress={this._toggleStarred}
      />
    );

    const unstar = (
      <Icon.AntDesign
        name={"staro"}
        size={20}
        style={{ color: "grey" }}
        onPress={this._toggleStarred}
      />
    );
    const { data, toggleScheduleDetail } = this.props;
    return (
      <View style={styles.scheduleContainer}>
        {data ? (
          <>
            <Text style={[styles.scheduleText, styles.starred]}>
              {data.starred ? star : unstar}
            </Text>
            <Text
              style={[styles.scheduleText, styles.content]}
              multiline={true}
            >
              {data.content}
            </Text>
            <Text style={[styles.scheduleText, styles.time]}>{data.time}</Text>
            <Icon.Ionicons
              name={"ios-list"}
              style={[styles.scheduleText, styles.detailBtn]}
              onPress={() => toggleScheduleDetail(data)}
            />
          </>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scheduleContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "lightgrey"
  },
  scheduleText: {
    padding: 5,
    margin: 10,
    fontSize: 20,
    fontFamily: "vollkorn-regular"
  },
  starred: {
    marginLeft: 10,
    marginRight: 10
  },
  content: {
    width: Layout.window.width * 0.5
  },
  time: {
    marginRight: 20,
    width: Layout.window.width * 0.1
  },
  detailBtn: {
    marginRight: 15,
    fontSize: 25,
    fontFamily: "vollkorn-regular"
  }
});
