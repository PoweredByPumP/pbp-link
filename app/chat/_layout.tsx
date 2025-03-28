import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatHome from "./home";
import ConversationScreen from "./conversation";
import SettingsScreen from "./settings";
import { useTheme } from "../../components/ThemeContext";

const Stack = createNativeStackNavigator();

export default function ChatLayout() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.drawer.headerBackground,
                },
                headerTintColor: theme.drawer.text,
                headerTitleStyle: {
                    fontFamily: "SpaceMono",
                },
                headerShown: false,
                contentStyle: {
                    backgroundColor: theme.background,
                },
            }}
        >
            <Stack.Screen
                name="home"
                component={ChatHome}
                options={{ title: "Conversations" }}
            />
            <Stack.Screen
                name="conversation"
                component={ConversationScreen}
                options={{ title: "Discussion" }}
            />
            <Stack.Screen
                name="settings"
                component={SettingsScreen}
                options={{ title: "Paramètres" }}
            />
        </Stack.Navigator>
    );
}
