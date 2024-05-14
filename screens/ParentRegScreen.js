import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";



export default function ParentRegScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleFullNameChange = (text) => {
    setFullName(text);
    if (!/^[a-zA-Z]+(\s[a-zA-Z]+)+((\s)*$)+(\s[a-zA-Z]+)*$/.test(text)) {
      setFullNameError("Full Name must contain two words separated by a space");
    } else {
      setFullNameError("");
    }
  };

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
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(text)) {
      setPasswordError(
        "Password must contain letters, numbers, and a special character. Atleast 6 length"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isNextButtonEnabled =
    !fullNameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSubmit = async () => {
    if (isNextButtonEnabled) {
      try {
        // Create a user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update the user's display name (optional)
        const user = auth.currentUser;

        // Send email verification
        await sendEmailVerification(user);

        // Inform the user to verify their email
        Alert.alert(
          "Verify Email to Proceed",
          "A verification email has been sent. Please check your inbox and verify your email to proceed."
        );

        // Wait for email verification
        const checkVerificationInterval = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(checkVerificationInterval);

            //get forebase uid
            const userUID = user.uid;

            // Email is verified, navigate to the next page (ChildRegistration)
            navigation.navigate("SignUp2", {
              Full_Name: fullName,
              Email: email,
              Password: password,
              userUID: userUID,
            });
          }
        }, 5000); // Check every 5 seconds

        // Optional: handle case where user closes the app or logs out before email verification
        return () => {
          clearInterval(checkVerificationInterval);
        };
      } catch (err) {
        console.log("Next got error: ", err.message);
      }
    } else {
      // Inform the user to fix input errors
      Alert.alert("Input Error", "Please fix the input errors and try again.");
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
              <Text className="text-gray-700 ml-4">Full Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={fullName}
                placeholder="Enter Name"
                onChangeText={handleFullNameChange}
              />
              {fullNameError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {fullNameError}
                </Text>
              ) : null}

              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                placeholder="Enter Email"
                onChangeText={handleEmailChange}
              />
              {emailError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {emailError}
                </Text>
              ) : null}

              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                placeholder="Enter Password"
                onChangeText={handlePasswordChange}
              />
              {passwordError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {passwordError}
                </Text>
              ) : null}

              <Text className="text-black-700 ml-4">Confirm Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={confirmPassword}
                placeholder="Enter Password"
                onChangeText={handleConfirmPasswordChange}
              />
              {confirmPasswordError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                  {confirmPasswordError}
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={handleSubmit}
                className={`py-3 mx-auto bg-yellow-400 rounded-xl ${
                  isNextButtonEnabled ? "" : "opacity-50 pointer-events-none"
                }`}
                style={{ width: 200 }}
                disabled={!isNextButtonEnabled}
              >
                <Text
                  className="font-xl font-bold text-center text-white-700"
                  style={{ fontSize: 15 }}
                >
                  NEXT
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
