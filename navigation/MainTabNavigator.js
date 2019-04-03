import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CalendarScreen from "../screens/CalendarScreen";
import ScoreScreen from "../screens/ScoreScreen";
import LogScreen from "../screens/LogScreen";
import SettingsScreen from "../screens/SettingsScreen";

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: "Calendar",
  tabBarOptions: {
    activeTintColor: "#910D01",
    inactiveTintColor: "#ccc",
    labelStyle: { fontSize: 15 }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-calendar` : "md-calendar"}
    />
  )
};

const ScoreStack = createStackNavigator({
  Score: ScoreScreen
});

ScoreStack.navigationOptions = {
  tabBarLabel: "Score",
  tabBarOptions: {
    activeTintColor: "#910D01",
    inactiveTintColor: "#ccc"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-document" : "md-document"}
    />
  )
};

const LogStack = createStackNavigator({
  Log: LogScreen
});

LogStack.navigationOptions = {
  tabBarLabel: "Log",
  tabBarOptions: {
    activeTintColor: "#910D01",
    inactiveTintColor: "#ccc"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-musical-notes" : "md-musical-notes"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarOptions: {
    activeTintColor: "#910D01",
    inactiveTintColor: "#ccc"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  CalendarStack,
  ScoreStack,
  LogStack,
  SettingsStack
});
