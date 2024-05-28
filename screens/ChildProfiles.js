import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useEffect , useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon, Bars3Icon, XMarkIcon} from 'react-native-heroicons/solid';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import ChildCard from '../components/ChildCard';
import axios from 'axios';
import { API_IP } from '../config';
import { auth } from '../config/firebase';
import complaint from '../assets/icons/complaint.png';
import logout from '../assets/icons/logout.png';
import register from '../assets/icons/edit.png';
import logo from '../assets/icons/logo.png';

const {width, height} = Dimensions.get('window');

export default function ChildProfiles () {
    const navigation = useNavigation();
    const user = auth.currentUser;

    const [childrenData , setChildrenData] = useState("");
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const user_id = user.uid;

    const fetchChildData = async () => {
        try {
            const response = await axios.get(`${API_IP}/get_children_data/${user.uid}`);
            if (response.status === 200) {
              setChildrenData(response.data);
            } else if (response.status === 404) {
              setChildrenData([]);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setChildrenData([]);
            } else {
              console.log("Failed to get child data", error);
            }
          }
    };

    useEffect(() => {
        fetchChildData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchChildData();
        }, [])
    );
    

    const toggleSideBar = () => {
        setSideBarOpen(sideBarOpen => !sideBarOpen)
        console.log("Clicked", sideBarOpen)
    }

    return (
        <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>

            <SafeAreaView className="flex">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity 
                            onPress={toggleSideBar}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                            style={{marginLeft:20}}
                        >
                            <Bars3Icon size="20" color="black" />
                        </TouchableOpacity>
                    
                        <TouchableOpacity
                            onPress={()=> navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                            style={{marginRight:20}}
                        >
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
                
                    
                </View>
                <View className="flex-row justify-center mx auto"
                    style={{height:70}}
                >
                    
                    <Text style={{fontSize:30, color:'white',paddingTop:30}}>Children Profiles</Text>
                </View>
            
            </SafeAreaView>

            {sideBarOpen && (
                <View className='bg-yellow-500' style={{position:"absolute", left: 0, width: '60%', height: '100%', zIndex: 999, }}>
                    <TouchableOpacity
                            onPress={toggleSideBar}
                            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-auto"
                            style={{marginTop:30, marginRight:10}}
                        >
                            <XMarkIcon size="20" color="black" />
                    </TouchableOpacity>
                    
                    <View style={{flexDirection:'row', gap:10, marginLeft:15}}>
                        <Image source={logo} style={{width:60, height:60}}></Image>
                        <Text style={{fontSize:30, color:"black", textAlign:'center', justifyContent:'center', alignItems:'center', paddingTop:5}}>VANGO</Text>
                    </View>

                    <View style={{marginLeft:10, justifyContent:'space-between', marginTop:30, marginRight:10, flex:1}}>
                        
                        <View style={{ gap:20 }}>
                            <TouchableOpacity style={{ height: 50, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10 }}
                                onPress={() => navigation.navigate("ChildRegistration", {user_id})}
                            >
                                <Image source={register} style={{ width: 30, height: 30, marginLeft: 10 }} />
                                <Text style={{ fontSize: 20, color: "black" }}>Register Child</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ height: 50, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10 }}
                                onPress={()=>navigation.navigate("Complaint")}
                            >
                                <Image source={complaint} style={{ width: 30, height: 30, marginLeft: 10 }} />
                                <Text style={{ fontSize: 20, color: "black" }}>Complaint</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginBottom:20 ,height: 50, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10, marginTop: 'auto' }}
                            onPress={() => navigation.navigate("Welcome")}
                        >
                            <Image source={logout} style={{ width: 30, height: 30, marginLeft: 10 }} />
                            <Text style={{ fontSize: 20, color: "black" }}>Logout</Text>
                        </TouchableOpacity>
                   
                    </View>
                    
                    
                </View>
            )}

            <View className={"overflow-visible justify-center flex-1"}>
        
                <View>
                <Carousel
                    containerCustomStyle={{overflow: 'visible'}}
                    data={childrenData}
                    renderItem={({item})=> <ChildCard item={item} />}
                    firstItem={1}
                    loop={true}
                    inactiveSlideScale={0.75}
                    inactiveSlideOpacity={0.75}
                    sliderWidth={width}
                    itemWidth={width*0.63}
                    slideStyle={{display: 'flex', alignItems: 'center'}}
                />
                </View>
                
            </View>

        </View>
    )
}
