import React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import hook navigation
import styles from "./receiveResultStyles";
import DefautAdvice from "./defaultAdvice";

function ReceiveResult() {
  const navigation = useNavigation(); // Khai báo hook navigation

  const handlePress = () => {
    navigation.navigate("QuizScreen"); // Điều hướng đến màn hình QuizScreen
  };

  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.OpenLine}>Đây là kết quả chẩn đoán của bạn</Text>
        <View style={styles.ResultCell}></View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#5195ba" : "#86c8eb" }, // Thay đổi màu khi nhấn
            ]}
            onPress={handlePress} // Gọi handlePress khi nhấn
          >
            <Text style={styles.buttonText}>Làm Quiz</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default ReceiveResult;
