import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChildNav () {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'yellow', padding: 20 }}>
      {/* Profile Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>User Name</Text>
        {/* Add other profile details here */}
      </View>

      {/* Options Section */}
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
        <TouchableOpacity
          style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          onPress={() => console.log('Home')}
        >
          <Text style={{ fontSize: 16, color: 'black' }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          onPress={() => console.log('Login')}
        >
          <Text style={{ fontSize: 16, color: 'black' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          onPress={() => console.log('Logout')}
        >
          <Text style={{ fontSize: 16, color: 'black' }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          onPress={() => console.log('Signup')}
        >
          <Text style={{ fontSize: 16, color: 'black' }}>Signup</Text>
        </TouchableOpacity>
        {/* Add more options as needed */}
      </View>
    </View>
  )
}


