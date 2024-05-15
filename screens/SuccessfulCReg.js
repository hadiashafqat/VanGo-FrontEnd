import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import LottieView from "lottie-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const SuccessfulCReg = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { parentID, Email, Password, Full_Name} = route.params;
  const childName = Full_Name;



  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex ">
        <View
          style={{
            height: 150,
            aspectRatio: 1,
            marginTop: 130,
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
        <Text className="text-black font-bold text-3xl text-center" style={{ marginHorizontal:40 }}>
          {childName} has been successfully Registered at VanGo
        </Text>

        <View
          className="flex-row justify-center align-centre"
          style={{ marginTop: 130 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ChildRegistration", {parentID})}
            className="py-3 mx-auto bg-yellow-400 rounded-xl"
            style={{ width: 300 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Register Another Child
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className="flex-row justify-center align-centre"
          style={{ marginTop: 30 }}
        >
          <TouchableOpacity
            // onPress={() => navigation.navigate("Login", {parentID, Email, Password})}
            onPress={() => navigation.navigate("Login")}
            className="py-3 mx-auto bg-yellow-400 rounded-xl"
            style={{ width: 300 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login to your Profile
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default SuccessfulCReg;
