import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import axios from "axios";
import { API_IP } from "../config";

export default function UnregisterChiild() {
  const navigation = useNavigation();
  const route = useRoute();

  const {childID } = route.params;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [childName, setChildName] = useState("");
  const [realEmail, setRealEmail] = useState("");
  const [realPassword, setRealPassword] = useState("");
  


  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text.includes("@")) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 1) {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  const isLoginButtonEnabled =
    email.trim() !== "" &&
    password.trim() !== "" &&
    !emailError &&
    !passwordError;

    useEffect(() => {
      const fetchChildData = async () => {
        try {
          const response = await axios.post(
            `${API_IP}/get_child_data_for_unregister/${childID}`
          );
          const { email, password, childName, paymentStat } = response.data;
          setChildName(childName);
          setRealEmail(email);
          setRealPassword(password);
          if(paymentStat!== true) {
            Alert.alert("PAYMENT NOT DONE", `You cannot unregister ${childName} before resolving this month's payment. Pay First.`);
            navigation.goBack();
          }
          
        } catch (error) {
          console.error("Error fetching child data:", error);
          Alert.alert("Error", "Failed to load child data.");
        }
      };
  
      fetchChildData();
      Alert.alert("ARE YOU SURE?", `If you are sure you want to Unregister ${childName} from VanGo Bus Service, enter your email and password to confirm unregistration`);
    }, [childID]);

    const handleSubmit = async () => {
      if (email === realEmail && password === realPassword) {
        Alert.alert("Unregistering", `Unregistering ${childName}. This child will no longer be subscribed to VanGo.`);
        try {
          const response = await axios.get(`${API_IP}/unregister_child/${childID}`);
          if (response.status === 200) {
            navigation.navigate("ChildProfile");
        
          } else {
            Alert.alert("Error", "Failed to unregister child.");
          }
        } catch (error) {
          console.error("Error unregistering child:", error);
          Alert.alert("Error", "Failed to unregister child.");
        }
      } else {
        Alert.alert("INCORRECT CREDENTIALS", "Inorder to unregister child, enter valid credentialls to ensure it's you.");
      } 
    };

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
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <Text className="text-xl text-gray-700 font-bold text-center mb-15">
          CONFIRM UNREGISTRATION
        </Text>

        <Text
          style={{
            marginBottom: 10,
            color: "black",
            marginHorizontal: 0,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ lineHeight: 20 }}>Unregister </Text>
          {"\n"}
          <Text style={{ lineHeight: 30, color: "red" }}>{childName}</Text>
          {"\n"}

        </Text>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Enter Email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            placeholder="email"
            onChangeText={handleEmailChange}
          />
          {emailError ? (
            <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
              {emailError}
            </Text>
          ) : null}

          <Text className="text-gray-700 ml-4"> Enter Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-10"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? (
            <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
              {passwordError}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSubmit}
            className={`py-3 mx-auto bg-yellow-400 rounded-xl ${
              isLoginButtonEnabled ? "" : "opacity-50 pointer-events-none"
            }`}
            style={{ width: 300 }}
            disabled={!isLoginButtonEnabled}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              UNREGISTER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
