import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import ChatInput from "../../components/ChatInput";

type Message = {
    id: string;
    content: string;
    // ... autres champs si besoin (auteur, date, etc.)
};

export default function ChatHome() {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (newMessage: string) => {
        const msg: Message = {
            id: Date.now().toString(),
            content: newMessage,
        };
        setMessages((prev) => [...prev, msg]);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <SafeAreaView style={styles.container}>
                {/* Zone d’affichage des messages */}
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.messageBubble}>
                            <Text>{item.content}</Text>
                        </View>
                    )}
                    style={styles.messageList}
                />

                {/* Barre de saisie en bas */}
                <ChatInput onSend={handleSendMessage} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageList: {
        flex: 1,
        padding: 8,
    },
    messageBubble: {
        backgroundColor: "#e5e5e5",
        borderRadius: 8,
        padding: 12.5,
        marginBottom: 8,
        alignSelf: "flex-start",
        maxWidth: "80%",
    },
});
