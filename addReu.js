import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Picker,
} from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class AddReu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pravatar.cc/200",
          }}
        />

        <TextInput placeholder="Nom Réunion" style={styles.simpleInput} />
        <View style={styles.pickerContainer}>
          <Picker
            //selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            
          >
            <Picker.Item label="Peach" value="Peach" />
            <Picker.Item label="Luidji" value="Luidji" />
            <Picker.Item label="Mario" value="Mario" />
          </Picker>
        </View>

        <TextInput placeholder="Heure Réunion" style={styles.simpleInput} />

        <TextInput placeholder="Lieu Réunion" style={styles.simpleInput} />

        <TextInput
          placeholder="Liste participants"
          style={styles.bottomInput}
        />

        <TouchableOpacity style={styles.buttonSave}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  simpleInput: {
    width: width - 40,
    marginTop: 30,
    height: 40,
    borderColor: "#FF80AB",
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  bottomInput: {
    width: width - 40,
    marginTop: 30,
    height: 40,
    borderColor: "#FF80AB",
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 30,
  },

  textAreaInput: {
    width: width - 40,
    marginTop: 30,
    height: 100,
    borderColor: "#FF80AB",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 30,
  },

  buttonSave: {
    backgroundColor: "#FF80AB",
    borderRadius: 20,
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
