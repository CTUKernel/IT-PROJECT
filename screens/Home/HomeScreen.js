import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { processResponse } from "../receiveResult/receiveResult";
import styles from "./styles"; // Import styles từ styles.js
import LoadHistory from "../viewHistory/loadHistory";

const HomeScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(""); // Biến trạng thái cho phản hồi từ backend

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
        Alert.alert(
          "Yêu cầu quyền truy cập",
          "Bạn cần cấp quyền truy cập thư viện phương tiện và máy ảnh để sử dụng tính năng này."
        );
      }
    };

    requestPermissions();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert("Đã thoát", "Bạn đã thoát chức năng chọn ảnh.");
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert("Đã thoát", "Bạn đã thoát camera");
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const ref = storage.ref().child(`pure_images/${filename}`); // Upload to 'pure_images' folder
    const snapshot = await ref.put(blob);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    setUploading(false);
    return downloadUrl;
  };

  const handleNavigateToResult = async () => {
    if (imageUri) {
      try {
        const imageUrl = await uploadImage(imageUri);

        const response = await fetch("http://34.143.239.0/detect/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: imageUrl,
          }),
        });

        const responseBody = await response.json(); // Dùng .json() để parse phản hồi

        // Lưu phản hồi JSON trực tiếp vào AsyncStorage
        await AsyncStorage.setItem(
          "responseData",
          JSON.stringify(responseBody)
        );

        console.log("Response status:", response.status);
        console.log("Response body:", responseBody);

        if (response.ok) {
          navigation.navigate("Result");
        } else {
          setResponseStatus(`Lỗi từ server: ${response.status}`);
          Alert.alert(
            "Lỗi xử lý",
            `Có lỗi xảy ra trong quá trình xử lý hình ảnh từ server: ${response.status}`
          );
        }
      } catch (error) {
        console.log("Error:", error);
        setResponseStatus("Có lỗi xảy ra trong quá trình tải ảnh.");
        Alert.alert(
          "Xử lý thất bại",
          "Có lỗi xảy ra trong quá trình tải ảnh. Xin vui lòng thử lại sau."
        );
      }
    } else {
      Alert.alert(
        "Xin vui lòng chọn ảnh",
        "Bạn cần chọn một hình ảnh để có thể thực hiện chức năng này"
      );
    }
  };

  const handleRemovePhoto = () => {
    setImageUri(null);
    setResponseStatus(""); // Reset trạng thái khi xóa ảnh
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>Chọn ảnh gương mặt của bạn</Text>
        <Text style={styles.description}>
          Hãy đảm bảo rằng hình ảnh với gương mặt của bạn không được trang điểm
          hoặc sử dụng bất kỳ công cụ bộ lọc hình ảnh nào.
        </Text>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleChoosePhoto}
        >
          {imageUri ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePlaceholder}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemovePhoto}
              >
                <Text style={styles.imagePlaceholderText}>x</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imagePlaceholderWrapper}>
              <Image
                source={require("../../assets/hinh/tvien.png")}
                style={styles.imagePlaceholder}
              />
              <Text style={styles.imagePlaceholderText}>Chọn ảnh</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>hoặc</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePhoto}
        >
          <Image
            source={require("../../assets/hinh/camera.png")}
            style={styles.captureButtonIcon}
          />
          <Text style={styles.captureButtonText}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container3}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToResult}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Nhận kết quả chẩn đoán</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.buttonText1}>Lịch sử chẩn đoán</Text>
        </TouchableOpacity>
        {responseStatus ? (
          <Text style={styles.responseStatus}>{responseStatus}</Text> // Hiển thị trạng thái phản hồi
        ) : null}
      </View>
    </View>
  );
};

export default HomeScreen;
