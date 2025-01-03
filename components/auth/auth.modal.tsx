import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'

export default function AuthModal() {
  return (
  <View
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}
              >
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
          <Pressable>
            <Image
              source={require("@/assets/images/onboarding/google.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("@/assets/images/onboarding/github.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
          <Pressable>
            <Image
              source={require("@/assets/images/onboarding/apple.png")}
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
  )
}