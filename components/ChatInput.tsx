import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            blurOnSubmit={false} // Permet d'insérer un retour à la ligne
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
