import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";

export default class Reulign extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOnclick}>
        <View style={styles.row}>
          <Icon
            style={{ width: 80 }}
            name="lens"
            size={50}
            type="material"
            color="#b09a1e"
          />
          <View style={{ width: 250 }}>
            <Text style={styles.primaryText}>
              {this.props.reunionName} - {this.props.reunionTime} -{" "}
              {this.props.salle}
            </Text>
            <Text style={styles.secondaryText}>{this.props.participants}</Text>
          </View>
          <View style={styles.icon}>
            <Icon name="delete" type="material" color="black" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  secondaryText: { color: "grey" },
  avatar: {
    alignItems: "flex-start",
  },
});
