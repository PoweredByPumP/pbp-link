// app/chat/_layout.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./home";
import SettingsScreen from "./settings";

const Tab = createBottomTabNavigator();

export default function ChatLayout() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "home") {
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
                component={HomeScreen}
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
