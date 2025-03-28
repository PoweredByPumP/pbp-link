import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";

const isWeb = Platform.OS === "web";

export default function ChatInput({ onSend }) {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(40);
  const contentHeightRef = useRef(40);
  const textInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend(message.trim());
      setMessage("");
      setInputHeight(40);
      contentHeightRef.current = 40;
    }
  };

  const handleContentSizeChange = (
      e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const maxHeight = 5 * 20 + 16;
    const newHeight = e.nativeEvent.contentSize.height;
    const clamped = Math.min(Math.max(40, newHeight), maxHeight);
    contentHeightRef.current = clamped;
    setInputHeight(clamped);
  };

  const handleTextChange = (text: string) => {
    setMessage(text);

    if (textInputRef.current) {
      textInputRef.current.measure((x, y, width, height, pageX, pageY) => {
        const estimatedHeight = text.split("\n").length * 20 + 16;
        const maxHeight = 5 * 20 + 16;
        const clamped = Math.min(Math.max(40, estimatedHeight), maxHeight);
        setInputHeight(clamped);
        contentHeightRef.current = clamped;
      });
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<any>) => {
    if (isWeb && e.nativeEvent.key === "Enter" && !e.nativeEvent.shiftKey) {
      e.preventDefault?.();
      handleSend();
    }
  };

  useEffect(() => {
    if (message === "") {
      setInputHeight(40);
    }
  }, [message]);

  return (
      <View
          style={[
            styles.container,
            {
              backgroundColor: theme.background,
              borderTopColor: theme.border,
            },
          ]}
      >
        <TextInput
            ref={textInputRef}
            style={[
              styles.input,
              {
                height: inputHeight,
                backgroundColor: theme.inputBackground,
                color: theme.text,
                ...(Platform.OS === "web" && { outlineStyle: "none" }),
              },
            ]}
            placeholder="Écrire un message..."
            placeholderTextColor={theme.text}
            value={message}
            onChangeText={handleTextChange}
            onContentSizeChange={handleContentSizeChange}
            onKeyPress={handleKeyPress}
            multiline
            numberOfLines={1}
            scrollEnabled={inputHeight >= 5 * 20}
        />
        <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: theme.primary }]}
            onPress={handleSend}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
    fontFamily: "SpaceMono",
    textAlignVertical: "top",
  },
  sendButton: {
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
