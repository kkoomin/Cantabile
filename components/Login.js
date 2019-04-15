import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Icon } from "expo";
import Layout from "../constants/Layout";

export default class Login extends React.Component {
  state = {
    password1: null,
    password2: null,
    password3: null,
    password4: null
  };

  render() {
    const { password1, password2, password3, password4 } = this.state;
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/music_paper.png")}
          style={styles.imageBackground}
          imageStyle={{ resizeMode: "contain" }}
        >
          <View style={styles.passwordContainer}>
            <TextInput
              ref={input => {
                this.field_1 = input;
              }}
              autoFocus
              placeholder={"●"}
              value={password1 ? "🎵" : null}
              keyboardType={"numeric"}
              onChangeText={text => {
                this.setState({ password1: text });
                this.field_2.focus();
              }}
            />
            <TextInput
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
          <Text style={styles.introText}>
            Please enter your 4 digit password
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Layout.window.width * 0.5,
    height: 150,
    // backgroundColor: "pink",
    alignSelf: "center",
    position: "absolute",
    top: Layout.window.height * 0.1
  },
  imageBackground: {
    width: Layout.window.width,
    height: Layout.window.height * 0.3,
    alignSelf: "center",
    position: "absolute",
    top: Layout.window.height * 0.2
  },
  introText: {
    alignSelf: "center",
    fontSize: 25,
    color: "grey",
    position: "absolute",
    top: Layout.window.height * 0.25
  }
});
