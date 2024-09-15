import React from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from './viewHistoryStyles'
import HistoryTable from './historyTable';

function ViewHistory() {
    const handlePress = () => {
        alert('Button Pressed!');
      };
    return (
        <View style={styles.Container}>
            <Text style={styles.OpenLine}>Lịch sử chẩn đoán</Text>
            <View style={styles.tableContainer}>
            {HistoryTable.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={[styles.cell, styles[`cell${cellIndex + 1}`]]}>
                    <Text style={[styles.text, rowIndex === 0 ? styles.headerText : 
                        styles.rowText]}>{cell}</Text>
                    </View>
                ))}
                </View>
            ))}
        </View>
        <View style={styles.buttonContainer}>
            <Pressable 
                style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#5195ba' : '#86c8eb' }]}
                    onPress={handlePress}
                >
                <Text style={styles.buttonText}>Quay về</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default ViewHistory;