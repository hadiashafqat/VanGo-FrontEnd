import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

const SuccessfulPReg = () => {
  const navigation = useNavigation();
  const route = useRoute();

  
      
      const { Full_Name, Password, Email, userUID } = route.params;
      const parentName = Full_Name;
      const parentID = userUID; 
      
   

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex ">
        <View
          style={{
            height: 150,
            aspectRatio: 1,
            marginTop: 150,
            marginLeft: 120,
            marginBottom:50
          }}
        >
          <LottieView
            style={{ flex: 1 }}
            source={require("../assets/images/tick.json")}
            autoPlay
            loop
          />
        </View>
        <Text className="text-black font-bold text-3xl text-center" style={{ marginHorizontal:50 }}>
           {parentName}, You Are Successfully Registered as Parent
        </Text>
        <View
          className="flex-row justify-center align-centre"
          style={{ marginTop: 200 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ChildRegistration", { parentID, Email, Password } )}
            className="py-3 mx-auto bg-yellow-400 rounded-xl"
            style={{ width: 300 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Register a Child
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SuccessfulPReg;
