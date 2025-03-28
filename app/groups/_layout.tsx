import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./home";
import {useTheme} from "../../components/ThemeContext";

const Tab = createBottomTabNavigator();

export default function GroupsLayout() {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveBackgroundColor: theme.menu.headerBackground,
                tabBarInactiveBackgroundColor: theme.menu.headerBackground,
                tabBarActiveTintColor: theme.menu.text,
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case "home":
                            return <Ionicons name="chatbubbles" size={size} color={color}/>;
                        case "groups":
                            return <Ionicons name="people" size={size} color={color}/>;
                        case "settings":
                            return <Ionicons name="settings" size={size} color={color}/>;
                        default: break;
                    }

                    return null;
                },
                tabBarStyle: { backgroundColor: theme.menu.headerBackground },
            })}
        >
            <Tab.Screen
                name="home"
                component={HomePage}
                options={{ tabBarLabel: "Chats" }}
            />
            <Tab.Screen
                name="groups"
                component={HomePage}
                options={{ tabBarLabel: "Groupes" }}
            />
            <Tab.Screen
                name="settings"
                component={HomePage}
                options={{ tabBarLabel: "Paramètres" }}
            />
        </Tab.Navigator>
    );
}
