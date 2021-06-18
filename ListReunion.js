import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import Reulign from "./ReunionLign";
import { FloatingAction } from "react-native-floating-action";
import http from "./httpService";
import { deleteMeeting } from "./meetingService";
const actions = [
  {
    text: "Ajouter une réunion",
    icon: require("./assets/ic_white.png"),
    name: "btn_add",
    position: 1,
    color: "red",
  },
];

export default class ListReunion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reunions: [],
    
    };
    this.navigation = props.navigation;
  }
  componentDidMount() {
    fetch("http://mareu.herokuapp.com/api/v1/meetings")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          reunions: responseJson._embedded.meetingList,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }
  

  handleDelete = async (reunion) => {
    const originalReunions = this.state.reunions;
    const reunions = originalReunions.filter(
      (m) => m.meetingId !== reunion.meetingId
    );
    this.setState({ reunions });
    try {
      await deleteMeeting(reunion);
    } catch (error) {
      if (error.response && error.response.status == 404) {
        console.log("Error Occured");
        this.setState({ reunions: originalReunions });
      }
    }
  };

  render() {
    
    if (this.state.reunions.length === 0)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Aucune réunion prévue actuellement.
          </Text>
          <FloatingAction
          actions={actions}
          color={"red"}
          onPressItem={(name) => {
            if (name == "btn_add") {
              this.navigation.navigate("Ajouter une réunion");
            }
          }}
        />
        </View>
        
      );
    return (
      <View key={this.state.uniqueValue} style={styles.container}>
        <FlatList
          data={this.state.reunions}
          style={styles.listStyle}
          renderItem={({ item }) => (
            <Reulign
              salle={item.room.name}
              participants={item.participants.map((e) => e.email).join(", ")}
              reunionName={item.subject}
              reunionTime={item.time}
              onDelete={() => this.handleDelete(item)}
            />
          )}
          keyExtractor={(item) => item.meetingId.toString()}
        ></FlatList>
        <FloatingAction
          actions={actions}
          color={"red"}
          onPressItem={(name) => {
            if (name == "btn_add") {
              this.navigation.navigate("Ajouter une réunion");
            }
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  listStyle: {},
});
