import React from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage
} from "react-native";
import { DocumentPicker, FileSystem, Icon } from "expo";
import ScoreForm from "./ScoreForm";
import Layout from "../constants/Layout";
import Score from "./Score";
import uuidv1 from "uuid/v1";

export default class ScoreList extends React.Component {
  state = {
    newId: uuidv1(),
    composer: null,
    title: null,
    comment: null,
    fileUri: null,
    isFileUploaded: false,

    scores: [],
    selectedFile: null,
    formOpened: false,
    isLoaded: false
  };

  componentDidMount() {
    this._getScores();
  }

  _toggleForm = () => {
    this.setState({
      formOpened: !this.state.formOpened,
      composer: null,
      title: null,
      comment: null,
      fileUri: null,
      isFileUploaded: false
    });
  };

  _getScores = async () => {
    try {
      const scores = await AsyncStorage.getItem("scores");
      const parsedScores = JSON.parse(scores);
      this.setState({
        isLoaded: true,
        scores: parsedScores || []
      });
    } catch (err) {
      console.log(err);
    }
  };

  _changeComposer = text => {
    this.setState({ composer: text });
  };

  _changeTitle = text => {
    this.setState({ title: text });
  };

  _changeComment = text => {
    this.setState({ comment: text });
  };

  _chooseFile = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync();
      if (picked.type === "cancel") {
        return;
      } else if (picked.type === "success") {
        console.log(picked.uri);
        const fileUri = `${FileSystem.documentDirectory}-${
          this.state.newId
        }.pdf`;
        const downloaded = await FileSystem.downloadAsync(picked.uri, fileUri);
        // const read = await FileSystem.readAsStringAsync(downloaded.uri);
        // const json = JSON.parse(read);
        console.log(downloaded);
        this.setState({ fileUri: downloaded.uri, isFileUploaded: true });
      } else {
        return;
      }
    } catch (error) {
      console.log("Error!", error);
    }
  };

  _handleSubmit = () => {
    // add new score object
    if (this.state.fileUri) {
      const newScore = {
        id: this.state.newId,
        composer: this.state.composer,
        title: this.state.title,
        comment: this.state.comment,
        fileUri: this.state.fileUri
      };

      let newScores = this.state.scores.concat(newScore);
      this.setState(
        {
          scores: newScores,
          formOpened: false,
          composer: "",
          title: "",
          comment: "",
          fileUri: null
        },
        () => {
          this._saveScores(this.state.scores);
        }
      );
    } else {
      this._showAlert();
    }
  };

  _showAlert = () => {
    Alert.alert(
      "Alert",
      "Please select the score",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  _saveScores = scores => {
    AsyncStorage.setItem("scores", JSON.stringify(scores));
  };

  _deleteScore = id => {
    scores = this.state.scores.filter(score => score.id !== id);
    this.setState({ scores: scores }, () =>
      this._saveScores(this.state.scores)
    );
  };

  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Score</Text>
          <TouchableOpacity style={styles.addButton} onPress={this._toggleForm}>
            <Icon.MaterialCommunityIcons name={"plus-outline"} size={40} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scoreList}>
          {this.state.scores.map(score => (
            <Score
              key={score.id}
              {...score}
              openFile={this.props.openFile}
              deleteScore={this._deleteScore}
            />
          ))}
        </ScrollView>

        {this.state.formOpened ? (
          <ScoreForm
            composer={this.state.composer}
            title={this.state.title}
            comment={this.state.comment}
            isFileUploaded={this.state.isFileUploaded}
            toggleForm={this._toggleForm}
            chooseFile={this._chooseFile}
            changeComposer={this._changeComposer}
            changeTitle={this._changeTitle}
            changeComment={this._changeComment}
            handleSubmit={this._handleSubmit}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    // width: Layout.window.width * 0.2,
    height: Layout.window.height * 0.1,

    marginTop: 30,
    marginLeft: Layout.window.width * 0.05,
    marginRight: Layout.window.width * 0.05,
    justifyContent: "center", //vertically centered
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    width: Layout.window.width * 0.2,
    fontSize: 40,
    // backgroundColor: "blue",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  addButton: {
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 5
    // backgroundColor: "red"
  },
  scoreList: {
    marginTop: 10,
    borderTopWidth: 2,
    borderColor: "lightgrey",
    width: Layout.window.width * 0.9,
    alignSelf: "center"
  }
});
// success result

// 10:16
// Object {
//   "name": "Blank.pages",
//   "size": 73666,
//   "type": "success",
//   "uri": "file:///var/mobile/Containers/Data/Application/F6AA5605-91DA-450D-BE17-9C334ACA7B23/Library/Caches/ExponentExperienceData/%2540minha%252Ftest/DocumentPicker/3A28A1C0-AA8F-47C4-9066-D9E9699C60B8.pages",
// }

// failed result
// Object {
//   "type": "cancel",
// }
