import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon, ArrowPathIcon} from 'react-native-heroicons/solid';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { API_IP } from '../config';
import RNPickerSelector from 'react-native-picker-select';
import { Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import  * as MediaLibrary from 'expo-media-library'
import axios from 'axios';
import { auth } from "../config/firebase";
import * as FaceDetector from 'expo-face-detector';


// Function to convert URI to a file path

export default function ChildRegScreen2 () {
    const navigation = useNavigation();
    const route = useRoute();
    const [propsFaceDetector, setPropsFaceDetector] = useState({});
    const [faceDimensions , setFaceDimensions] = useState({width:0,height:0,x:0,y:0});

    let cameraRef = useRef();
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [ hasMediaLibPermission , sethasMediaLibraryPermission] = useState();

    const [cameraOpen, setCameraOpen] = useState(false);

    const [FrontPhoto , setFrontPhoto] = useState("");
    const [FrontPhotoError , setFrontPhotoError] = useState("");
    const [PicURI , setPicURI] = useState("")

    const [ isFrontFacing , setIsFrontFacing] = useState(false);
    const [ isFaceDetected, setIsFaceDetected] = useState(true);

    const user = auth.currentUser;

    const parentID = user.uid;

    const [Loader, setLoader] = useState(false);

    const [CameraLoader, setCameraLoader] = useState(false);

    
    useEffect(() => {
        const requestCameraPermission = async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            sethasMediaLibraryPermission (MediaLibrary.status === 'granted');
        };

        requestCameraPermission();
    }, []);

    const takePicture = async () => {
        if (!cameraRef.current) {
            console.error('Camera reference is null');
            return;
        }

        try {
            setCameraLoader(true);
            const { uri } = await cameraRef.current.takePictureAsync();
            setPicURI(uri);
            setFrontPhoto(uri);
            setFrontPhotoError("");
            // setCameraOpen(false);
            setCameraLoader(false);
        } catch (error) {
            setCameraLoader(false);
            console.error('Failed to take picture: ', error);
            setFrontPhotoError("Failed to take picture");
        }
    };

    const handleFacesDetected = (data) => {
        const faces = data?.faces || [];
        if (faces.length > 0) {
            setIsFaceDetected(true);
            const face = faces[0]; 
            origin = face.bounds["origin"];
            size = face.bounds["size"];
            width = size["width"];
            height = size["height"];
            x = origin["x"];
            y = origin["y"];
            setFaceDimensions({ width, height, x, y });
            console.log("Face bounds: ",width,height,x,y);
            const yawAngle = face.yawAngle;
            // console.log("Yaw Angle:", yawAngle);
            if (Math.abs(yawAngle) < 15) {
                setIsFrontFacing(true);
            }
            else {
                setIsFrontFacing(false);
            }
        }
        else{
            setIsFaceDetected(false);
        }
    }
    

    const handleFrontProfilePress = () => {
        setCameraOpen(true);
    };

    const handleOK = () => {
        setCameraOpen(false);
    }

    const handleRetake = () => {
        setFrontPhoto("");
    }

    const changeCameraStatus = () => {
        setCameraOpen(false);
    }


    const [PickupLoc , setPickupLoc] = useState("");
    const [PickUpLocError , setPickUpLocError] = useState("");

    const PickUpPlaceHolder = {
        label: 'Select A PickUp Location',
        value: null,
    };

    const PickUpOptions = [
        {label : 'Askari 7', value : 'Askari 7'},
        {label :'Askari 14', value : 'Askari 14'},
        {label :'Askari 13', value : 'Askari 13'},
    ];

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

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const handlePickupLoc = (text) => {
        setPickupLoc(text);
        if (text === "Select A PickUp Location") {
            setPickUpLocError("Please select a valid PickUp Location")
        }
        else {
            setPickUpLocError("");
        }
    }

    const handleDropOffLoc = (text) => {
        setDropOffLoc(text);
        if (text === "Select A DropOff Location") {
            setDropOffLocError("Please select a valid DropOff Location")
        } else {
            setDropOffLocError("");
        }
    }


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

    const handleRegister = async() => {
        // Check if there are any errors before navigating to the next screen
        if (!PickupLoc || PickupLoc === "Select A PickUp Location") {
            setPickUpLocError("Please select a valid PickUp Location");
            return;
        }

        if (!DropOffLoc) {
            setDropOffLocError("Please enter a valid DropOff Location");
            return;
        }

        if (!FrontPhoto) {
            setFrontPhotoError("Please Take a Picture");
            return;
        }

        // Navigate to the next screen if there are no errors
        try {
            setLoader(true);
            // Convert image URI to file object
            const imageResponse = await fetch(PicURI);
            const imageBlob = await imageResponse.blob();
            const b64 = String((await blobToB64(imageBlob)) )

            // console.log("Front photo", frontPhotoFile)
    
            const { Full_Name, BForm, Age, School, parentID, Email, Password } = route.params;
            
            const childData = {
                parent_id: user.uid,
                childName: Full_Name,
                bFormNumber: BForm,
                pickupLocation: PickupLoc,
                schoolName: School, 
                dropOffLocation: DropOffLoc,
                picture: b64,
            };
        
            // Stringify the JSON data
            const childDataString = JSON.stringify(childData);
            
            // Create FormData and append JSON data
            const formData = new FormData();
            formData.append('childData', childDataString);
        
            // Send data to server
            const response = await axios.post(`${API_IP}/register_child`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                // Successfully sent data to the backend
                console.log('Data sent successfully:', response.data);
                const { subscriptionId, clientSecret, childID } = response.data;
                console.log("SubscriptionID: ", subscriptionId);
                console.log("CLient Secret : ", clientSecret);
                console.log("ChildID : ", childID);
         
                // Navigate to the ChildRegistration screen or perform any other actions
                navigation.navigate('SuccessfulChildAdded', {parentID, Full_Name, Email, Password, childID});
              } else {
                // Handle other response statuses
                console.log('Error:', response.status, response.data);
              }
        } catch (error) {
            setLoader(false);
            console.error('Failed to register child:', error.response.data);
        }
        
    }

    return (
        <>
            {!cameraOpen ? (
                <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
                    {Loader && (
                        <View style={{width:300 ,position: 'absolute', top: '50%', marginTop:'-50', marginLeft:50 , backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            <ActivityIndicator size="large" color="#ffffff" style={{marginTop:20}}/>
                            <Text style={{ color: '#ffffff', marginTop: 10 , marginBottom:20}}>Child is being registered. Please wait...</Text>
                        </View>
                    )}
                    <SafeAreaView className="flex">
                        <View className="flex-row justify-start">
                            <TouchableOpacity 
                                onPress={()=> navigation.goBack()}
                                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                            >
                                <ArrowLeftIcon size="20" color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center mx auto" style={{height:150}}>
                            <Image source={require('../assets/images/ChildReg.png')} style={{width: 165, height: 140}} />
                        </View>
                    </SafeAreaView>
                    <View className="flex-1 bg-white px-8 pt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor:'white'}}>
                        <View className="form space-y-2">
                            <Text className='mx-auto' style={{fontSize:20,color:'black', paddingBottom:10}}>Child Registration</Text>
                            <Text className="text-gray-700 ml-4">PickUp Location</Text>
                            <RNPickerSelector
                                placeholder={PickUpPlaceHolder}
                                items={PickUpOptions}
                                onValueChange={handlePickupLoc}
                                value={PickupLoc}
                            />
                            {PickUpLocError ? (
                                <Text style={{ color: "red", marginLeft: 20, marginBottom: 7 }}>
                                    {PickUpLocError}
                                </Text>
                            ) : null}
                            <Text className="text-gray-700 ml-4">DropOff Location</Text>
                            <RNPickerSelector
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
                            <Text className="text-gray-700 ml-4" style={{marginBottom:10}}>Upload Pictures</Text>
                            <View className="flex-row justify-center space-x-3">
                                <View>
                                    <Text>Front Profile</Text>
                                    <TouchableOpacity className="p-2 bg-transparent rounded-2xl" onPress={handleFrontProfilePress}>
                                        {FrontPhoto ? (
                                            <Image source={{uri : PicURI}} className="w-20 h-20 mx-auto" />
                                        ) : (
                                            <Image source={require('../assets/icons/upload.png')} className="w-20 h-20 mx-auto" />
                                        )}
                                        
                                    </TouchableOpacity>
            
                                </View>
                                
    
                            </View>
                            {FrontPhotoError ? (
                                        <Text style={{ color: "red", alignSelf: 'center', marginBottom: 10}}>
                                            {FrontPhotoError}
                                        </Text>
                                    ) : null}
                            <TouchableOpacity onPress={handleRegister} className="py-3 mx-auto bg-yellow-400 rounded-xl" style={{width:200}}>
                                <Text className="font-xl font-bold text-center text-white-700" style={{fontSize:15}}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{flex: 1}}>
                    {CameraLoader && (
                        <View style={{width:300 ,position: 'absolute', top: '50%', marginTop:'-50', marginLeft:50 , backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            <ActivityIndicator size="large" color="#ffffff" style={{marginTop:20}}/>
                            <Text style={{ color: '#ffffff', marginTop: 10 , marginBottom:20}}>Processing. Please wait...</Text>
                        </View>
                    )}
                    {FrontPhoto ? (
                        <View style={{flex: 1}}>
                            <Image source={{uri: FrontPhoto}} style={{flex: 1}} />
                            <View style={{position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={handleOK} style={{ padding: 10, borderRadius: 10, margin: 10 }} className="bg-yellow-400">
                                    <Text style={{ fontSize: 18, color: 'white' }}>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleRetake} style={{ padding: 10, borderRadius: 10, margin: 10 }} className="bg-yellow-400">
                                    <Text style={{ fontSize: 18, color: 'white' }}>Retake</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        
                        <Camera
                            // style={{ flex: 1 }}
                            // type={type}
                            // ref={cameraRef}
                            

                            style={{ flex: 1 }}
                            type={type}
                            ref={cameraRef}
                            onCameraReady={() => {
                                setPropsFaceDetector({
                                    onFacesDetected: handleFacesDetected,
                                    faceDetectorSettings:{
                                        mode: FaceDetector.FaceDetectorMode.fast, 
                                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
                                        minDetectionInterval: 125,
                                        tracking: false,
                                        }
                                });
                            }}
                            {...propsFaceDetector}
                           
                            // onFacesDetected={handleFacesDetected}
                            // faceDetectorSettings={{
                            //     mode: FaceDetector.FaceDetectorMode.fast, 
                            //     detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                            //     runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            //     minDetectionInterval: 125,
                            //     tracking: false,
                            //     }}
                                  
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View className="flex-row justify-start mt-12">
                                    <TouchableOpacity 
                                        onPress={changeCameraStatus}
                                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-full ml-4"
                                    >
                                        <ArrowLeftIcon size="20" color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row justify-start mt-12">
                                    <TouchableOpacity
                                        onPress={toggleCameraType}
                                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-full mr-4"
                                    >
                                        <ArrowPathIcon size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {isFrontFacing && isFaceDetected? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        width: faceDimensions.width,
                                        height: faceDimensions.height,
                                        borderWidth: 2,
                                        borderColor: 'green',
                                        borderRadius: 100, // This makes the box oval
                                        transform: [{ translateX: faceDimensions.x }, { translateY: faceDimensions.y }],
                                    }}
                                />
                            ):
                            (
                                <View
                                    style={{
                                        position: 'absolute',
                                        width: faceDimensions.width,
                                        height: faceDimensions.height,
                                        borderWidth: 2,
                                        borderColor: 'red',
                                        borderRadius: 100, // This makes the box oval
                                        transform: [{ translateX: faceDimensions.x }, { translateY: faceDimensions.y }],
                                    }}
                                />
                            )}
                            <View style={{ position: 'absolute', bottom: 90, alignSelf:'center'}}>
                                {isFrontFacing && isFaceDetected? (
                                    <Text style={{color:'white', fontWeight:'bold'}}>You can take picture now</Text>
                                ):(
                                    <Text style={{color:'red', fontWeight:'bold'}}>Please show front side of face</Text>
                                )}
                            </View>
                            <View style={{ position: 'absolute', bottom: 20, left: '50%', transform: [{ translateX: -20 }] }}>
                                {isFrontFacing && isFaceDetected? (
                                    
                                    <TouchableOpacity 
                                    onPress={takePicture}
                                    className="bg-yellow-400 p-8 rounded-full flex items-center justify-center"
                                    >

                                    </TouchableOpacity>
                                ) : (
                                  
                                    <TouchableOpacity 
                
                                    className="bg-yellow-200 p-8 rounded-full flex items-center justify-center"
                                    >

                                    </TouchableOpacity>
                                    
                                )}
                            </View>

                            
                        </Camera>
                    )}
                </View>
            )}
        </>
    );
}
