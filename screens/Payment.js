import React, { useEffect, useState } from "react";
import { Button, View, Alert, TouchableOpacity, Text } from "react-native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_IP } from "../config";

function Payment() {
  const navigation = useNavigation();
  const route = useRoute();

  const { parentID, Full_Name, Email, Password, childID } = route.params;

  var Flag = true;
  if( Full_Name == null || !Full_Name) {
    Flag = false;
  }
  console.log("fullname: ",Email);
  
  console.log("Flag: ", Flag);

  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = useStripe();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Send API request to retrieve payment status, pickup location, and dropoff location
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`${API_IP}/get_payment_stat/${childID}`, {
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // Empty body for POST request
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log("Response Data: ",responseData); // Print the response data
        const { Jprice, payment_status, pickup_location, dropoff_location } = responseData;

        setPickup(pickup_location);
        setDropoff(dropoff_location);
        setPrice(Jprice);

        // If payment status is null or false, initialize payment sheet
        if (!payment_status) {
          console.log("Initializing Payment Sheet, sending second request");
          initialisePaymentSheet();
        } else {
          Alert.alert(
            "Payment Already Made",
            "Payment for this month has already been made."
          );
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchPaymentStatus();
  }, []);

  
  const fetchPaymentSheetParams = async () => {
    console.log("Price: ",price);
    const response = await fetch(`${API_IP}/payment-sheet/${childID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const initialisePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        customerId: customer, // Note the corrected field name here
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "VanGo Bus Service",
        allowsDelayedPaymentMethods: true,
      });
      if (error) {
        Alert.alert(`Error.code: ${error.code}`, error.message);
      } else {
        setReady(true);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const buy = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error.code: ${error.code}`, error.message);
    } else {
      try {
        const confirmResponse = await fetch(
          `${API_IP}/confirm_payment_success/${childID}`
        );

        if (!confirmResponse.ok) {
          throw new Error("Failed to confirm payment");
        }

        Alert.alert("Success", "The Payment was confirmed Successfully");
        setReady(false); // Reset payment readiness state
        // setPrice("");
        if(Flag == true) {
          navigation.navigate("SuccessfulChildReg", {parentID, Email, Password, Full_Name});
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51P1Y69P5S3CJSYDgsPT4RjRut1FD6ARLZFMqtX5Sb1MdkGwwB4nlUWIgcST61TGXeOz6d5Vzmo6R9tuugWdgBzbC00SrIWktou">
      <View style={{ flex: 1, justifyContent: "center" }} className="bg-black">
        <Text
          style={{
            marginBottom: 10,
            color: "white",
            marginHorizontal: 35,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          <Text style={{ lineHeight: 40 }}>Monthly Pick and Drop Journey</Text>
          {"\n"}
          <Text style={{ lineHeight: 45, color: "red" }}>{pickup}</Text>
          {"\n"}
          <Text style={{ lineHeight: 30 }}>to</Text>
          {"\n"}
          <Text style={{ lineHeight: 45, color: "red" }}>{dropoff}</Text>
          {"\n"}
          <Text style={{ lineHeight: 60 }}>The Due Amount is:</Text>
        </Text>
        <Text
          style={{
            marginBottom: 60,
            marginTop: 10,
            color: "white",
            paddingHorizontal: 15,
            fontWeight: "bold",
            fontSize: 48,
            textAlign: "center",
          }}
        >
          PKR {price}
        </Text>
        <TouchableOpacity
          onPress={buy}
          className={`py-3 mx-12 rounded-xl ${
            loading || !ready ? "bg-gray-300" : "bg-yellow-400"
          }`}
          disabled={loading || !ready}
        >
          <Text className="text-xl font-bold text-center text-gray-700">
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}

export default Payment;
