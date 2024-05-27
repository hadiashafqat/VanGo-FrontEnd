import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import ArrowLeftIcon from 'react-native-vector-icons/Feather'; // Ensure this is the correct import based on your icon library
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { API_IP } from '../config';
import axios from 'axios';

export default function EditChild() {
    const navigation = useNavigation();
    const [changePickupLoc, setChangePickupLoc] = useState(false);
    const [changeDropOff, setChangeDropOff] = useState(false);
    const [changeProfilePic , setChangeProfilePic] = useState(false);

    const [pickupLoc, setPickupLoc] = useState("");
    const [pickupLocError, setPickupLocError] = useState("");

    const [profilePicURI, setProfilePicURI] = useState(null);
    const [b64 , setB64] = useState("")
    
    const route = useRoute()

    const child_ids = route.params.childID
    console.log("In edit:",child_ids)

    const pickupPlaceHolder = {
        label: 'Select A PickUp Location',
        value: null,
    };

    const pickupOptions = [
        { label: 'Askari 7', value: 'Askari 7' },
        { label: 'Askari 14', value: 'Askari 14' },
        { label: 'Askari 13', value: 'Askari 13' },
    ];

    const handlePickupLoc = (value) => {
        setPickupLoc(value);
        if (!value) {
            setPickupLocError("Please select a valid PickUp Location");
        } else {
            setPickupLocError("");
        }
    };

    const changePickUpClicked = () => {
        setChangePickupLoc(prev => !prev);
    };

    const [DropOffLoc , setDropOffLoc] = useState("");
    const [DropOffLocError , setDropOffLocError] = useState("");

    const DropOffPlaceHolder = {
        label: 'Select A DropOff Location',
        value: null,
    };

    const DropOffOptions = [
        {label : 'APS Humayun', value : 'APS Humayun'},
        {label :'APS Ordnance', value : 'APS Ordnance'},
        {label :'APS FortRoad', value : 'APS FortRoad'},
    ];

    const handleDropOffLoc = (text) => {
        setDropOffLoc(text);
        if (text === "Select A DropOff Location") {
            setDropOffLocError("Please select a valid DropOff Location")
        } else {
            setDropOffLocError("");
        }
    }

    const changeDropOffClicked = () => {
        setChangeDropOff(prev => !prev);
    };

    const handleSelectProfilePic = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('Permission to access media library required.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!pickerResult.canceled) {
                setProfilePicURI(pickerResult.assets[0].uri);
            }
        } catch (error) {
            console.error('Error selecting profile picture:', error);
        }
    };

    const changeProfilePicClicked = () => {
        setChangeProfilePic(prev => !prev);
    };


    function blobToB64(blob) {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
    
        return new Promise((resolve, reject) => {
            reader.onerror = reject;
            reader.onload = () => {
                resolve(String(reader?.result).split(",")[1])
            }
        })
    }

    const handleSubmit = async() => {
            // console.log("Front photo", frontPhotoFile)
        try {
    
            let base64Data = "";
            console.log(profilePicURI)

            if (profilePicURI) {
                const imageResponse = await fetch(profilePicURI);
                const imageBlob = await imageResponse.blob();
                base64Data = await blobToB64(imageBlob);
            }

            // console.log("B64: ",base64Data)
            const childData = {
                child_id: child_ids,
                pickUpLoc : pickupLoc,
                dropOffLoc : DropOffLoc,
                picture: base64Data,
            };
        
            // Stringify the JSON data
            const childDataString = JSON.stringify(childData);
            
            // Create FormData and append JSON data
            const formData = new FormData();
            formData.append('childData', childDataString);
            console.log("Sending data")
            // Send data to server
            const response = await axios.post(`${API_IP}/edit_child`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                // Successfully sent data to the backend
                console.log('Data sent successfully:', response.data);
                Alert.alert("Success", "Child updated");
         
              } else {
                // Handle other response statuses
                console.log('Error:', response.status, response.data);
                Alert.alert("Error", "Child not updated");
              }
        } catch (error) {
            console.error('Failed to Edit child:', error.response.data);
            Alert.alert("Error", "Child not updated");
        }
    }


    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: 'white'}}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start mt-4">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="mx-auto">
                    <Text style={{ fontSize: 30, color: 'black', paddingTop: 30 }}>Edit Child Data</Text>
                </View>
            </SafeAreaView>

            <SafeAreaView style={{ flex: 1}}>
                <View style={{  padding: 10 }}>
                    <TouchableOpacity onPress={changePickUpClicked}
                    className="py-3 bg-yellow-400 rounded-xl"
                    >
                        <Text style={{color:'black', marginLeft:15, fontSize:20}}>Change PickUp Location</Text>
                    </TouchableOpacity>
                    {changePickupLoc && (
                        <View>
                            <Text className="text-gray-700 ml-4 mt-4">PickUp Location</Text>
                            <RNPickerSelect
                                placeholder={pickupPlaceHolder}
                                items={pickupOptions}
                                onValueChange={handlePickupLoc}
                                value={pickupLoc}

                               
                            />
                            {pickupLocError ? (
                                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                                    {pickupLocError}
                                </Text>
                            ) : null}
                        </View>
                    )}
                </View>

                <View style={{  padding: 10 }}>
                    <TouchableOpacity onPress={changeDropOffClicked}
                    className="py-3 bg-yellow-400 rounded-xl"
                    >
                        <Text style={{color:'black', marginLeft:15, fontSize:20}}>Change DropOff Location</Text>
                    </TouchableOpacity>
                    {changeDropOff && (
                        <View>
                            <Text className="text-gray-700 ml-4 mt-4">DropOff Location</Text>
                            <RNPickerSelect
                                placeholder={DropOffPlaceHolder}
                                items={DropOffOptions}
                                onValueChange={handleDropOffLoc}
                                value={DropOffLoc}
                            />
                            {DropOffLocError ? (
                                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                                    {DropOffLocError}
                                </Text>
                            ) : null}
                        </View>
                    )}
                </View>

                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={changeProfilePicClicked}
                        className="py-3 bg-yellow-400 rounded-xl"
                    >
                        <Text style={{color:'black', marginLeft:15, fontSize:20}}>Change Profile Picture</Text>
                    </TouchableOpacity>
                    {changeProfilePic && (
                        <View>
                            <Text className="text-gray-700 ml-4 mt-4">Select Profile Picture</Text>
                            <TouchableOpacity onPress={handleSelectProfilePic}>
                                {profilePicURI ? (
                                    <Image source={{ uri: profilePicURI }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20 }} />
                                ) : (
                                    <Text style={{ fontSize: 20, color: 'blue', alignSelf: 'center', marginBottom: 20 }}>Upload Profile Picture</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={{display:'flex', alignItems:'center', marginTop:30}}>
                    <TouchableOpacity onPress={handleSubmit}
                    className="py-3 bg-yellow-400 rounded-xl p-3"
                    >
                        <Text style={{color:'black', fontSize:20}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
