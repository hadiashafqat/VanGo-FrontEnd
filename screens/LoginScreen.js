import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useRoute,useNavigation } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { registerForPushNotificationsAsync } from '../components/NotificationsToken';
import { API_IP } from '../config'

export default function LoginScreen() {
  
  const navigation = useNavigation();
  const route = useRoute();
  

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [expoPushToken, setExpoPushToken] = useState(null);

  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));


  useEffect(() => {
    if (route.params) {
      const { Email, Password } = route.params;
      setEmail(Email);
      setPassword(Password);
    }
  }, [route.params]);

  useEffect(() => {
    // Check if parentId exists in the current user
    const parentId = auth.currentUser ? auth.currentUser.uid : null;

    if (parentId) {
      // Send axios request to fetch automatic login credentials
      axios.post(`${API_IP}/get_automatic_login_credentials/${parentId}`)
        .then(response => {
          const { email, password } = response.data;
          setEmail(email);
          setPassword(password);
          console.log("fetchimg email and password");
          //login();
        })
        .catch(error => {
          console.error("Error fetching automatic login credentials:", error);
        });
    }
  }, []);

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

  const isLoginButtonEnabled = email.trim() !== "" && password.trim() !== "" && !emailError && !passwordError;

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);  
      const parentId= auth.currentUser.uid
      // navigation.navigate('ChildRegistration', { parentId })
      navigation.navigate('ChildProfile' , {parentId})
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
      }
      Alert.alert("Login Failed", "Login Unsuccessful");
    }
  };

  const sendTokenToServer = async () => {
    try {
      const response = await axios.post(`${API_IP}/sendFcmTokenAndParentId`, {
        fcmToken: expoPushToken,
        parentId: auth.currentUser.uid
      });

      // Check the response status
      if (response.status === 200) {
        // Successfully sent data to the backend
        console.log('Data sent successfully:', response.data);

        // Navigate to the ChildRegistration screen or perform any other actions
      } else {
        // Handle other response statuses
        console.log('Error:', response.status, response.data);
      }

    } 
    catch(error) {
      console.log("Couldnt login", error);
    }
  }

  const handleSubmit = () => {
    if (isLoginButtonEnabled) {
      sendTokenToServer();
      login();
    } else {
      Alert.alert("Input Error", "Please fix the input errors and try again.");
    }
  };


  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
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
            
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
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

            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ handleSubmit }
              className={`py-3 mx-auto bg-yellow-400 rounded-xl ${
              isLoginButtonEnabled ? "" : "opacity-50 pointer-events-none"
              }`}
              style={{ width: 300 }}
              disabled={!isLoginButtonEnabled}
            >
                
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          
          <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}