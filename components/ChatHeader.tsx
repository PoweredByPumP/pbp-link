import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatHeader() {
  return (
      <View style={styles.header}>
        <Text style={styles.text}>John Doe</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
