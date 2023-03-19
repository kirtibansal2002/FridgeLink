import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { API_KEY } from "../../config";
import { TouchableOpacity } from "react-native";
import { location as LocationComponent } from "../components/location";

export default function NeedFoodScreen() {
  const [location, setLocation] = useState(null);
  const [closest, setCloseset] = useState(null);
  useEffect(() => {
    const getDistance = async (lat1, long1, lat2, long2) => {
      const rest = await fetch(
        `https://routes.googleapis.com/directions/v2:computeRoutes`,
        {
          method: "POST",
          headers: {
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
          },
          body: JSON.stringify({
            origin: {
              location: { latLng: { latitude: lat1, longitude: long1 } },
            },
            destination: {
              location: { latLng: { latitude: lat2, longitude: long2 } },
            },
            travelMode: "DRIVE",
            languageCode: "en",
            units: "METRIC",
            departureTime: new Date(Date.now() + 60 * 1000).toISOString(),
            routingPreference: "TRAFFIC_AWARE",
          }),
        }
      );
      const data = await rest.json();
      console.log(data);
      return data.routes[0].distanceMeters;
    };
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const query = new URLSearchParams({
        location: `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`,
        radius: 50000,
        keyword: "CFTO Locations",
        key: API_KEY,
      });
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
          query.toString()
      );
      const data = await res.json();
      // console.log(data);
      const sorted = data.results.sort(async (a, b) => {
        return (
          (await getDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            b.geometry.location.lat,
            b.geometry.location.lng
          )) -
          (await getDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            a.geometry.location.lat,
            a.geometry.location.lng
          ))
        );
      });

      setCloseset(sorted.slice(0, 2));
    };
    getPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
      <View style={styles.middleContainer}>
        {closest &&
          closest.map((locations) => {
            return <LocationComponent locations={locations} />;
          })}
      </View>
      <TouchableOpacity></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "60%",
  },
  textMiddle: {
    fontSize: 20,
    fontWeight: "bold",
    alignText: "center",
  },

  middleContainer: {
    justifyContent: "center",
    flex: 1,
    marginBottom: 100,
  },
});
