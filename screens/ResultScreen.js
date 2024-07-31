// screens/ResultScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ResultScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/hinh/results.png')} // Đảm bảo bạn có hình ảnh ở đây
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ResultScreen;
