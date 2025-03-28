import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const conversations = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    { id: "4", name: "Julien" },
    { id: "5", name: "Support" },
];

export default function ChatHome() {
    const { theme } = useTheme();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.item, { backgroundColor: theme.inputBackground }]}
                        onPress={() =>
                            navigation.navigate("conversation" as never, { id: item.id } as never)
                        }
                    >
                        <Text style={[styles.name, { color: theme.text }]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "SpaceMono",
        marginBottom: 16,
    },
    list: {
        gap: 12,
    },
    item: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontFamily: "SpaceMono",
    },
});
