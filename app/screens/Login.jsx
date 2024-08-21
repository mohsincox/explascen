import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { loginService } from "@/services/authService";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (email == "" || password == "") {
      Alert.alert("All Fields Required", "All Fields are Required");
    }

    try {
      setLoading(true);

      await loginService({
        email: email.toLowerCase(),
        password,
      });

      // const response = await axiosInstance.post("/login", {
      //   email: email.toLowerCase(),
      //   password: password,
      // });
      // await storeToken(response?.data?.token);

      setLoading(false);
      router.push("/tabs");
    } catch (e) {
      setLoading(true);
      if (e.response?.data?.errors) {
        setErrors(e.response?.data?.errors);
      } else {
        setErrors(e.response?.data);
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyCotent: "center",
        alignItems: "center",
        backgroundColor: "aqua",
      }}
    >
      <LinearGradient
        colors={["#50d5b7", "#067d68", "transparent"]}
        style={styles.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={{ flex: 1, width: "100%", marginTop: 100 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
              color: "white",
            }}
          >
            User Login
          </Text>
          <View style={{ width: "100%", padding: 20 }}>
            <Text style={{ margingBottom: 5, fontSize: 20, color: "white" }}>
              Email
            </Text>
            <TextInput
              onChangeText={(v) => setEmail(v)}
              style={{
                borderWidth: 1,
                marginBottom: 15,
                padding: 10,
                borderRadius: 5,
                color: "white",
              }}
            />

            {errors && (
              <Text style={{ color: "red", fontsize: 14 }}>{errors.email}</Text>
            )}
            <Text style={{ marginBottom: 5, fontSize: 20, color: "white" }}>
              Password
            </Text>
            <TextInput
              onChangeText={(v) => setPassword(v)}
              secureTextEntry
              style={{
                borderWidth: 1,
                marginBottom: 15,
                padding: 10,
                borderRadius: 5,
                color: "white",
              }}
            />
            {errors && (
              <Text style={{ color: "red", fontsize: 14 }}>
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                marginVertical: 10,
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: "#007bff",
              }}
            >
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "white" }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
        </View>
        {errors && (
          <Text style={{ fontSize: 20, textAlign: "center", color: "red" }}>
            {errors.message}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
