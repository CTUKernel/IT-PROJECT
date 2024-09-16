import React from "react";
import { Text, View, Pressable, ScrollView, Image } from "react-native";
import styles from "./receiveResultStyles";

function ReceiveResult() {
  const handlePress = () => {
    alert("Button Pressed!");
  };

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.OpenLine}>Đây là kết quả chẩn đoán của bạn</Text>

        <View style={styles.ResultCell}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/daca-96582.appspot.com/o/result%2Fdetected_img%2F82cfb852-8045-4cb6-90ef-46a9e3adee9d.jpg?alt=media",
            }}
            style={styles.resultImage} // Define the resultImage style in your stylesheet
          />
        </View>

        <Text style={styles.EndLine}>
          Bạn có thể làm một bài quiz để nhận một số gợi ý điều trị!
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#5195ba" : "#86c8eb" }, // Thay đổi màu khi nhấn
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

export default ReceiveResult;
