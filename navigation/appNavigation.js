import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from "../hooks/useAuth";
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ParentRegScreen from '../screens/ParentRegScreen';
import ParentRegScreen2 from '../screens/ParentRegScreen2';
import ChildRegScreen from '../screens/ChildRegScreen';
import ChildRegScreen2 from '../screens/ChildRegScreen2';
import ChildProfiles from '../screens/ChildProfiles';
import Dashboard from '../screens/Dashboard';
import AttendanceScreen from '../screens/AttendanceScreen';
import ChildNav from '../screens/ChildNav';
import SuccessfulParentReg from '../screens/SuccessfulPReg';
import SuccessfulChildReg from '../screens/SuccessfulCReg';
import SuccessfulCAdded from '../screens/SuccessfulCAdded';
import LiveStream from '../screens/LiveStream';
import PastRecordings from '../screens/PastRecordings';
import ViewVideo from '../screens/ViewVideo';
import LiveLocation from '../screens/LiveLocation';
import Payment from '../screens/Payment';
import ComplaintScreen from '../screens/ComplaintScreen';
import EditChild from '../screens/EditChild';
import UnregisterChild from '../screens/UnregisterChild';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  const { user } = useAuth();

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ChildProfile'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={ParentRegScreen} />
          <Stack.Screen name="SignUp2" options={{headerShown: false}} component={ParentRegScreen2} />
          <Stack.Screen name="SuccessfulParentReg" options={{headerShown: false}} component={SuccessfulParentReg} />
          <Stack.Screen name="SuccessfulChildReg" options={{headerShown: false}} component={SuccessfulChildReg} />
          <Stack.Screen name="SuccessfulChildAdded" options={{headerShown: false}} component={SuccessfulCAdded} />
          <Stack.Screen name="ChildRegistration" options={{headerShown:false}} component={ChildRegScreen}/>
          <Stack.Screen name="ChildRegistration2" options={{headerShown:false}} component={ChildRegScreen2}/>
          <Stack.Screen name="ChildProfile" options={{headerShown:false}} component={ChildProfiles}/>
          <Stack.Screen name="Dashboard" options={{headerShown:false}} component={Dashboard}/>
          <Stack.Screen name="LiveStream" options={{headerShown:false}} component={LiveStream}/>
          <Stack.Screen name="Attendance" options={{headerShown:false}} component={AttendanceScreen}/>
          <Stack.Screen name="PastRecordings" options={{headerShown:false}} component={PastRecordings}/>
          <Stack.Screen name="LiveLocation" options={{headerShown:false}} component={LiveLocation}/>
          <Stack.Screen name="Payment" options={{headerShown:false}} component={Payment}/>
          <Stack.Screen name="ViewVideo" options={{headerShown:false}} component={ViewVideo}/>
          <Stack.Screen name="NavBar" options={{headerShown:false}} component={ChildNav}/>
          <Stack.Screen name="Complaint" options={{headerShown:false}} component={ComplaintScreen}/>
          <Stack.Screen name="EditChild" options={{headerShown:false}} component={EditChild}/>
          <Stack.Screen name="UnregisterChild" options={{headerShown:false}} component={UnregisterChild}/>
          {/* <Stack.Screen name="DrawerNav" component={DrawerNav}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    )

  }
  else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={ParentRegScreen} />
          <Stack.Screen name="SignUp2" options={{headerShown: false}} component={ParentRegScreen2} />
          <Stack.Screen name="SuccessfulParentReg" options={{headerShown: false}} component={SuccessfulParentReg} />
          <Stack.Screen name="SuccessfulChildReg" options={{headerShown: false}} component={SuccessfulChildReg} />
          <Stack.Screen name="SuccessfulChildAdded" options={{headerShown: false}} component={SuccessfulCAdded} />
          <Stack.Screen name="ChildRegistration" options={{headerShown:false}} component={ChildRegScreen}/>
          <Stack.Screen name="ChildRegistration2" options={{headerShown:false}} component={ChildRegScreen2}/>
          <Stack.Screen name="ChildProfile" options={{headerShown:false}} component={ChildProfiles}/>
          <Stack.Screen name="Dashboard" options={{headerShown:false}} component={Dashboard}/>
          <Stack.Screen name="LiveStream" options={{headerShown:false}} component={LiveStream}/>
          <Stack.Screen name="Attendance" options={{headerShown:false}} component={AttendanceScreen}/>
          <Stack.Screen name="PastRecordings" options={{headerShown:false}} component={PastRecordings}/>
          <Stack.Screen name="LiveLocation" options={{headerShown:false}} component={LiveLocation}/>
          <Stack.Screen name="Payment" options={{headerShown:false}} component={Payment}/>
          <Stack.Screen name="ViewVideo" options={{headerShown:false}} component={ViewVideo}/>
          <Stack.Screen name="NavBar" options={{headerShown:false}} component={ChildNav}/>
          <Stack.Screen name="Complaint" options={{headerShown:false}} component={ComplaintScreen}/>
          <Stack.Screen name="EditChild" options={{headerShown:false}} component={EditChild}/>
          <Stack.Screen name="UnregisterChild" options={{headerShown:false}} component={UnregisterChild}/>
          {/* <Stack.Screen name="LiveStream" options={{headerShown:false}} component={LiveStream}/> */}
          {/* <Stack.Screen name="DrawerNav" component={DrawerNav}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


//TO REMOVE PAST RECORDINGS TWO