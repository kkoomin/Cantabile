import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class PracticeHours extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.practiceHours}>
        <Text style={styles.practiceHoursTitle}>
          {data === undefined ? "No practice on this day" : data.hours}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  practiceHours: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  practiceHoursTitle: {
    fontWeight: "600",
    fontSize: 25
  }
});
