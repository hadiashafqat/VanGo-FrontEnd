import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChildRegScreen from './ChildRegScreen';
import ChildRegScreen2 from './ChildRegScreen2';
import LoginScreen from './LoginScreen';

const Drawer = createDrawerNavigator();

export default function drawer() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={LoginScreen} />
      <Drawer.Screen name="Profile" component={ChildRegScreen} />
      <Drawer.Screen name="Settings" component={ChildRegScreen2} />
    </Drawer.Navigator>
  );
}