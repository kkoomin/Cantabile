import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Layout from "../constants/Layout";
import DateFormat from "../constants/DateFormat";
import { Icon } from "expo";

// props: data(id, date, time, content, memo, starred)
export default class ScheduleDetail extends Component {
  state = {
    isEditing: false,
    content: this.props.data.content, // title of schedule
    memo: this.props.data.memo // additional note of schedule
  };

  _toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  _updateComplete = () => {
    this.props.updateSchedule(
      this.props.data.id,
      this.state.content,
      this.state.memo
    );
    this._toggleEdit();
    this.props.toggleScheduleDetail();
  };

  _changeContent = text => {
    this.setState({ content: text });
  };

  _changeMemo = text => {
    this.setState({ memo: text });
  };

  render() {
    const {
      toggleScheduleDetail,
      updateScheduleStar,
      deleteSchedule,
      data
    } = this.props;
    const { isEditing, content, memo } = this.state;
    const star = (
      <Icon.AntDesign
        name={"star"}
        size={25}
        style={{ color: "red" }}
        onPress={this._toggleStarred}
      />
    );

    const unstar = (
      <Icon.AntDesign
        name={"staro"}
        size={25}
        style={{ color: "grey" }}
        onPress={this._toggleStarred}
      />
    );
    return (
      <Modal style={{ padding: 100 }} transparent={true} animationType="slide">
        <View style={styles.innerContainer}>
          <View style={styles.mainDateContainer}>
            <Text style={styles.mainDate}>
              {DateFormat.stringDate(new Date(data.date))}
            </Text>
            <TouchableOpacity
              style={styles.starred}
              onPress={() => updateScheduleStar(data.id)}
            >
              {data.starred ? star : unstar}
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.content}
                  returnKeyType={"done"}
                  placeholder="Schedule Name"
                  placeholderTextColor={"#999"}
                  autoFocus={true}
                  value={content}
                  onChangeText={this._changeContent}
                />
                <TextInput
                  style={styles.memo}
                  multiline={true}
                  returnKeyType={"done"}
                  placeholder="Additional Note"
                  placeholderTextColor={"#999"}
                  value={memo}
                  onChangeText={this._changeMemo}
                />
              </>
            ) : (
              <>
                <Text style={styles.content}>{data.content}</Text>
                <Text style={styles.memo}>{data.memo}</Text>
              </>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={isEditing ? this._updateComplete : this._toggleEdit}
            >
              <Text style={[styles.button, styles.editBtn]}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteSchedule(data.id)}>
              <Text style={[styles.button, styles.deleteBtn]}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.closeBtnContainer}>
            <Button onPress={() => toggleScheduleDetail()} title="Close" />
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
    borderRadius: 50,
    borderWidth: 1
  },
  closeBtnContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-end",
    width: Layout.window.width * 0.15
  },
  button: {
    padding: 10,
    fontSize: 16,
    width: 70
  },
  mainDateContainer: {
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    width: Layout.window.width * 0.7,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mainDate: {
    marginLeft: 10,
    fontSize: 25
  },
  starred: {
    // backgroundColor: "red",
    alignItems: "center",
    width: 50,
    marginLeft: 5,
    marginBottom: 0,
    marginTop: 9,
    padding: 0
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "red",
    borderBottomWidth: 2,
    borderColor: "lightgrey"
  },
  content: {
    fontSize: 20
  },
  memo: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    color: "#584d4d"
  }
});
