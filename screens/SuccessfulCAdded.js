import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import LottieView from "lottie-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const SuccessfulCAdded = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { parentID, Full_Name, Email, Password, childID } = route.params;
  const childName = Full_Name;



  return (
    <View className="flex-1 bg-black">
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
        <Text className="text-white font-bold text-3xl text-center" style={{ marginHorizontal:40 }}>
          {childName} has been Partially Registered. To Complete Registration, Proceed to Payment
        </Text>

        <View
          className="flex-row justify-center align-centre"
          style={{ marginTop: 130 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment", {parentID, Full_Name, Email, Password, childID})}
            className="py-3 mx-auto bg-yellow-400 rounded-xl"
            style={{ width: 300 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Payment
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default SuccessfulCAdded;
