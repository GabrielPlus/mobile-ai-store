import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";

export default function Index() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        setLoggedInUser(!!token); // Set loggedInUser to true if token exists
      } catch (error) {
        console.error("Error retrieving access token:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success/failure
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return null; // Show nothing or a loading spinner
  }

  return (
    <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"} />
  );
}
