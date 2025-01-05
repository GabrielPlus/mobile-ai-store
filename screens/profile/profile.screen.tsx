import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/context/theme.context";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes, IsAndroid } from "@/themes/app.constant";
import ThemeSwitcher from "@/components/common/theme.switcher";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    setIsLoading(true); // Start spinner
    try {
      // Perform logout actions
      await signOut(); // Logs out from Clerk
      await SecureStore.deleteItemAsync("userToken"); // Delete any secure stored token if necessary
      router.push("/(routes)/onboarding"); // Redirect to onboarding
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false); // Stop spinner
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark ? "#101010" : "#f5f5f5",
        },
      ]}
    >
      <LinearGradient
        colors={
          theme.dark
            ? ["#121121", "#3c43485c", "#121121"]
            : ["#6248FF", "#8673FC"]
        }
        start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
        end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        style={styles.header}
      >
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <ThemeSwitcher />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: scale(20) }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/support-center")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <FontAwesome
                name="support"
                size={scale(22)}
                color={theme.dark ? "#fff" : "#0047AB"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Support Center
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore our fastest support center
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          onPress={() => router.push("/(routes)/my-tickets")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={scale(22)}
                color={theme.dark ? "#fff" : "#0047AB"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                My Tickets
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Explore your all support tickets
              </Text>
            </View>
          </View>
        </Pressable>
        {/* Log Out Option */}
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: theme.dark ? verticalScale(90) : verticalScale(30),
          }}
          onPress={logoutHandler}
          disabled={isLoading} // Disable button while loading
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={theme.dark ? "#fff" : "#0047AB"}
                />
              ) : (
                <MaterialIcons
                  name="logout"
                  size={scale(23)}
                  color={theme.dark ? "#fff" : "#0047AB"}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                }}
              >
                Log Out
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: theme?.dark ? "#fff" : "#000",
                  opacity: 0.6,
                }}
              >
                Logging out from your account
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: verticalScale(220),
    borderBottomLeftRadius: scale(40),
    borderBottomRightRadius: scale(40),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  headerTitle: {
    fontSize: fontSizes.FONT32,
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
  },
});


// import React, { useEffect } from "react";
// import {
//   Image,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useTheme } from "@/context/theme.context";
// import { LinearGradient } from "expo-linear-gradient";
// import { scale, verticalScale } from "react-native-size-matters";
// import { fontSizes, IsAndroid } from "@/themes/app.constant";
// import ThemeSwitcher from "@/components/common/theme.switcher";
// import {
//   Feather,
//   FontAwesome,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuth } from "@clerk/clerk-expo";

// export default function ProfileScreen() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const { signOut } = useAuth();

