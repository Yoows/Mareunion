import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Reulign from "./ReunionLign";
import { FloatingAction } from "react-native-floating-action";
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
      reunions: [
        {
          id: "1",
          salle: "Peach",
          participants: "Liste des participants",
          reunion_Time: "14H00",
          reunion_name: "Réunion A",
        },
        {
          id: "2",
          salle: "Mario",
          participants: "Liste des participants",
          reunion_Time: "16H00",
          reunion_name: "Réunion B",
        },
        {
          id: "3",
          salle: "Luidji",
          participants: "Liste des participants",
          reunion_Time: "19H00",
          reunion_name: "Réunion C",
        },
      ],
    };
    this.navigation = props.navigation;
  }
  componentDidMount() {
    // fetch(
    //   "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=sNSoTLuim2yaEwOoh7msGlEAalSYVgCt"
    // )
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       stories: responseJson.results,
    //     });
    //   })
    //   .catch((error) => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.reunions}
          style={styles.listStyle}
          renderItem={({ item }) => (
            <Reulign
              salle={item.salle}
              participants={item.participants}
              reunionName={item.reunion_name}
              reunionTime={item.reunion_Time}
            />
          )}
          keyExtractor={(item) => item.id}
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
