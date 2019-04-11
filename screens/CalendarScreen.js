import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  View,
  AsyncStorage
} from "react-native";
import { Font } from "expo";
import { Calendar } from "react-native-calendars";
import Schedule from "../components/Schedule";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleDetail from "../components/ScheduleDetail";
import DateFormat from "../constants/DateFormat";
import Layout from "../constants/Layout";
import PracticeHours from "../components/PracticeHours";
import uuidv1 from "uuid/v1";
import CalendarContainer from "../components/CalendarContainer";

export default class CalendarScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Calendar"
    };
  };

  state = {
    // fontLoaded: false,
    selectedDateObj: null, // Line 149 format
    selectedDateString: undefined, // ex) "2019-04-01"

    formOpened: false,
    detailOpened: false,

    selectedDateObj: null,
    selectedSchedule: null,

    schedules: [],
    isSchedulesLoaded: false,

    markedDates: {}
  };

  componentDidMount() {
    //font 받으려면 async 앞에 붙여야함
    let current_datetime = new Date();

    // await Font.loadAsync({
    //   "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
    // });
    // AsyncStorage.clear();
    this._getSchedules().then(() => {
      this.setState({
        fontLoaded: true,
        selectedDateObj: {
          [DateFormat.scheduleDate(current_datetime)]: {
            selected: true,
            selectedColor: "#910D01",
            marked: Object.keys(this.state.markedDates).includes(
              DateFormat.scheduleDate(current_datetime)
            )
              ? true
              : false,
            dotColor: "white",
            date: DateFormat.scheduleDate(current_datetime)
          }
        },
        selectedDateString: DateFormat.scheduleDate(current_datetime)
      });
    });
  }

  // TOGGLE STATES
  _toggleScheduleForm = () => {
    this.setState({ formOpened: !this.state.formOpened });
  };

  _toggleScheduleDetail = data => {
    if (this.state.detailOpened) {
      this.setState({ selectedSchedule: null, detailOpened: false });
    } else {
      this.setState({ selectedSchedule: data, detailOpened: true });
    }
  };

  // SCHEDULE FORM FUNCTIONS
  _handleSubmit = (date, time, content, memo) => {
    const newId = uuidv1();
    const newSchedule = {
      id: newId,
      date: date,
      time: time,
      content: content,
      memo: memo,
      starred: false
    };
    let newSchedules = [newSchedule].concat(this.state.schedules);
    this.setState({ schedules: newSchedules }, () => {
      this._saveSchedules(this.state.schedules);
    });
  };

  _updateSchedule = (id, content, memo) => {
    let schedules = this.state.schedules;
    updatedSchedules = schedules.map(schedule => {
      if (schedule.id === id) {
        schedule.content = content;
        schedule.memo = memo;
      }
      return schedule;
    });
    this._saveSchedules(updatedSchedules);
  };

  _updateScheduleStar = id => {
    let schedules = this.state.schedules;
    updatedSchedules = schedules.map(schedule => {
      if (schedule.id === id) {
        schedule.starred = !schedule.starred;
      }
      return schedule;
    });
    this._saveSchedules(updatedSchedules);
  };

  _saveSchedules = newSchedules => {
    AsyncStorage.setItem("schedules", JSON.stringify(newSchedules), () => {
      this._getSchedules();
    });
  };

  _getSchedules = async () => {
    try {
      const schedules = await AsyncStorage.getItem("schedules");
      const parsedSchedules = JSON.parse(schedules);
      this.setState(
        {
          isSchedulesLoaded: true,
          schedules: parsedSchedules || []
        },
        () => {
          let markedDates = {};
          this.state.schedules.map(schedule => {
            markedDates[schedule.date] = {
              selected: false,
              marked: true,
              dotColor: "#B83925",
              date: schedule.date
            };
          });
          this.setState({
            markedDates: markedDates
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  _deleteSchedule = id => {
    let schedules = this.state.schedules;
    updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    this._saveSchedules(updatedSchedules);
    this._toggleScheduleDetail();
  };

  // Calendar Function
  _onDayPress = day => {
    this.setState(
      {
        selectedDateObj: {
          [day.dateString]: {
            selected: true,
            selectedColor: "#B83925",
            marked: Object.keys(this.state.markedDates).includes(day.dateString)
              ? true
              : false,
            dotColor: "white",
            date: day.dateString
          }
        },
        selectedDateString: day.dateString
      },
      () => {
        console.log(this.state.selectedDateObj);
      }
    );
  };

  _onMonthChange = () => {
    this.setState({ selectedDateObj: null });
  };

  render() {
    const {
      formOpened,
      detailOpened,
      selectedDateObj,
      selectedDateString,
      selectedSchedule,
      schedules,
      isSchedulesLoaded,
      markedDates
    } = this.state;

    return (
      <View
        style={[
          styles.container,
          detailOpened || formOpened ? { backgroundColor: "rgba(0,0,0,0)" } : ""
        ]}
      >
        {this.state.fontLoaded && !detailOpened && !formOpened ? (
          <CalendarContainer
            selectedDateObj={selectedDateObj}
            markedDates={markedDates}
            onDayPress={this._onDayPress}
            onMonthChange={this._onMonthChange}
          />
        ) : null}
        {!formOpened && !detailOpened ? (
          <>
            <View style={styles.daySchedule}>
              {selectedDateObj ? (
                <PracticeHours
                  data={this.props.screenProps.timers.find(
                    timer =>
                      timer.date === Object.values(selectedDateObj)[0].date
                  )}
                />
              ) : null}
              <ScrollView>
                {selectedDateObj && isSchedulesLoaded
                  ? schedules
                      .filter(
                        schedule =>
                          schedule.date ===
                          Object.values(selectedDateObj)[0].date
                      )
                      .map(scheduleObj => (
                        <Schedule
                          key={scheduleObj.id}
                          data={scheduleObj}
                          toggleScheduleDetail={this._toggleScheduleDetail}
                        />
                      ))
                  : null}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.scheduleCreateBtn}
              onPress={this._toggleScheduleForm}
            >
              <Text style={styles.scheduleCreateBtnText}>
                Create new schedule
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        {formOpened ? (
          <ScheduleForm
            toggleScheduleForm={this._toggleScheduleForm}
            selectedDateString={selectedDateString}
            handleSubmit={this._handleSubmit}
          />
        ) : null}
        {detailOpened ? (
          <ScheduleDetail
            toggleScheduleDetail={this._toggleScheduleDetail}
            updateSchedule={this._updateSchedule}
            updateScheduleStar={this._updateScheduleStar}
            deleteSchedule={this._deleteSchedule}
            data={selectedSchedule}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  calendar: {
    width: Layout.window.width - 180,
    marginTop: Layout.window.height * 0.04,
    marginBottom: 20
  },
  daySchedule: {
    flex: 1,
    width: Layout.window.width - 150,
    // borderWidth: 1,
    paddingTop: 20
  },
  scheduleCreateBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgrey",
    padding: 10,
    width: 250,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  scheduleCreateBtnText: {
    fontSize: 20,
    color: "#910D01"
  }
});
