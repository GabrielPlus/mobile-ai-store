import { View, Text, Pressable, Image } from "react-native";
import React, { useCallback } from "react";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function AuthModal() {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPressGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", { scheme: "diggihipo" }),
      });

      if (createdSessionId) {
        console.log("Google OAuth successful, session created:", createdSessionId);

        // Store the session in AsyncStorage
        await AsyncStorage.setItem("clerk_session_id", createdSessionId);

        // Check if setActive exists before calling it
        if (setActive) {
          await setActive({ session: createdSessionId });
        } else {
          console.error("setActive is undefined. Unable to set active session.");
        }

        // Navigate to the home page
        router.replace("/(tabs)");
      } else {
        console.error("Google OAuth failed: No session created.");
      }
    } catch (error) {
      console.error("Error during Google OAuth:", error);
    }
  }, [router, startOAuthFlow]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        style={{
          width: windowWidth(420),
          height: windowHeight(250),
          marginHorizontal: windowWidth(50),
          backgroundColor: "#fff",
          borderRadius: windowWidth(30),
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={(e) => e.stopPropagation()}
      >
        <Text
          style={{
            fontSize: fontSizes.FONT35,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Join to Diggihipo
        </Text>
        <Text
          style={{
            fontSize: fontSizes.FONT17,
            paddingTop: windowHeight(5),
            fontFamily: "Poppins_300Light",
          }}
        >
          It's easier than your imagination!
        </Text>
        <View
          style={{
            paddingVertical: windowHeight(10),
            flexDirection: "row",
            gap: windowWidth(20),
          }}
        >
          {/* Google Sign-In */}
          <Pressable onPress={onPressGoogle}>
            <Image
              source={require("@/assets/images/onboarding/google.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}




// import { View, Text, Pressable, Image, Platform } from "react-native";
// import React, { useEffect } from "react";
// import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";

// export default function AuthModal() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Pressable
//         style={{
//           width: windowWidth(420),
//           height: windowHeight(250),
//           marginHorizontal: windowWidth(50),
//           backgroundColor: "#fff",
//           borderRadius: windowWidth(30),
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//         onPress={(e) => e.stopPropagation()}
//       >
//         <Text
//           style={{
//             fontSize: fontSizes.FONT35,
//             fontFamily: "Poppins_700Bold",
//           }}
//         >
//           Join to Diggihipo
//         </Text>
//         <Text
//           style={{
//             fontSize: fontSizes.FONT17,
//             paddingTop: windowHeight(5),
//             fontFamily: "Poppins_300Light",
//           }}
//         >
//           It's easier than your imagination!
//         </Text>
//         <View
//           style={{
//             paddingVertical: windowHeight(10),
//             flexDirection: "row",
//             gap: windowWidth(20),
//           }}
//         >
//           <Pressable>
//             <Image
//               source={require("@/assets/images/onboarding/google.png")}
//               style={{
//                 width: windowWidth(40),
//                 height: windowHeight(40),
//                 resizeMode: "contain",
//               }}
//             />
//           </Pressable>
//           <Pressable>
//             <Image
//               source={require("@/assets/images/onboarding/github.png")}
//               style={{
//                 width: windowWidth(40),
//                 height: windowHeight(40),
//                 resizeMode: "contain",
//               }}
//             />
//           </Pressable>
//           <Pressable>
//             <Image
//               source={require("@/assets/images/onboarding/apple.png")}
//               style={{
//                 width: windowWidth(40),
//                 height: windowHeight(40),
//                 resizeMode: "contain",
//               }}
//             />
//           </Pressable>
//         </View>
//       </Pressable>
//     </View>
//   );
// }
