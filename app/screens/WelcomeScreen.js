import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";

import EvilIcons from "@expo/vector-icons/EvilIcons";

import { useFonts } from "expo-font";

function WelcomeScreen(props) {
  const [fontsLoaded] = useFonts({
    "Rajdhani-Regular": require("../assets/Fonts/Rajdhani-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.borderContainer}>
        <View style={styles.heroContainer}>
          <Text style={styles.logoText}>FridgeLink</Text>
          <Image
            style={styles.imageConfig}
            source={require("../assets/FridgeLinkLogo.png")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            // onPress={() => props.navigation.navigate("Login")}
            title={"Let's go!"}
            color={"#FF9D43"}
          />
          <EvilIcons
            style={styles.icon}
            name="chevron-right"
            size={40}
            color="#FF9D43"
          />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    zIndex: 1,
    fontFamily: "Rajdhani-Regular",
    color: "#FF9D43",
    fontSize: 50,
    textAlign: "center",
  },

  borderContainer: {
    width: "90%",
    flex: 1,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#FF9D43",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageConfig: {
    width: 300,
    height: 350,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#FF9D43",
    marginBottom: "20%",
    justifyContent: "center",
  },

  logoContainer: {
    flex: 0.5,
  },

  icon: {
    left: 20,
  },

  heroContainer: {
    marginTop: "30%",
  },
});

export default WelcomeScreen;
