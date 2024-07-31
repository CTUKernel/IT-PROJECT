import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './receiveResultStyles'
import DefautAdvice from './defaultAdvice';

function ReceiveResult() {
    const handlePress = () => {
        alert('Button Pressed!');
      };
    return (
        <View style={styles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.OpenLine}>Đây là kết quả chẩn đoán của bạn</Text>
                <View style={styles.ResultCell}></View>
                <Text style={styles.EndLine}>Dưới đây là một số đề xuất bạn có thể tham khảo:</Text>
                <ScrollView style={styles.DefautAdviceContainer}>
                {DefautAdvice.map(item => (
                    <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.name}>{item.name}:</Text>
                    <Text style={styles.caution}>Lưu ý: {item.caution}</Text>
                    <Text style={styles.description}>Đề xuất sử dụng: {item.description}</Text>
                    </View>
                ))}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#5195ba' : '#86c8eb' } // Thay đổi màu khi nhấn
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