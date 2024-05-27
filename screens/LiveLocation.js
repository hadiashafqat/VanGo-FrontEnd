import React, { useState, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_IP } from '../config';

const LiveLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { childID } = route.params;

  const [mapRegion, setMapRegion] = useState({
    latitude: 33.5912,
    longitude: 73.0803,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerData, setMarkerData] = useState({
    latitude: 33.5694873,
    longitude: 73.1892869,
    timestamp: '14:29:57',
  });

  const fetchLocationData = async () => {
    try {
      const response = await axios.get(`${API_IP}/get_location/${childID}`);
      const data = response.data;

      // Update the state with the fetched location data
      setMarkerData({
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
      });
      console.log("location data: ", markerData);

      // Optionally, update the map region if needed
      setMapRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Request failed, Error fetching location data:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Fetch initial location data
      fetchLocationData();

      // Set up a timer to fetch data at regular intervals (e.g., every 1 second)
      const intervalId = setInterval(fetchLocationData, 10000);

      // Clear the interval when the screen loses focus
      return () => clearInterval(intervalId);
    }, [childID])
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker
          coordinate={{
            latitude: markerData.latitude,
            longitude: markerData.longitude,
          }}
          title={`VanGo at: ${markerData.timestamp}`}
        >
          <Image source={require('../assets/images/bus2.png')} style={styles.customMarker} />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    width: 35,
    height: 35,
  },
});

export default LiveLocation;
