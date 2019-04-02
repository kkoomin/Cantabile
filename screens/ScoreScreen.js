import React from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { Constants } from "expo";

const { height } = Dimensions.get("window").height;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Score",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="🎵"
        color="#000"
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <PDFReader
          source={{
            uri:
              "file:///Users/minhak/Development/Final%20Project/Cantabile/assets/Brahms_-_Symphony_No1_in_C_Op68_(cello-part)a.pdf"
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
