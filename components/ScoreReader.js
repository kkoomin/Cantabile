import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { KeepAwake } from "expo";
import PDFReader from "rn-pdf-reader-js";

const { height } = Dimensions.get("window").height;

export default class ScoreReader extends React.Component {
  state = {
    uri: null
  };

  componentDidMount() {
    this.setState({ uri: this.props.uri });
  }
  _toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  render() {
    return (
      <View style={styles.container}>
        <KeepAwake />
        <PDFReader
          source={{
            uri: this.props.uri
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height
  }
});
