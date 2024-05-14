import { View, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React , {useEffect, useState} from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation , useRoute} from '@react-navigation/native';
import { auth } from '../config/firebase';
import email from '../assets/icons/email.png';
import call from '../assets/icons/phone-call.png';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export default function ComplaintScreen() {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);

    const user = auth.currentUser;

    const handleTextChange = (newText) => {
        setText(newText)
       
    }

    const handleOkay = () => {
        setSuccess(false);
        setText('');
    }
    const onSubmit = async () => {
        try {
            setSuccess(true);
          await send(
            'service_fzy3jif',
            'template_2rvne8m',
            {
              parentID : user.uid,
              message: text,
            },
            {
              publicKey: 'kQUuqdkF61yxJTNtT',
              
            },
          );
    
          
          
        } catch (err) {
            setSuccess(false)
          if (err instanceof EmailJSResponseStatus) {
            console.log('EmailJS Request Failed...', err);
          }
    
          console.log('ERROR', err);
        }
    };

    return (
        <View style={{backgroundColor:themeColors.bg, height:'100%'}}>
            {success && (
                        <View style={{borderRadius:10 ,width:300 ,position: 'absolute', top: '50%', marginTop:'-50', marginLeft:50 , backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            <Text style={{ color: '#ffffff', marginTop: 10 , marginBottom:20}}>Complaint Registered Successfully</Text>
                            <TouchableOpacity onPress={handleOkay}>
                                <Text style={{marginBottom:10, backgroundColor:'white', padding:10, borderRadius:10}}>Okay</Text>
                            </TouchableOpacity>
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
            <View className="mx-auto">
                <Text style={{fontSize:30,color:'white', paddingTop:30}}>Register Complaint</Text>
            </View>
            
            </SafeAreaView>
            <View style={{marginTop:30}}>
                <Text style={{color:'white', fontSize:18, margin:10}}>Please enter your compaint. We will get back to you in a few hours.</Text>
                <TextInput 
                    style={{height: 250, backgroundColor: 'white', margin: 10, textAlignVertical: 'top', padding:10, fontSize:17, borderRadius:10}}
                    multiline={true}
                    value={text}
                    onChangeText={handleTextChange}
                    cursorColor='black'
                />
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity 
                        onPress={onSubmit}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl w-20 items-center"
                    >
                        <Text style={{fontSize:15}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                
                
            </View>
            <View style={{height:'auto', marginTop:150}}>
                <Text style={{color:'white', fontSize:15, marginLeft:20}}>You can also Contact us at:</Text>
                <View style={{flexDirection:'row', marginLeft:20, marginTop:20}}>
                    <Image source={email} style={{height:30, width:30}} ></Image>
                    <Text style={{color:'white', textAlignVertical:'center', textAlign:'center', paddingLeft:5, fontSize:15}}> vangofyp@gmail.com</Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:20, marginTop:10}}>
                    <Image source={call} style={{height:30, width:30}} ></Image>
                    <Text style={{color:'white', textAlignVertical:'center', textAlign:'center', paddingLeft:5, fontSize:15}}> +92 333 1881191</Text>
                </View>
            </View>
        </View>
    )
}