//   const logoutHandler = async () => {
//     try {
//       await signOut(); // Logs out the user from Clerk
//       await AsyncStorage.clear(); // Clears all local storage
//       router.push("/(routes)/onboarding"); // Navigates to onboarding screen
//     } catch (error) {
//       console.error("Error during logout:", error); // Handle logout errors
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           backgroundColor: theme.dark ? "#101010" : "#f5f5f5",
//         },
//       ]}
//     >
//       <LinearGradient
//         colors={
//           theme.dark
//             ? ["#121121", "#3c43485c", "#121121"]
//             : ["#6248FF", "#8673FC"]
//         }
//         start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
//         end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
//         style={styles.header}
//       >
//         <StatusBar barStyle={"light-content"} />
//         <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
//           <View style={styles.headerContent}>
//             <Text style={styles.headerTitle}>Profile</Text>
//             <View>
//               <ThemeSwitcher />
//             </View>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       {/* Profile options */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{ padding: scale(20) }}
//       >
//         {/* Other options */}
        // <Pressable
        //   style={{
        //     flexDirection: "row",
        //     alignItems: "center",
        //     justifyContent: "space-between",
        //     marginBottom: verticalScale(20),
        //   }}
        //   onPress={() => router.push("/(routes)/support-center")}
        // >
        //   <View style={{ flexDirection: "row", alignItems: "center" }}>
        //     <View
        //       style={{
        //         width: scale(38),
        //         height: scale(38),
        //         justifyContent: "center",
        //         alignItems: "center",
        //         borderRadius: scale(10),
        //         borderWidth: 1,
        //         borderColor: "#E2DDFF",
        //       }}
        //     >
        //       <FontAwesome
        //         name="support"
        //         size={scale(22)}
        //         color={theme.dark ? "#fff" : "#0047AB"}
        //       />
        //     </View>
        //     <View>
        //       <Text
        //         style={{
        //           marginLeft: scale(10),
        //           fontSize: fontSizes.FONT22,
        //           fontFamily: "Poppins_400Regular",
        //           color: theme?.dark ? "#fff" : "#000",
        //         }}
        //       >
        //         Support Center
        //       </Text>
        //       <Text
        //         style={{
        //           marginLeft: scale(10),
        //           fontSize: fontSizes.FONT15,
        //           fontFamily: "Poppins_400Regular",
        //           color: theme?.dark ? "#fff" : "#000",
        //           opacity: 0.6,
        //         }}
        //       >
        //         Explore our fastest support center
        //       </Text>
        //     </View>
        //   </View>
        // </Pressable>

        // <Pressable
        //   style={{
        //     flexDirection: "row",
        //     alignItems: "center",
        //     justifyContent: "space-between",
        //     marginBottom: verticalScale(20),
        //   }}
        //   onPress={() => router.push("/(routes)/my-tickets")}
        // >
        //   <View style={{ flexDirection: "row", alignItems: "center" }}>
        //     <View
        //       style={{
        //         width: scale(38),
        //         height: scale(38),
        //         justifyContent: "center",
        //         alignItems: "center",
        //         borderRadius: scale(10),
        //         borderWidth: 1,
        //         borderColor: "#E2DDFF",
        //       }}
        //     >
        //       <MaterialCommunityIcons
        //         name="message-alert-outline"
        //         size={scale(22)}
        //         color={theme.dark ? "#fff" : "#0047AB"}
        //       />
        //     </View>
        //     <View>
        //       <Text
        //         style={{
        //           marginLeft: scale(10),
        //           fontSize: fontSizes.FONT22,
        //           fontFamily: "Poppins_400Regular",
        //           color: theme?.dark ? "#fff" : "#000",
        //         }}
        //       >
        //         My Tickets
        //       </Text>
        //       <Text
        //         style={{
        //           marginLeft: scale(10),
        //           fontSize: fontSizes.FONT15,
        //           fontFamily: "Poppins_400Regular",
        //           color: theme?.dark ? "#fff" : "#000",
        //           opacity: 0.6,
        //         }}
        //       >
        //         Explore your all support tickets
        //       </Text>
        //     </View>
        //   </View>
        // </Pressable>

//         <Pressable
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: theme.dark ? verticalScale(90) : verticalScale(30),
//           }}
//           onPress={logoutHandler}
//           disabled={isLoading} // Disable button while loading
//         >
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View
//               style={{
//                 width: scale(38),
//                 height: scale(38),
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: scale(10),
//                 borderWidth: 1,
//                 borderColor: "#E2DDFF",
//               }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator
//                   size="small"
//                   color={theme.dark ? "#fff" : "#0047AB"}
//                 />
//               ) : (
//                 <MaterialIcons
//                   name="logout"
//                   size={scale(23)}
//                   color={theme.dark ? "#fff" : "#0047AB"}
//                 />
//               )}
//             </View>
//             <View>
//               <Text
//                 style={{
//                   marginLeft: scale(10),
//                   fontSize: fontSizes.FONT22,
//                   fontFamily: "Poppins_400Regular",
//                   color: theme?.dark ? "#fff" : "#000",
//                 }}
//               >
//                 Log Out
//               </Text>
//               <Text
//                 style={{
//                   marginLeft: scale(10),
//                   fontSize: fontSizes.FONT15,
//                   fontFamily: "Poppins_400Regular",
//                   color: theme?.dark ? "#fff" : "#000",
//                   opacity: 0.6,
//                 }}
//               >
//                 Logging out from your account
//               </Text>
//             </View>
//           </View>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     height: verticalScale(220),
//     borderBottomLeftRadius: scale(40),
//     borderBottomRightRadius: scale(40),
//   },
//   headerContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: scale(20),
//   },
//   headerTitle: {
//     fontSize: fontSizes.FONT32,
//     fontFamily: "Poppins_600SemiBold",
//     color: "#fff",
//   },
// });
