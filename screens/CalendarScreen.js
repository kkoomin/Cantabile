import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions
} from "react-native";
import { Permissions, Font } from "expo";
import { Calendar, CalendarList, Agenda, Arrow } from "react-native-calendars";
import Schedule from "../components/Schedule";
import ScheduleForm from "../components/ScheduleForm";

const { width, height } = Dimensions.get("window");
const SchduleData = [
  { id: 1, date: "2019-04-01", content: "first schedule" },
  { id: 2, date: "2019-04-01", content: "second schedule" },
  { id: 3, date: "2019-04-03", content: "third schedule" },
  { id: 4, date: "2019-04-03", content: "fourth schedule" } //date should be id
];
const DateData = [
  { id: 1, date: "2019-04-01", practice_hours: "03:00:23" },
  { id: 2, date: "2019-04-03", practice_hours: "02:48:23" }
];

let current_datetime = new Date();
let formatted_date = `${current_datetime.getFullYear()}-
${
  current_datetime.getMonth() < 10
    ? "0" + (current_datetime.getMonth() + 1)
    : current_datetime.getMonth() + 1
}-
${
  current_datetime.getDate() < 10
    ? "0" + current_datetime.getDate()
    : current_datetime.getDate()
}`;

export default class CalendarScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Calendar"
    };
  };

  state = {
    fontLoaded: false,
    weekSelect: false,
    dateSelected: {
      [formatted_date]: {
        selected: true,
        selectedColor: "#B83925",
        date: formatted_date
      }
    },
    formOpened: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  _toggleScheduleForm = () => {
    this.setState({ formOpened: !this.state.formOpened });
  };

  render() {
    const { formOpened, dateSelected } = this.state;
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <Calendar
            onDayPress={day => {
              this.setState(
                {
                  dateSelected: {
                    [day.dateString]: {
                      selected: true,
                      selectedColor: "#B83925",
                      date: day.dateString
                    }
                  }
                },
                () => {
                  console.log(this.state.dateSelected);
                }
              );
            }}
            markedDates={this.state.dateSelected} //'markedDates' property is expecting an object.
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log("selected day", day);
            }}
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
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        ) : null}
        {!formOpened ? (
          <>
            <View style={styles.daySchedule}>
              <View style={styles.practiceHours}>
                <Text style={styles.dayScheduleTitle}>Practice Hours</Text>
                <Text>03:00:23</Text>
              </View>
              <View>
                <Text style={styles.dayScheduleTitle}>Schedule</Text>
                <Schedule
                  data={SchduleData.filter(
                    data => data.date === Object.values(dateSelected)[0].date
                  )}
                  toggleScheduleForm={this._toggleScheduleForm}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.scheduleCreateBtn}
              onPress={this._toggleScheduleForm}
            >
              <Text>Create new schedule</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ScheduleForm toggleScheduleForm={this._toggleScheduleForm} />
        )}
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
    width: width - 50,
    marginTop: 20,
    marginBottom: 20
  },
  daySchedule: {
    width: width - 50,
    borderWidth: 1,
    padding: 10
  },
  dayScheduleTitle: {
    fontWeight: "600"
  },
  practiceHours: {
    marginTop: 5,
    marginBottom: 5
  },
  scheduleCreateBtn: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    width: 150,
    alignItems: "center",
    marginTop: 10
  }
});
