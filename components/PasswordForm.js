import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";

export default class PasswordForm extends Component {
  state = {
    password1: null,
    password2: null,
    password3: null,
    password4: null
  };

  render() {
    const { password1, password2, password3, password4 } = this.state;
    const { handleSubmit, toggleForm } = this.props;

    return (
      <Modal
        style={{ padding: 100 }}
        animationType="slide"
        onRequestClose={toggleForm}
      >
        <View style={styles.container}>
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordTitle}>ENTER NEW PASSWORD</Text>
            <View style={styles.inputFields}>
              <TextInput
                style={{ fontSize: 20 }}
                autoFocus
                ref={input => {
                  this.field_1 = input;
                }}
                placeholder={"●"}
                value={password1 ? "🎵" : null}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({ password1: text });
                  this.field_2.focus();
                }}
              />
              <TextInput
                style={{ fontSize: 20 }}
                ref={input => {
                  this.field_2 = input;
                }}
                placeholder={"●"}
                value={password2 ? "🎵" : null}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({ password2: text });
                  this.field_3.focus();
                }}
              />
              <TextInput
                style={{ fontSize: 20 }}
                ref={input => {
                  this.field_3 = input;
                }}
                placeholder={"●"}
                value={password3 ? "🎵" : null}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({ password3: text });
                  this.field_4.focus();
                }}
              />
              <TextInput
                style={{ fontSize: 20 }}
                ref={input => {
                  this.field_4 = input;
                }}
                placeholder={"●"}
                value={password4 ? "🎵" : null}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({ password4: text }, () =>
                    handleSubmit({ ...this.state })
                  );
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.closeBtnContainer}
              onPress={() => toggleForm()}
            >
              <Icon.Ionicons name={"md-close"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  passwordContainer: {
    width: Layout.window.width * 0.6,
    height: Layout.window.height * 0.4,
    borderWidth: 1,
    borderRadius: 40,
    padding: Layout.window.height * 0.05,
    alignSelf: "center",
    justifyContent: "center"
  },
  closeBtnContainer: {
    alignSelf: "center",
    marginTop: Layout.window.height * 0.05
  },
  passwordTitle: {
    fontSize: 25,
    alignSelf: "center",
    marginBottom: Layout.window.height * 0.05,
    fontFamily: "vollkorn-regular"
  },
  inputFields: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
