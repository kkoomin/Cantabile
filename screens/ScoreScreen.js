import React from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { Icon } from "expo";
import MetronomeDrawer from "./MetronomeDrawer";

const { height } = Dimensions.get("window").height;

export default class LinksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Score",
      headerRight: (
        // <Button onPress={() => params.toggleDrawer()} title="🎵" color="#000" />
        <Icon.MaterialCommunityIcons
          name={"metronome"}
          size={28}
          style={{ marginRight: 10, marginTop: 5 }}
          onPress={() => params.toggleDrawer()}
        />
      )
    };
  };

  state = {
    drawerOpen: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ toggleDrawer: this._toggleDrawer });
  }

  _toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { drawerOpen } = this.state;
    return (
      <View style={styles.container}>
        <PDFReader
          source={{
            uri:
              "file:///Users/minhak/Development/Final%20Project/Cantabile/assets/Brahms_-_Symphony_No1_in_C_Op68_(cello-part)a.pdf"
          }}
        />
        {drawerOpen ? <MetronomeDrawer /> : null}
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
