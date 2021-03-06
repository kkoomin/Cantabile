import React from "react";
import { StyleSheet } from "react-native";
import Layout from "../constants/Layout";
import { Calendar } from "react-native-calendars";

export default class CalendarContainer extends React.Component {
  render() {
    const {
      onDayPress,
      onMonthChange,
      selectedDateObj,
      markedDates
    } = this.props;
    return (
      <Calendar
        onDayPress={day => onDayPress(day)}
        markedDates={{ ...markedDates, ...selectedDateObj }}
        onMonthChange={() => onMonthChange()}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={0} // week starts from Sunday.
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        style={styles.calendar}
        theme={{
          "stylesheet.day.basic": {
            base: {
              width: 30,
              height: Layout.window.height * 0.04,
              alignItems: "center"
            },
            selected: {
              backgroundColor: "#910D01",
              borderRadius: 20,
              width: 40,
              height: 40
            },
            dot: {
              width: 6,
              height: 6,
              marginTop: 1,
              borderRadius: 3,
              opacity: 0
            }
          },
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#910D01",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#910D01",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "black",
          monthTextColor: "#910D01",
          // textDayFontFamily: "vollkorn-regular",
          textMonthFontFamily: "vollkorn-bold",
          textDayHeaderFontFamily: "vollkorn-regular",
          textMonthFontWeight: "normal",
          textDayFontSize: 20,
          textMonthFontSize: 25,
          textDayHeaderFontSize: 16
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    width: Layout.window.width - 180,
    marginTop: Layout.window.height * 0.02,
    marginBottom: 20
  }
});
