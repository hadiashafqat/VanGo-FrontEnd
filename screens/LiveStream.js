import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { API_IP } from '../config';

const LiveStream = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { childID } = route.params;
    console.log("child id in livestream: ",childID);

  const [cameraUrl, setCameraUrl] = useState(null);

  useEffect(() => {
    // Function to fetch camera URL from the API
    const fetchCameraUrl = async () => {
      try {
        const response = await axios.get(`${API_IP}/video_feed/${childID}`);

        if (response.status === 200) {
          const data = response.data;
          // Extract the camera URL from the response
          console.log(data);
          const  camera_url  = data.camera_URL;
          console.log(camera_url);
          setCameraUrl(camera_url);
        } else {
          console.error('Failed to fetch camera URL');
        }
      } catch (error) {
        console.error('Error fetching camera URL:', error.message);
      }
    };

    // Call the function to fetch camera URL
    fetchCameraUrl();
  }, []);

  const embedHtml = `
    <html>
      <body style="margin:0;padding:0;">
        <iframe
          width="100%"
          height="100%"
          src="${cameraUrl}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html: embedHtml }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default LiveStream;





// src="${cameraUrl}" 
//  "https://www.youtube.com/watch?v=UuO1TBzm5EQ"
