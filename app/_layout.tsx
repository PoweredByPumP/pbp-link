// app/_layout.tsx
import React, { useState, useEffect } from "react";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import { useWindowDimensions, Platform } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider, useTheme } from "../components/ThemeContext";

import DrawerContent from "../components/Drawer";
import ChatLayout from "./chat/_layout";
import GroupsLayout from "./groups/_layout";
import {Ionicons} from "@expo/vector-icons";
import SettingsScreen from "./chat/settings";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatHome from "./chat/home";
import ConversationScreen from "./chat/conversation";

const DrawerNav = createDrawerNavigator();
const EXPANDED_WIDTH = 240;

export default function Layout() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <ThemeProvider>
            {Platform.OS === "ios" ? <IOSView /> : <DesktopView />}
        </ThemeProvider>
    );
}

function DesktopView() {
    const { width } = useWindowDimensions();
    const isDesktop = width >= 1420;
    const [collapsed, setCollapsed] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (!isDesktop && collapsed) {
            setCollapsed(false);
        }
    }, [isDesktop, collapsed]);

    return (
        <DrawerNav.Navigator
            screenOptions={{
                drawerType: isDesktop ? "permanent" : "slide",
                drawerStyle: {
                    backgroundColor: theme.drawer.background,
                    width: isDesktop
                        ? EXPANDED_WIDTH
                        : Platform.OS === "ios"
                            ? 300
                            : undefined,
                },
                swipeEnabled: !isDesktop,
                headerStyle: {
                    backgroundColor: theme.drawer.headerBackground,
                },
                headerTintColor: theme.drawer.text,
                headerTitleStyle: {
                    fontFamily: Platform.OS === "ios" ? "System" : "SpaceMono",
                },
                headerLeft: () =>
                    !isDesktop ? <DrawerToggleButton tintColor={theme.drawer.text} /> : undefined,
            }}
            drawerContent={(props) => (
                <DrawerContent
                    {...props}
                    navigation={props.navigation}
                    isDesktop={isDesktop}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            )}
        >
            <DrawerNav.Screen name="chat" component={ChatLayout} options={{ title: "Conversations" }} />
            <DrawerNav.Screen name="groups" component={GroupsLayout} options={{ title: "Groupes" }} />
            <DrawerNav.Screen name="conversation" component={ConversationScreen} options={{ title: "Discussion" }} />
        </DrawerNav.Navigator>
    );
}


const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatStackLayout() {
    const { theme } = useTheme();

    return (
        <ChatStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.drawer.headerBackground,
                },
                headerTintColor: theme.drawer.text,
                headerTitleStyle: {
                    fontFamily: "SpaceMono",
                },
                contentStyle: {
                    backgroundColor: theme.background,
                },
            }}
        >
            <ChatStack.Screen
                name="home"
                component={ChatHome}
                options={{ title: "Conversations" }}
            />
            <ChatStack.Screen
                name="conversation"
                component={ConversationScreen}
                options={{ title: "Discussion" }}
            />
        </ChatStack.Navigator>
    );
}

function IOSView() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "chat") {
                        return <Ionicons name="chatbubbles" size={size} color={color} />;
                    } else if (route.name === "settings") {
                        return <Ionicons name="settings" size={size} color={color} />;
                    }
                    return null;
                },
            })}
        >
            <Tab.Screen
                name="home"
                component={ChatStackLayout}
                options={{ tabBarLabel: "Accueil" }}
            />
            <Tab.Screen
                name="settings"
                component={SettingsScreen}
                options={{ tabBarLabel: "Paramètres" }}
            />
        </Tab.Navigator>
    );
}
