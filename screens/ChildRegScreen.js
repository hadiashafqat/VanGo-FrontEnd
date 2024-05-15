import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView,} from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function ChildRegScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { parentID, Email, Password} = route.params;

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [bForm, setBForm] = useState("");
  const [bFormError, setBFormError] = useState("");

  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("Please select Age");

  const [school, setSchool] = useState("");
  const [schoolError, setSchoolError] = useState("Please select School");

  //resetting form
  useFocusEffect(
    React.useCallback(() => {
      // Reset form data when the screen is focused
      setFullName('');
      setFullNameError('');

      setBForm('');
      setBFormError('');

      setAge('');
      setAgeError('Please select Age');

      setSchool('');
      setSchoolError('Please select School');
    }, [])
  );

  const handleFullNameChange = (text) => {
    setFullName(text);
    if (!/^[a-zA-Z]+(\s[a-zA-Z]+)+((\s)*$)+(\s[a-zA-Z]+)*$/.test(text)) {
      setFullNameError("Full Name must contain two words separated by a space");
    } else {
      setFullNameError("");
    }
  };

  const handleBFormChange = (text) => {
    setBForm(text);
    if (text.length != 13) {
      setBFormError("BForm number needs to be 13 digits");
    } else {
      setBFormError("");
    }
  };

  const handleAgeChange = (selectedAge) => {
    setAge(selectedAge);
    if (!selectedAge) {
      setAgeError("Please select Age");
    } else {
      setAgeError("");
    }
  };

  const handleSchoolChange = (selectedSchool) => {
    setSchool(selectedSchool);
    if (!selectedSchool) {
      setSchoolError("Please select School");
    } else {
      setSchoolError("");
    }
  };

  const schools = [
    "APS Hamayun",
    "APS Fort Road",
    "APS Ordinance",
    
  ];

  const isNextButtonEnabled =
    !fullNameError &&
    !bFormError &&
    !ageError &&
    !schoolError &&
    fullName.trim() !== "" &&
    bForm.trim() !== "" &&
    age.trim() !== "" &&
    school.trim() !== "" ;

    const handleSubmit = async () => {
      if (isNextButtonEnabled) {

              navigation.navigate("ChildRegistration2", {
                Full_Name: fullName,
                BForm: bForm,
                Age: age,
                School: school,
                parentID, Email, Password
              }); 
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
            <View
              className="flex-row justify-center mx auto"
              style={{ height: 150 }}
            >
              <Image
                source={require("../assets/images/ChildReg.png")}
                style={{ width: 165, height: 140 }}
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
                className="mx-auto font-bold"
                style={{ fontSize: 20, color: "black", paddingBottom: 10 }}
              >
                Child Registration
              </Text>
              <Text className="text-gray-700 ml-4">Full Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={fullName}
                placeholder="Enter Name"
                onChangeText={handleFullNameChange}
              />
              {fullNameError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 5 }}>
                  {fullNameError}
                </Text>
              ) : null}
              <Text className="text-gray-700 ml-4">BForm Number</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={bForm}
                placeholder="1234567890123"
                onChangeText={handleBFormChange}
              />
              {bFormError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 5 }}>
                  {bFormError}
                </Text>
              ) : null}
              <Text className="text-gray-700 ml-4">Age</Text>
              <View
                style={{
                  padding: 4,
                  backgroundColor: "#F0F0F0",
                  borderRadius: 20,
                  marginBottom: 9,
                }}
              >
                <Picker
                  selectedValue={age}
                  onValueChange={handleAgeChange}
                  style={{ color: age ? "#000000" : "#A9A9A9" }}
                >
                  <Picker.Item label="Select Age" value="" />
                  {Array.from({ length: 20 }, (_, index) => index + 3).map(
                    (value) => (
                      <Picker.Item
                        key={value}
                        label={`${value} years`}
                        value={value.toString()}
                      />
                    )
                  )}
                </Picker>
              </View>
              {ageError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 5 }}>
                  {ageError}
                </Text>
              ) : null}
              <Text className="text-gray-700 ml-4">School</Text>
              <View
                style={{
                  padding: 4,
                  backgroundColor: "#F0F0F0",
                  borderRadius: 20,
                  marginBottom: 9, 
                }}
              >
                <Picker
                  selectedValue={school}
                  onValueChange={handleSchoolChange}
                  style={{ color: age ? "#000000" : "#A9A9A9" }}
                >
                  <Picker.Item label="Select School" value="" />
                  {schools.map((school, index) => (
                    <Picker.Item key={index} label={school} value={school} />
                  ))}
                </Picker>
              </View>
              {schoolError ? (
                <Text style={{ color: "red", marginLeft: 20, marginBottom: 9 }}>
                  {schoolError}
                </Text>
              ) : <Text style={{ color: "red", marginLeft: 20, marginBottom: 9 }}> </Text>
              }
              <TouchableOpacity
                onPress={handleSubmit}
                className={`py-3 mx-auto bg-yellow-400 rounded-xl ${
                  isNextButtonEnabled ? "mb-10" : "opacity-50 pointer-events-none mb-10"
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
