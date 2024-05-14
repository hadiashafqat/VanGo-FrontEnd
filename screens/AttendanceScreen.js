import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React , {useEffect, useState} from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation , useRoute} from '@react-navigation/native';
import {Table, Row, TableWrapper, Rows} from 'react-native-table-component'
import axios from 'axios';
import { auth } from '../config/firebase';
import { API_IP } from '../config';


export default function AttendanceScreen () {
    const navigation = useNavigation();
    const headers = ['Date','Time','Status'];
    const rows = [
        ['9/30/2023','9:55','Entered'],
        ['9/30/2023','10:55','Left'],

    ];
    const [attendanceData , setAttendanceData] = useState([]);
    const route = useRoute();
    const childId = route.params.childId;
    console.log(childId)
    
    useEffect (()=> {
        const getAttendanceRecord = async() => {
            try {
                const response = await axios.get(`${API_IP}/get_attendance/${childId}`);
                setAttendanceData(response.data);
                console.log(attendanceData);
            }
            catch(error) {
                console.log("Couldnt get child attendance ",error);
            }

        }
        getAttendanceRecord();
    }, [])

    return (
        <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
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
                <Text style={{fontSize:30,color:'white', paddingTop:30}}>Attendance Records</Text>
            </View>
            
            </SafeAreaView>

            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1,padding:10}}>
                    <Table borderStyle={{borderWidth:1,borderColor:'white'}}>
                        <Row data={headers} 
                        textStyle={{color:'white', textAlign:'center'}}
                        style={{height:30}}  />

                        <TableWrapper>
                            {attendanceData.length > 0 ? (
                                <Rows
                                data={attendanceData}
                                style={{ height: 30 }}
                                textStyle={{ color: 'white', textAlign: 'center' }}
                                />
                            ) : (
                                null
                            )}
                        </TableWrapper>
                    </Table>
                </View>
            </SafeAreaView>
            
        </View>
    )
}
