import { View,Text,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,ScrollView, Alert} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
import { API_IP } from '../config';
import axios from 'axios';
import { registerForPushNotificationsAsync } from "../components/NotificationsToken";

export default function ParentRegScreen2() {
  const navigation = useNavigation();
  const route = useRoute();


  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [cnic, setCnic] = useState("");
  const [cnicError, setCnicError] = useState("");

  const [expoPushToken , setExpoPushToken] = useState(null);

  const handleAddressChange = (text) => {
    setAddress(text);
  
    if (text.length < 2) {
      setAddressError("Make sure to enter House No., Street No., and Area");
    } else {
      setAddressError("");
    }
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    
    // Regular expression to match a 11-digit phone number starting with "03"
    const phoneNumberRegex = /^03\d{9}$/;
  
    if (!phoneNumberRegex.test(text)) {
      setPhoneNumberError("Invalid phone number. It should be 11 digits and start with '03'");
    } else {
      setPhoneNumberError("");
    }
  };
  

  const handleCityChange = (text) => {
    setCity(text);
  
    // Convert the entered text to lowercase for case-insensitive comparison
    const lowercasedText = text.toLowerCase();
  
    // Check if the entered city is either Rawalpindi or Islamabad
    if (lowercasedText !== 'rawalpindi' && lowercasedText !== 'islamabad') {
      setCityError("City must be either Rawalpindi or Islamabad");
    } else {
      setCityError("");
    }
  };

  const handleCnicChange = (text) => {
    setCnic(text);
    if (text.length<13) {
      setCnicError("Invalid cnic. It should be 13 digits");
    } else {
      setCnicError("");
    }
  };

  
  const isSignupButtonEnabled = !addressError && !cityError && !phoneNumberError && !cnicError &&
                                 address.trim() !== "" &&  phoneNumber.trim() !== "" &&  city.trim() !== "" && cnic.trim() !== "" ;

  const handleSubmit = async ()=> {
    console.log("Here")

    if (isSignupButtonEnabled) {
      try {
        
        const { Full_Name, Email, Password, userUID } = route.params;
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        if(expoPushToken==null) {
          console.log("Waiting for token");
          return;
        }

        const parentData = {
          fullName: Full_Name,
          password: Password,
          email: Email,
          phoneNumber: phoneNumber,
          address: address,
          cnic: cnic,
          userUid: userUID,
          expo_token: expoPushToken,
        };


     // Make an HTTP request using Axios
     const response = await axios.post(`${API_IP}/add_parent`, parentData);
  

     // Check the response status
     if (response.status === 200) {
       // Successfully sent data to the backend
       console.log('Data sent successfully:', response.data);

       // Navigate to the ChildRegistration screen or perform any other actions
       console.log("parentData: ", parentData);
       navigation.navigate("SuccessfulParentReg", {Full_Name, Password, Email, userUID});
     } else {
       // Handle other response statuses
       console.log('Error:', response.status, response.data);
     }

   } catch (err) {
     console.log("SIGNUP got error: ", err.message);
   }
 } else {
   // Inform the user to fix input errors
   Alert.alert("Input Error", "Please fix the input errors and try again.");
 }
};

  useEffect(() => {
    // Check if the expoPushToken is available
    if (expoPushToken !== null) {
      // If token is available, call the handleSubmit function
      handleSubmit();
    }
  }, [expoPushToken]);
    

  return (
    <KeyboardAvoidingView
      behavior="height" // Adjust behavior as needed (padding, height, position)
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View
          className="flex-1 bg-white"
          style={{ backgroundColor: themeColors.bg }}
        >
          <SafeAreaView className="flex">
            <View className="flex-row justify-start">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
              >
                <ArrowLeftIcon size="20" color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center" style={{ height: 130 }}>
              <Image
                source={require("../assets/images/signup.png")}
                style={{ width: 165, height: 110 }}
              />
            </View>
          </SafeAreaView>
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: "white",
            }}
          >
            <View className="form space-y-2">
              <Text
                className="mx-auto"
                style={{ fontSize: 20, color: "black", paddingBottom: 10 }}
              >
                Parent Registration
              </Text>
              <Text className="text-gray-700 ml-4">Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={address}
                placeholder="House #, Street #, Area"
                onChangeText={handleAddressChange}
              />
              {addressError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {addressError}
                </Text>
              ) : null}

              <Text className="text-gray-700 ml-4">City</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={city}
                placeholder="Enter City"
                onChangeText={handleCityChange}
              />
              {cityError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {cityError}
                </Text>
              ) : null}

              <Text className="text-gray-700 ml-4">Phone Number</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={phoneNumber}
                placeholder="Enter Phone Number"
                onChangeText={handlePhoneNumberChange}
              />
              {phoneNumberError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {phoneNumberError}
                </Text>
              ) : null}

              <Text className="text-black-700 ml-4">CNIC</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={cnic}
                placeholder="Enter Backup Phone Number"
                onChangeText={handleCnicChange}
                />
                {cnicError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                    {cnicError}
                </Text>
                ) : null}
              <TouchableOpacity
                // onPress={() => navigation.navigate("ChildRegistration")}
                onPress={ handleSubmit }
                className={`py-3 mx-auto bg-yellow-400 rounded-xl ${
                isSignupButtonEnabled ? "" : "opacity-50 pointer-events-none"
                }`}
                style={{ width: 200 }}
                disabled={!isSignupButtonEnabled}
              >
                <Text
                  className="font-xl font-bold text-center text-white-700"
                  style={{ fontSize: 15 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 mx-auto bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View> */}
            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-yellow-500 underline mb-7">
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

} 
