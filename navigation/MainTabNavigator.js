import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "expo";
import Colors from "../constants/Colors";
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
  tabBarVisible: true,
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
    inactiveTintColor: "#ccc",
    labelStyle: { fontSize: 15 }
  },
  tabBarVisible: true,
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
    inactiveTintColor: "#ccc",
    labelStyle: { fontSize: 15 }
  },
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-musical-notes" : "md-musical-notes"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Tuner: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Tuner",
  tabBarOptions: {
    activeTintColor: "#910D01",
    inactiveTintColor: "#ccc",
    labelStyle: { fontSize: 15 }
  },
  tabBarVisible: true,
  tabBarIcon: ({ focused }) => (
    <Icon.MaterialCommunityIcons
      focused={focused}
      name={"tune-vertical"}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  )
};

export default createBottomTabNavigator({
  LogStack,
  ScoreStack,
  CalendarStack,
  SettingsStack
});
