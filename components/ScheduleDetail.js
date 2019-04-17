import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Layout from "../constants/Layout";
import DateFormat from "../constants/DateFormat";
import { Icon } from "expo";
import ScheduleForm from "./ScheduleForm";

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

  _toggleScheduleForm = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const {
      toggleScheduleDetail,
      updateScheduleStar,
      deleteSchedule,
      data
    } = this.props;
    const { isEditing } = this.state;
    const star = (
      <Icon.AntDesign name={"star"} size={25} style={{ color: "#910D01" }} />
    );

    const unstar = (
      <Icon.AntDesign name={"staro"} size={25} style={{ color: "grey" }} />
    );
    // console.log(data.starred);
    return (
      <Modal style={{ padding: 100 }} transparent={true} animationType="slide">
        <View style={styles.innerContainer}>
          <View style={styles.mainDateContainer}>
            <Text style={styles.mainDate}>
              {DateFormat.stringDate(new Date(data.date))} | {data.time}
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
              <ScheduleForm
                toggleScheduleForm={this._toggleScheduleForm}
                updateSchedule={this.props.updateSchedule}
                data={this.props.data}
              />
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
              <Text style={[styles.button, styles.editBtn]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteSchedule(data.id)}>
              <Text style={[styles.button, styles.deleteBtn]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={toggleScheduleDetail}
        >
          <Icon.Ionicons name={"md-close"} size={40} />
        </TouchableOpacity>
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
    bottom: Layout.window.height * 0.15,
    alignSelf: "center",
    alignItems: "center",
    width: 50
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
    width: 70,
    fontFamily: "vollkorn-regular"
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
    fontSize: 25,
    fontFamily: "vollkorn-regular"
  },
  starred: {
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
    borderBottomWidth: 2,
    borderColor: "lightgrey"
  },
  content: {
    fontSize: 20,
    fontFamily: "vollkorn-regular"
  },
  memo: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "vollkorn-regular",
    color: "#584d4d"
  }
});
