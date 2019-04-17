import React, { Component } from "react";
import {
  Text,
  Modal,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Layout from "../constants/Layout";
import { Icon } from "expo";

export default class ScoreForm extends Component {
  render() {
    const {
      composer,
      title,
      comment,
      isFileUploaded,
      toggleForm,
      chooseFile,
      changeComment,
      changeComposer,
      changeTitle,
      handleSubmit
    } = this.props;

    return (
      <Modal
        style={{ padding: 100 }}
        animationType="slide"
        onRequestClose={toggleForm}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.formTitle}>Add New Score</Text>
          <TextInput
            style={styles.formInput}
            returnKeyType={"done"}
            placeholder="Composer"
            placeholderTextColor={"#999"}
            value={composer}
            onChangeText={text => changeComposer(text)}
          />
          <TextInput
            style={[styles.formInput, styles.textArea]}
            returnKeyType={"done"}
            placeholder="Title"
            placeholderTextColor={"#999"}
            value={title}
            onChangeText={text => changeTitle(text)}
          />
          <TextInput
            style={[styles.formInput, styles.textArea]}
            multiline={true}
            returnKeyType={"done"}
            placeholder="Additional Comment for this score"
            placeholderTextColor={"#999"}
            value={comment}
            onChangeText={text => changeComment(text)}
          />
          <TouchableOpacity style={styles.chooseFileBtn} onPress={chooseFile}>
            <Text
              style={{
                fontSize: 18,
                alignSelf: "center",
                fontFamily: "vollkorn-regular"
              }}
            >
              {isFileUploaded ? "File Uploaded" : "Select Score"}
            </Text>
            <Icon.Ionicons
              name={"ios-arrow-down"}
              size={30}
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectScoreConfirm}
            onPress={handleSubmit}
          >
            <Text style={styles.selectScoreConfirmBtn}>Confirm</Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.closeBtnContainer}
            onPress={toggleForm}
          >
            <Icon.Ionicons name={"md-close"} size={40} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "50%",
    width: "80%",
    padding: Layout.window.width * 0.05,
    position: "absolute",
    alignSelf: "center",
    bottom: "25%",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    flex: 1
  },
  innerContainer: {
    height: "50%",
    width: "100%"
  },
  formTitle: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "vollkorn-regular"
  },
  formInput: {
    margin: 10,
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 2,
    fontSize: 20,
    fontFamily: "vollkorn-regular"
  },
  selectScoreConfirm: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    padding: 10,
    width: 120,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center"
  },
  selectScoreConfirmBtn: {
    fontSize: 18,
    color: "#910D01",
    fontFamily: "vollkorn-bold"
  },
  closeBtnContainer: {
    position: "absolute",
    bottom: Layout.window.height * 0.15,
    alignSelf: "center",
    alignItems: "center",
    width: 50
  },
  chooseFileBtn: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    width: "95%"
  }
});
