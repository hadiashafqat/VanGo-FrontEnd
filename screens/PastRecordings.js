import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import YouTube from "react-native-youtube";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PastRecordings = () => {
  const navigation = useNavigation();

  const [playlistData, setPlaylistData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [areVideosVisible, setAreVideosVisible] = useState(false);

  const API_KEY = "AIzaSyDz2DzpYHdURmO-51wsXxbc3wOF4QSizrA";
  const CHANNEL_ID = "UCirdUOy6CbSwueQLGyryPew";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${CHANNEL_ID}&maxResults=100&key=${API_KEY}`
        );
        setPlaylistData(response.data.items);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchVideos = async (playlistId) => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}`
      );
      setVideosData(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const toggleVideoVisibility = () => {
    setAreVideosVisible((prevValue) => !prevValue);
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
    style={styles.videoItem}
    onPress={() => navigation.navigate("ViewVideo", { videoID: item.snippet.resourceId.videoId })}
  >
      <Image
        source={{ uri: item.snippet.thumbnails.high.url }}
        style={styles.videoThumbnail}
        onPress= {() => navigation.navigate("ViewVideo", {videoID: item.snippet.resourceId.videoId} )}
      />
      <Text style={styles.videoTitle}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Text style={styles.playlistTitle}>{item.snippet.title}</Text>
      <Text style={styles.playlistDescription}>{item.snippet.description}</Text>
      <TouchableOpacity onPress={() => {
        setSelectedPlaylist(item.id);
        fetchVideos(item.id);
        toggleVideoVisibility();
      }}>
        <Text style={styles.loadVideosButton}>
          {areVideosVisible ? "Hide Videos" : "Load Videos"}
        </Text>
      </TouchableOpacity>

      {selectedPlaylist === item.id && areVideosVisible && videosData.length > 0 && (
        <FlatList
          data={videosData}
          keyExtractor={(video) => video.id}
          renderItem={renderVideoItem}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAST RECORDINGS</Text>
      <FlatList
        data={playlistData}
        keyExtractor={(playlist) => playlist.id}
        renderItem={renderPlaylistItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 50,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  playlistItem: {
    marginBottom: 30,
    fontWeight: "bold",
  },
  playlistTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  playlistDescription: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
  loadVideosButton: {
    color: "black",
    fontSize: 16,
    marginBottom: 15,
  },
  videosContainer: {
    marginTop: 20,
  },
  videoItem: {
    marginBottom: 15,
  },
  videoThumbnail: {
    width: 320,
    height: 180,
    alignSelf: "center",
    borderWidth: 2, // Set the border width (adjust as needed)
    borderColor: "black",
  },
  videoTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
});

export default PastRecordings;
