import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  MenuIcon,
  HeartIcon,
  ArrowRightIcon,
} from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");
//const ios = Platform.OS == "ios";


export default function Dashboard(props) {
  const item = props.route.params;
  const [size, setSize] = useState("small");
  const navigation = useNavigation();
  const route = useRoute();
  const childID = route.params.childId;
  console.log("ChildID: ",childID)


  return (
    <ScrollView style={{ backgroundColor: "#000000" }}>
      <SafeAreaView>
        {/* Arrow and Heart Icons */}
        <View
          className="mx-4 flex-row justify-between items-center"
          style={{ marginTop: 15 }}
        >
          <TouchableOpacity
            className=" rounded-full "
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-full border-2 border-white p-2">
            <HeartIcon size="24" color="white" />
          </TouchableOpacity>
        </View>

        {/* Dashboard categories */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 35,
            marginLeft: 10,
            marginRight: 10,
          }}
        >

          {/* Livestream Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("LiveStream",{childID} )}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/live_stream5.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    View Live Stream
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={1}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    from CCTV insode Van
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>

          {/* Location Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("LiveLocation",{childID} )}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/location1.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    View Live Location
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    Track Van's journey on google Maps
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>
          

          {/* Attendance Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Attendance", {childId : childID})}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/attendance_5.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={3}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    View Attendance Records
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    View the past attendance records for the child in the van
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>


          {/* View Past Recordings Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PastRecordings")}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/live_stream6.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    View Past Recordings
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    View Previous Bus Journey Videos
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>

          {/* Payment Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment",{childID})}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/payment5.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    Make Payment
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    Make Monthly Payment using Card
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>
          

          {/* Edit ChildCard */}
          <TouchableOpacity
            onPress={() => navigation.navigate("EditChild",{childID} )}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/pages.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    Edit child Information
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={1}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    Change Child Information
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>

          {/* Unregister Child Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("UnregisterChild",{childID})}
            style={{
              width: "100%",
            }}
          >
            <View
              // key={coffee.id}
              style={{
                width: "100%",
                marginBottom: 10,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <BlurView
                className="flex-row items-center p-3 rounded-3xl shadow-2xl mb-3 mx-2"
                tint="dark"
                intensity={200}
                style={{
                  padding: 10,
                }}
              >
                <Image
                  className="rounded-3xl"
                  source={require("../assets/images/unregister2.png")}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />

                <View className="flex flex-1 space-y-3">
                  <Text
                    className="pl-5"
                    numberOfLines={2}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 25,
                      marginTop: 10,
                    }}
                  >
                    Unregister                        Child
                  </Text>
                  <Text
                    className="pl-5"
                    numberOfLines={1}
                    style={{ color: "#52555A", fontSize: 12 }}
                  >
                    Unsubscribe from VanGo service
                  </Text>
                </View>
              </BlurView>
            </View>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
