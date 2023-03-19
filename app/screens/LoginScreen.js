import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";

function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../assets/Fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={styles.heroContainer}>
      <View style={styles.container}>
        <Image
          style={styles.imageConfig}
          source={require("../assets/FridgeLinkLogo.png")}
        ></Image>
        <Text style={styles.selectText}> Please Select One</Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("NeedFood")}
        >
          <Text style={styles.textDriver}>Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textDonator}>Donator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textOrganizer}>Organizer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    flex: 1,
  },

  heroButton: {
    justifyContent: "space-evenly",
  },

  textDriver: {
    fontSize: 15,
    fontFamily: "Lato-Regular",
    color: "#3A6FBF",
    textAlign: "center",
  },

  textDonator: {
    fontSize: 15,
    fontFamily: "Lato-Regular",
    color: "#DA009D",
    textAlign: "center",
  },

  textOrganizer: {
    fontSize: 15,
    fontFamily: "Lato-Regular",
    color: "#F4B000",
    textAlign: "center",
  },

  container: {
    flex: 0.8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },

  buttonContainer: {
    borderWidth: 1,
    borderColor: "light-black",
    width: "90%",
    borderRadius: 1000,
    padding: 10,
  },

  imageConfig: {
    width: 120,
    height: 150,
  },

  selectText: {
    fontFamily: "Lato-Regular",
    color: "#888383",
    fontSize: 30,
    textAlign: "center",
  },
});

export default LoginScreen;
