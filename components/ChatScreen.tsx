import React, { useRef, useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
    Keyboard,
    LayoutAnimation,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from "react-native";
import ChatInput from "./ChatInput";
import { useTheme } from "./ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export type Message = {
    id: string;
    content: string;
    fromSelf: boolean;
    author: string;
    replyTo?: Message;
};

type Props = {
    author: string;
    messages: Message[];
    onSend: (msg: Message) => void;
};

export default function ChatScreen({ author, messages, onSend }: Props) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const tabBarHeight = Platform.OS === "ios" ? useBottomTabBarHeight() : 0;
    const flatListRef = useRef<FlatList>(null);
    const messageRefs = useRef(new Map<string, View>()).current;

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [selectedReply, setSelectedReply] = useState<Message | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
        return () => clearTimeout(timeout);
    }, [messages]);

    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", () => {
            LayoutAnimation.easeInEaseOut();
            setIsKeyboardVisible(true);
        });
        const hide = Keyboard.addListener("keyboardDidHide", () => {
            LayoutAnimation.easeInEaseOut();
            setIsKeyboardVisible(false);
        });

        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    const keyboardOffset =
        Platform.OS === "ios" ? tabBarHeight + insets.bottom + 21 : 0;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={keyboardOffset}
        >
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        const prev = index > 0 ? messages[index - 1] : null;
                        const showAuthor = !item.fromSelf && (!prev || prev.author !== item.author);

                        return (
                            <>
                                {showAuthor && (
                                    <Text style={[styles.authorText, { color: theme.text }]}>
                                        {item.author}
                                    </Text>
                                )}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onLongPress={() => setSelectedReply(item)}
                                    delayLongPress={250}
                                >
                                    <View
                                        ref={(ref) => {
                                            if (ref) messageRefs.set(item.id, ref);
                                        }}
                                        style={[
                                            styles.messageBubble,
                                            {
                                                backgroundColor: item.fromSelf
                                                    ? theme.primary
                                                    : theme.inputBackground,
                                                alignSelf: item.fromSelf ? "flex-end" : "flex-start",
                                            },
                                        ]}
                                    >
                                        {item.replyTo && (
                                            <View
                                                style={[
                                                    styles.replyPreview,
                                                    {
                                                        borderLeftColor: item.fromSelf
                                                            ? "#ffffff99"
                                                            : theme.primary,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={[
                                                        styles.replyPreviewText,
                                                        {
                                                            color: item.fromSelf ? "#ffffffcc" : theme.text,
                                                        },
                                                    ]}
                                                >
                                                    {item.replyTo.content}
                                                </Text>
                                            </View>
                                        )}
                                        <Text
                                            style={[
                                                styles.messageText,
                                                {
                                                    color: item.fromSelf ? "#fff" : theme.text,
                                                    textAlign: item.fromSelf ? "right" : "left",
                                                },
                                            ]}
                                        >
                                            {item.content}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        );
                    }}
                    contentContainerStyle={styles.messageList}
                    keyboardShouldPersistTaps="handled"
                />

                {selectedReply && (
                    <View style={[styles.replyContainer, { borderColor: theme.primary }]}>
                        <View style={styles.replyContent}>
                            <Text style={[styles.replyLabel, { color: theme.primary }]}>En réponse à :</Text>
                            <Text numberOfLines={1} style={[styles.replyText, { color: theme.text }]}>
                                {selectedReply.content}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setSelectedReply(null)}>
                            <Ionicons name="close" size={20} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                )}

                <ChatInput
                    onSend={(text: string) => {
                        onSend({
                            id: Date.now().toString(),
                            content: text,
                            fromSelf: true,
                            author: author,
                            replyTo: selectedReply ?? undefined,
                        });
                        setSelectedReply(null);
                    }}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create<{
    container: ViewStyle;
    messageList: ViewStyle;
    messageBubble: ViewStyle;
    messageText: TextStyle;
    replyContainer: ViewStyle;
    replyContent: ViewStyle;
    replyLabel: TextStyle;
    replyText: TextStyle;
    replyPreview: ViewStyle;
    replyPreviewText: TextStyle;
    authorText: TextStyle;
}>({
    container: {
        flex: 1,
    },
    messageList: {
        padding: 8,
        paddingBottom: 12,
    },
    messageBubble: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        maxWidth: "80%",
    },
    messageText: {
        fontSize: 16,
        fontFamily: "SpaceMono",
    },
    replyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeftWidth: 3,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        marginBottom: 4,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 4,
    },
    replyContent: {
        flex: 1,
        paddingRight: 8,
    },
    replyLabel: {
        fontSize: 12,
        fontFamily: "SpaceMono",
    },
    replyText: {
        fontSize: 14,
        fontFamily: "SpaceMono",
    },
    replyPreview: {
        borderLeftWidth: 3,
        paddingLeft: 6,
        marginBottom: 4,
    },
    replyPreviewText: {
        fontSize: 12,
        fontFamily: "SpaceMono",
    },
    authorText: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 2,
        marginLeft: 8,
        fontFamily: "SpaceMono",
    },
});
