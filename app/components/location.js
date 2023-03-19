import React from "react";
import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";

function location({ locations }) {
  console.log(locations.vicinity);

  return (
    <View style={styles.middleContainer}>
      <Text>{locations ? locations.vicinity : "Toronto"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export { location };
