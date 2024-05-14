import { View, Text, Image, TouchableOpacity, Dimensions, Platform, ImageBackground } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
const { width, height } = Dimensions.get('window');
import {ArrowRightIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function ChildCard({ item }) {
  const navigation = useNavigation();
  return (
    <View style={{
      backgroundColor: themeColors.bgDark,
      shadowColor: themeColors.bgDark,
      shadowRadius: 25,
      shadowOffset: { width: 0, height: 40 },
      shadowOpacity: 0.8,
      borderRadius: 40,
      height: Platform.OS === 'ios' ? height * 0.4 : height * 0.5,
      width: width * 0.65,
      overflow: 'hidden',
    }}>
      <ImageBackground
        source={{ uri: `data:image/jpeg;base64,${item.picture_base64}` }}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 20, 
          overflow: 'hidden', 
        }}
        
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            {/* <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>{item.name}</Text>
             */}
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Dashboard', { childId: item.id })}
            className="bg-yellow-400 p-2 rounded-full ml-4"
            style={{marginLeft:20}}
          >
            <ArrowRightIcon size="20" color="black" />
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', top:250}}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
            
        </View>
        
      </ImageBackground>
      
    </View>
  )
}