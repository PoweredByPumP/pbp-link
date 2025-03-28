import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

export default function ChatInput() {
  return (
      <View style={styles.container}>
        <TextInput placeholder="Message" style={styles.input} />
        <TouchableOpacity style={styles.sendButton}>
          <ArrowUpRight />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  sendButton: {
    padding: 8,
  },
});
