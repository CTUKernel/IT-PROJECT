import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import QuestionaireOptions from './questionaireOptions';
import QuestionaireAdvice from './questionaireAdvice';
import styles from './questionaireStyles';

const categories = Object.keys(QuestionaireOptions);

const Questionnaire = () => {
  const [selectedOptions, setSelectedOptions] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: [] }), {})
  );
  const [showAdvice, setShowAdvice] = useState(false);
  const [advice, setAdvice] = useState({});

  const handleOptionPress = (category, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const isSelected = prevSelectedOptions[category].includes(option);
      if (isSelected) {
        return {
          ...prevSelectedOptions,
          [category]: prevSelectedOptions[category].filter((item) => item !== option),
        };
      } else {
        return {
          ...prevSelectedOptions,
          [category]: [...prevSelectedOptions[category], option],
        };
      }
    });
  };

  const calculatePercentage = () => {
    const percentages = categories.map((category) => ({
      category,
      percentage: (selectedOptions[category].length / QuestionaireOptions[category].length) * 100,
    }));

    const allLessThanFifty = percentages.every((p) => p.percentage < 50);
    const allEqual = percentages.every((p, _, arr) => p.percentage === arr[0].percentage);

    if (allLessThanFifty && allEqual) {
      Alert.alert('Error', 'Please select more options.');
      return;
    }

    const maxPercentage = Math.max(...percentages.map((p) => p.percentage));
    const topCategories = 
    percentages.filter((p) => p.percentage === maxPercentage).map((p) => p.category);

    const adviceToShow = topCategories.reduce((acc, category) => {
      acc[category] = QuestionaireAdvice[category];
      return acc;
    }, {});

    setAdvice(adviceToShow);
    setShowAdvice(true);
  };

  const renderOptions = (category) => {
    return (
      <View style={styles.optionsContainer}>
        {QuestionaireOptions[category].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOptions[category].includes(option) && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionPress(category, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        {categories.map((category, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            {renderOptions(category)}
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={calculatePercentage}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {showAdvice && (
          <View style={styles.adviceContainer}>
            <Text style={styles.adviceTitle}>Gợi ý điều trị:</Text>
            {Object.keys(advice).map((category, index) => (
              <View key={index} style={styles.categoryContain}>
                <Text style={styles.categoryTitle}>Đối với những vấn đề {category}:</Text>
                {advice[category].map((item, subIndex) => (
                  <Text key={subIndex} style={styles.adviceText}>{item}</Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Questionnaire;
