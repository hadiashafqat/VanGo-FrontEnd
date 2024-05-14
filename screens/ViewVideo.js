import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { API_IP } from '../config';

const ViewVideo = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { videoID } = route.params;
    const selectedVideo = videoID;
    console.log("in view video: ",selectedVideo);


  const embedHtml = `
    <html>
    <body style="margin:0;padding:0; background-color: #FFFFFF;">
        <iframe
          width="100%"
          height="100%"
          style="border: 5px solid black;"
          src="https://www.youtube.com/embed/${selectedVideo}"
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

export default ViewVideo;





