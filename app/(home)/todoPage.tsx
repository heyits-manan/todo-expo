import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SignedIn } from "@clerk/clerk-expo";

const todoPage = () => {
  return (
    <SignedIn>
      <View>
        <Text style={styles.textStyle}>todoPage</Text>
      </View>
    </SignedIn>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    // fontSize: 20,
    // textAlign: "center",
    marginTop: 90,
    marginLeft: 20,
    position: "absolute",
    color: "black",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 90,
    marginLeft: 20,
    zIndex: 1,
    position: "absolute",
  },
});

export default todoPage;
