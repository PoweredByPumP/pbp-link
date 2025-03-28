import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    DrawerContentScrollView,
    DrawerNavigationProp,
} from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "./ThemeContext";

type Props = {
    navigation: DrawerNavigationProp<any>;
    isDesktop: boolean;
    collapsed: boolean;
    setCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
};

export default function DrawerContent(props: Props) {
    const { navigation, isDesktop, collapsed, setCollapsed } = props;
    const router = useRouter();
    const pathname = usePathname();
    const { theme, mode, setMode } = useTheme();

    const toggleTheme = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    return (
        <DrawerContentScrollView
            contentContainerStyle={[
                Platform.OS !== "ios" ? styles.container : styles.iosContainer,
                { backgroundColor: theme.drawer.background },
            ]}
        >
            <View style={[styles.profileContainer, { backgroundColor: theme.drawer.headerBackground }]}>
                <Ionicons
                    name="person-circle"
                    size={collapsed ? 32 : 64}
                    color={theme.drawer.icon}
                    style={{ marginBottom: 8 }}
                />
                {!collapsed && (
                    <Text style={[styles.profileName, { color: theme.drawer.text }]}>
                        John Doe
                    </Text>
                )}
            </View>

            <TouchableOpacity
                style={[
                    styles.navItem,
                    pathname.startsWith("/chat") && {
                        backgroundColor: theme.drawer.activeItem,
                    },
                ]}
                onPress={() => {
                    if (!pathname.startsWith("/chat")) {
                        navigation.jumpTo("chat");
                        navigation.openDrawer();
                    } else if (!isDesktop) {
                        navigation.closeDrawer();
                    }
                }}
            >
                <Ionicons name="chatbubbles" size={24} color={theme.drawer.icon} />
                {!collapsed && (
                    <Text style={[styles.navText, { color: theme.drawer.text }]}>Chats</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.navItem,
                    pathname.startsWith("/groups") && {
                        backgroundColor: theme.drawer.activeItem,
                    },
                ]}
                onPress={() => {
                    if (!pathname.startsWith("/groups")) {
                        navigation.jumpTo("groups");
                        navigation.openDrawer();
                    } else if (!isDesktop) {
                        navigation.closeDrawer();
                    }
                }}
            >
                <Ionicons name="people" size={24} color={theme.drawer.icon} />
                {!collapsed && (
                    <Text style={[styles.navText, { color: theme.drawer.text }]}>Groupes</Text>
                )}
            </TouchableOpacity>

            {/* Toggle Button */}
            <TouchableOpacity
                style={styles.navItem}
                onPress={toggleTheme}
            >
                <Ionicons
                    name={mode === "dark" ? "sunny-outline" : "moon-outline"}
                    size={24}
                    color={theme.drawer.icon}
                />
                {!collapsed && (
                    <Text style={[styles.navText, { color: theme.drawer.text }]}>
                        {mode === "dark" ? "Thème clair" : "Thème sombre"}
                    </Text>
                )}
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    iosContainer: {
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 50
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 24,
        paddingVertical: 16,
        width: "100%",
    },
    profileName: {
        fontSize: 16,
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
    },
});
