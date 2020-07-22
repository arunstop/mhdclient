import React, { Component } from "react";
import { Text, StyleSheet,View } from "react-native";

class AClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: "This is not really a bird nest."
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {this.state.titleText}
            {"\n"}
            {"\n"}
          </Text>
          <Text numberOfLines={5}>{this.state.bodyText}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default AClassScreen;