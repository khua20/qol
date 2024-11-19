import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      {/* Greeting Text */}
      <Text style={styles.greetingText}>Hello...</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="type your name here"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefdeb', // Light background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // Darker text color for the greeting
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default IntroScreen;
