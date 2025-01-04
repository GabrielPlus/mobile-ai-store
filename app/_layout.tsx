import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "@/context/theme.context";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import {
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";


// Token cache logic using SecureStore
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error:", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore save item error:", err);
    }
  },
};

export default function _layout() {


  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Check if publishableKey is defined
  if (!publishableKey) {
    throw new Error(
      "Missing Clerk publishable key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file."
    );
  }

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");
        const sessionId = await AsyncStorage.getItem("clerk_session_id");
        console.log("Session ID:", sessionId);

        setIsAuthenticated(!!sessionId);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsAppReady(true);
      }
    };

    checkAuth();
  }, []);

  // Redirect once the app is fully mounted and authentication status is determined
  useEffect(() => {
    if (isAppReady && isAuthenticated === true) {
      console.log("User is authenticated, redirecting to /tabs...");
      router.replace("/(tabs)");
    }
  }, [isAppReady, isAuthenticated, router]);

  if (!isAppReady) {
    // Render a loading state while the app initializes
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index" />
        </Stack>
      </ThemeProvider>
    </ClerkProvider>
  );
}