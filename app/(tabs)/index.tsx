import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { generateUsername } from "unique-username-generator";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import database from '../../node_modules/@react-native-firebase/database';
// import firebaseConfig from '../../firebaseConfig';


const reference = database().ref('post');

console.log("firebase: ", reference);



export default function TabOneScreen() {

  const createUserName = () => {
    console.log("Creating a user");
    fetch("https://randomuser.me/api/?format=json")
      .then((res) => res.json())
      .then((data) => data.results.map((i: any) => storeData(i.id.value)));
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value === null) {
        console.log("No user created yet");
        createUserName();
      } else {
        console.log("User: ", value)
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const storeData = async (value: string) => {
    console.log("Storing username locally");
    try {
      await AsyncStorage.setItem("username", value);
    } catch (e) {
      console.log("Error saving locally");
      return e;
    }
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
