import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  View
} from "react-native";
import { Font } from "expo";
import { Calendar } from "react-native-calendars";
import Schedule from "../components/Schedule";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleDetail from "../components/ScheduleDetail";
import DateFormat from "../constants/DateFormat";
import Layout from "../constants/Layout";
import PracticeHours from "../components/PracticeHours";

const SchduleData = [
  {
    id: 1,
    date: "2019-05-01",
    time: "14:30",
    content: "Lesson: @Seoul.uni /w Mrs.Kim",
    starred: false,
    memo: null
  },
  {
    id: 2,
    date: "2019-05-01",
    time: null,
    content: "Call to Lim (about camp)",
    starred: true,
    memo: null
  },
  {
    id: 3,
    date: "2019-04-03",
    time: "17:20",
    content: "Music Competition",
    starred: true,
    memo: null
  },
  {
    id: 4,
    date: "2019-04-03",
    time: "10:45",
    content:
      "Go to music store to buy new string, Go to music store to buy new string, Go to music store to buy new string",
    starred: false,
    memo: null
  },
  {
    id: 5,
    date: "2019-04-03",
    time: "10:45",
    content:
      "Go to music store to buy new string, Go to music store to buy new string, Go to music store to buy new string, Go to music store to buy new stringGo to music store to buy new stringGo to music store to buy new stringGo to music store to buy new stringGo to music store to buy new string",
    starred: false,
    memo: null
  }
];

const PracticeTimeData = [
  {
    id: 1,
    date: "2019-04-03",
    hours: "02:10:45"
  }
];

export default class CalendarScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Calendar"
    };
  };

  state = {
    fontLoaded: false,
    weekSelect: false,
    selectedDateObj: null,
    selectedDateString: undefined,
    formOpened: false,
    detailOpened: false,
    selectedSchedule: null
  };

  async componentDidMount() {
    let current_datetime = new Date();

    await Font.loadAsync({
      "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
    });
    this.setState({
      fontLoaded: true,
      selectedDateObj: {
        [DateFormat.scheduleDate(current_datetime)]: {
          selected: true,
          selectedColor: "#B83925",
          date: DateFormat.scheduleDate(current_datetime)
        }
      },
      selectedDateString: DateFormat.scheduleDate(current_datetime)
    });
  }

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

  render() {
    const {
      formOpened,
      detailOpened,
      selectedDateObj,
      selectedDateString,
      selectedSchedule
    } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          detailOpened || formOpened
            ? { backgroundColor: "rgba(0,0,0,0.2)" }
            : ""
        ]}
      >
        {this.state.fontLoaded && !detailOpened && !formOpened ? (
          <Calendar
            onDayPress={day => {
              this.setState(
                {
                  selectedDateObj: {
                    [day.dateString]: {
                      selected: true,
                      selectedColor: "#B83925",
                      date: day.dateString
                    }
                  },
                  selectedDateString: day.dateString
                },
                () => {
                  console.log(selectedDateObj);
                }
              );
            }}
            onDayLongPress={day => {
              console.log("selected day", day);
            }}
            markedDates={selectedDateObj}
            onMonthChange={() => this.setState({ selectedDateObj: null })}
            monthFormat={"yyyy / MM"}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={0} // week starts from Sunday.
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            style={styles.calendar}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "black",
              monthTextColor: "#910D01",
              textDayFontFamily: "space-mono",
              textMonthFontFamily: "space-mono",
              textDayHeaderFontFamily: "space-mono",
              textMonthFontWeight: "bold",
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16
            }}
          />
        ) : null}
        {!formOpened ? (
          <>
            <View style={styles.daySchedule}>
              {selectedDateObj
                ? PracticeTimeData.filter(
                    data => data.date === Object.values(selectedDateObj)[0].date
                  ).map((data, index) => (
                    <PracticeHours key={`${data.date}-${index}`} data={data} />
                  ))
                : null}

              <ScrollView>
                {selectedDateObj
                  ? SchduleData.filter(
                      data =>
                        data.date === Object.values(selectedDateObj)[0].date
                    ).map((data, index) => (
                      <Schedule
                        key={`${data.date}-${index}`}
                        data={data}
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
        ) : (
          <ScheduleForm
            toggleScheduleForm={this._toggleScheduleForm}
            selectedDateString={selectedDateString}
          />
        )}
        {detailOpened ? (
          <ScheduleDetail
            toggleScheduleDetail={this._toggleScheduleDetail}
            data={selectedSchedule}
          />
        ) : null}
      </ScrollView>
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
    marginTop: 20
  },
  scheduleCreateBtnText: {
    fontSize: 20,
    color: "#910D01"
  }
});
