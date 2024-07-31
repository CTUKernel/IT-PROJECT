// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';  // Import kiểu dáng từ file styles.js

const HomeScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Container 1 */}
      <View style={styles.container1}>
        <Text style={styles.title}>Chọn ảnh gương mặt của bạn</Text>
        <Text style={styles.description}>Hãy đảm bảo rằng hình ảnh với gương mặt của bạn không được trang điểm hoặc sử dụng bất kì công cụ bộ lọc hình ảnh nào.</Text>
      </View>

      {/* Container 2 */}
      <View style={styles.container2}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePlaceholder} />
          ) : (
            <Image source={require('../../assets/hinh/tvien.png')} style={styles.imagePlaceholder} />
          )}
          <Text style={styles.imagePlaceholderText}>Chọn ảnh</Text>
        </TouchableOpacity>

        {/* Đường thẳng ngang với dòng chữ "hoặc" */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>hoặc</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <Image source={require('../../assets/hinh/camera.png')} style={styles.captureButtonIcon} />
          <Text style={styles.captureButtonText}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>

      {/* Container 3 */}
      <View style={styles.container3}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Result')}
        >
          <Text style={styles.buttonText}>Nhận kết quả chẩn đoán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => Alert.alert('Nút 2 nhấn')}>
          <Text style={styles.buttonText1}>Lịch sử chẩn đoán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
