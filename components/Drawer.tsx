import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";

type Props = {
    isDesktop: boolean;
    collapsed: boolean;
    setCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
};

export default function DrawerContent(props: Props) {
    const { isDesktop, collapsed, setCollapsed } = props;
    const router = useRouter();
    const pathname = usePathname(); // Récupère le chemin courant

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Ionicons
                    name="person-circle"
                    size={collapsed ? 32 : 64}
                    color="#aaa"
                    style={{ marginBottom: 8 }}
                />
                {!collapsed && <Text style={styles.profileName}>John Doe</Text>}
            </View>

            <TouchableOpacity
                style={[
                    styles.navItem,
                    pathname.startsWith("/chat") && styles.activeNavItem,
                ]}
                onPress={() => !pathname.startsWith("/chat") && router.push("/chat/home")}
            >
                <Ionicons name="chatbubbles" size={24} color="#666" />
                {!collapsed && <Text style={styles.navText}>Chats</Text>}
            </TouchableOpacity>

            {/* Bouton pour Groups */}
            <TouchableOpacity
                style={[
                    styles.navItem,
                    pathname.startsWith("/groups") && styles.activeNavItem,
                ]}
                onPress={() => !pathname.startsWith("/groups") && router.push("/groups/home")}
            >
                <Ionicons name="people" size={24} color="#666" />
                {!collapsed && <Text style={styles.navText}>Groups</Text>}
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 24,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    profileName: {
        fontSize: 16,
        color: "#333",
    },
    navItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        width: "100%",
    },
    navText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },
    activeNavItem: {
        backgroundColor: "#e0e0e0", // Couleur de surbrillance pour le bouton actif
    },
});
