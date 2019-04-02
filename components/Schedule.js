import React from "react";
import {
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from "react-native";

// props: data
export default class Schedule extends React.Component {
  render() {
    const { data, toggleScheduleForm } = this.props;
    return (
      <View style={styles.scheduleContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Text key={`${item.date}-${index}`}>{item.content}</Text>
            )}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scheduleContainer: {
    marginTop: 5
  }
});
