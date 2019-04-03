import React from "react";
import {
  Dimensions,
  Platform,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from "react-native";
import { Icon } from "expo";

const { width, height } = Dimensions.get("window");

// props: data
export default class Schedule extends React.Component {
  state = {
    starred: this.props.data.starred
  };

  _toggleStarred = () => {
    this.setState({ starred: !this.state.starred });
  };

  render() {
    const star = (
      <Icon.AntDesign
        name={"star"}
        size={20}
        style={{ color: "red" }}
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
    const { starred } = this.state;

    return (
      <View style={styles.scheduleContainer}>
        {data ? (
          <>
            <Text style={[styles.scheduleText, styles.starred]}>
              {starred ? star : unstar}
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
    fontSize: 18
  },
  starred: {
    marginLeft: 10,
    marginRight: 10
    // borderWidth: 1
  },
  content: {
    width: width * 0.5
    // borderWidth: 1
  },
  time: {
    marginRight: 20,
    width: width * 0.1
    // borderWidth: 1
  },
  detailBtn: {
    marginRight: 15,
    fontSize: 25
    // borderWidth: 1
  }
});

// lined: { 형광펜 효과
//   padding: 10,
//   margin: 10,
//   marginRight: 30,
//   backgroundColor: "lightpink"
// }
