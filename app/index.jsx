import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Register from "./screens/Register";
import TabsLayout from "./tabs/_layout";
import Login from "./screens/Login";
import { getToken } from "@/services/tokenService";

const Stack = createNativeStackNavigator();

export default function Index() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken();
      setToken(res);
    };

    fetchToken();
  }, []);

  console.log("token", token);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("🚀 ~ Index ~ apiUrl:", apiUrl);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="TabsLayout"
            component={TabsLayout}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
