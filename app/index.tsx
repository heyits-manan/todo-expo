import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Router } from "expo-router";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/banner.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <SignedIn>
            <View style={styles.signedInContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.emailText}>
                {user?.emailAddresses[0].emailAddress}
              </Text>
              <Link style={styles.logoutButton} href={"/(home)/todoPage"}>
                <Text style={styles.logoutText}>Go to List</Text>
              </Link>
            </View>
          </SignedIn>
          <SignedOut>
            <View style={styles.signedOutContainer}>
              <Text style={styles.title}>Todo App</Text>
              <Text style={styles.messageText}>
                Organize your tasks efficiently
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable style={styles.signInButton}>
                  <Text style={styles.signInText}>Get Started</Text>
                  <AntDesign name="arrowright" size={20} color="#000" />
                </Pressable>
              </Link>
            </View>
          </SignedOut>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: 30,
  },
  signedInContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "300",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  signedOutContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  messageText: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 32,
    textAlign: "center",
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 2,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
