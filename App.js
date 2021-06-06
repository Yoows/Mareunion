import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListReunion from "./ListReunion";
import { Icon } from "react-native-elements";
import AddReu from "./addReu";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer initialRouteName="Ma réu">
      <Stack.Navigator>
        <Stack.Screen
          name="Ma Réu"
          component={ListReunion}
          options={{
            headerStyle: {
              backgroundColor: "#3d84f5",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: (props) => (
              <Icon
                name="filter-list"
                type="material"
                color="white"
                style={{ width: 45 }}
              />
            ),
          }}
        />
        <Stack.Screen name="Ajouter une réunion" component={AddReu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
