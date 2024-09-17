import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, Pressable, ScrollView, Image } from "react-native";
import styles from "./receiveResultStyles";

export async function processResponse() {
  try {
    const responseData = await AsyncStorage.getItem("responseData");
    if (responseData) {
      const parsedData = JSON.parse(responseData);
      if (parsedData && parsedData.data && parsedData.data.detected_image_url) {
        return parsedData.data.detected_image_url;
      }
    }
    console.log("No image URL found in storage");
    return null;
  } catch (error) {
    console.error("Error fetching data from AsyncStorage:", error);
    return null;
  }
}

export function ReceiveResult() {
  const handlePress = () => {
    alert("Button Pressed!");
  };
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const getImageUrl = async () => {
      const imageUrl = await processResponse();
      setUrl(imageUrl);
    };
    getImageUrl();
  }, []);

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.OpenLine}>Đây là kết quả chẩn đoán của bạn</Text>

        <View style={styles.ResultCell}>
          {url ? (
            <Image source={{ uri: url }} style={styles.resultImage} />
          ) : (
            <Text>No image available</Text>
          )}
        </View>

        <Text style={styles.EndLine}>
          Bạn có thể làm một bài quiz để nhận một số gợi ý điều trị!
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#5195ba" : "#86c8eb" },
            ]}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>Làm Quiz</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
