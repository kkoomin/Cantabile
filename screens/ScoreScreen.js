import React from "react";
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Icon } from "expo";
import ScoreList from "../components/ScoreList";
import ScoreReader from "../components/ScoreReader";

export default class ScoreScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Score",
      headerLeft: (
        <TouchableOpacity style={{ width: 50, height: "100%" }}>
          <Icon.Ionicons
            name={params.scoreOpened ? "ios-arrow-back" : null}
            size={28}
            style={{ marginLeft: 10, marginTop: 5 }}
            onPress={() => params.toggleFileState()}
          />
        </TouchableOpacity>
      )
    };
  };

  state = {
    scores: null,
    scoreSelected: false,
    fileURI: null
  };

  componentDidMount() {
    this.props.navigation.setParams({
      togglePlaying: this._togglePlaying,
      toggleFileState: this._toggleFileState,
      scoreOpened: false
    });
  }

  _togglePlaying = () => {
    this.props.screenProps.togglePlaying();
  };

  _toggleFileState = () => {
    this.setState({ scoreSelected: false });
    this.props.navigation.setParams({
      scoreOpened: false
    });
  };

  _openFile = uri => {
    this.setState({ fileURI: uri, scoreSelected: true });
    this.props.navigation.setParams({
      scoreOpened: true
    });
  };

  render() {
    const { drawerOpen, scoreSelected, fileURI } = this.state;
    return (
      <View style={styles.container}>
        {scoreSelected ? (
          <ScoreReader uri={fileURI} />
        ) : (
          <ScoreList
            toggleFileState={this._toggleFileState}
            openFile={this._openFile}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
