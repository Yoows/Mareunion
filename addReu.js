import { StatusBar } from "expo-status-bar";
import React from "react";
import http from "./httpService";
import { Alert } from "react-native";
import { Formik } from "formik";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ReactChipsInput from "react-native-chips";
import RNPickerSelect from "react-native-picker-select";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default class AddReu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reunions: [],
      duration: "",
      time: "12:00:00",
      visibility: false,
    };
  }
  componentDidMount() {
    fetch("http://mareu.herokuapp.com/api/v1/rooms/free-rooms")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          reunions: responseJson._embedded.roomList,
        });
        let result = this.state.reunions.map(({ name, roomId }) => ({
          label: name,
          value: roomId.toString(),
        }));
        this.setState({ freeRooms: result });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }
  handleChange = (obj) => {
    this.setState({ participants: obj });
  };
  handleConfirm = (date) => {
    this.setState({ Datedisplay: date });
  };
  onPressCancel = () => {
    this.setState({ visibility: false });
  };
  onPressButton = () => {
    this.setState({ visibility: true });
  };

  render() {
    const alertSuccess = () =>
      Alert.alert("Ma réu", "Votre réunion a bien été ajoutée.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    const alertFailure = () =>
      Alert.alert("Ma réu", "Il y a une erreur veuillez reéssayer.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    return (
      <Formik
        initialValues={{
          time: "12:00:00",
          room: {
            roomId: "",
          },
          subject: "",
          duration: "",
          participants: [],
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(data);
          // Make a async call
          http
            .post("http://mareu.herokuapp.com/api/v1/meetings", data)
            .then(function (response) {
              console.log(response);
            });
            this.props.navigation.push("Ma Réu",{ reload: true })
            
          setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmitting,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.viewcontainer}>
                  <Text style={styles.label}>Sujet Réunion</Text>
                  <TextInput
                    placeholder="eg: Réunion A"
                    onChangeText={handleChange("subject")}
                    name="subject"
                    style={styles.simpleInput}
                  />
                </View>
                <View style={styles.viewcontainer}>
                  <Text style={styles.label}>Heure Réunion</Text>
                  <TextInput
                    placeholder="hh:mm:ss"
                    name="time"
                    value={values.time}
                    onChangeText={handleChange("time")}
                    style={styles.simpleInput}
                  />
                </View>
                <View style={styles.viewcontainer}>
                  <Text style={styles.label}>Durée Réunion</Text>
                  <TextInput
                    placeholder="eg: 40"
                    name="duration"
                    onChangeText={handleChange("duration")}
                    keyboardType="numeric"
                    style={styles.simpleInput}
                  />
                </View>
                <View style={styles.viewcontainer}>
                  <Text style={styles.labelSelect}>Lieu Réunion</Text>
                  <RNPickerSelect
                    name="roomId"
                    onValueChange={(itemValue, itemIndex) => {
                      setFieldValue("room.roomId", itemValue);
                      this.setState({ roomId: itemValue });
                    }}
                    items={this.state.reunions.map((obj) => ({
                      key: obj.roomId,
                      label: obj.name,
                      value: obj.roomId,
                    }))}
                  />
                </View>
                <View>
                  <ReactChipsInput
                    label="Liste Participants"
                    initialChips={["toto@gmail.com"]}
                    onChangeChips={(chips) => {
                      console.log(chips);
                      const result = chips.map((email) => ({ email }));
                      console.log(result);
                      var newObj = Object.assign({}, result);
                      console.log(newObj);
                      setFieldValue("participants", result);
                      this.setState({ participants: result });
                    }}
                    alertRequired={false}
                    chipStyle={{
                      borderColor: "grey",
                      backgroundColor: "D3D3D3",
                    }}
                    labelStyle={styles.label}
                    inputStyle={styles.chipsInput}
                    labelOnBlur={{ color: "#666" }}
                    name="participants"
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  simpleInput: {
    backgroundColor: "#D3D3D3",
    width: width - 40,
    height: 40,
    borderColor: "#D3D3D3",
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  chipsInput: {
    backgroundColor: "#D3D3D3",
    width: width - 40,
    height: 40,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    marginTop: 30,
  },
  buttonSave: {
    backgroundColor: "#3d84f5",
    width: width - 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
    flexDirection: "column",
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#D3D3D3",
    width: width - 40,
    height: 40,
  },
  viewcontainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 4,
  },
  labelSelect: {
    fontWeight: "bold",
    marginBottom: 4,
    width: width - 40,
    height: 20,
  },
});
