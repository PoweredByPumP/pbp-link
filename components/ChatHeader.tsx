import React from "react";
import {View, Text, StyleSheet, Platform} from "react-native";
import { useTheme } from "./ThemeContext";

export default function ChatHeader({ title }: { title: string }) {
  const { theme } = useTheme();

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
