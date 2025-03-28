import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./home";

const Tab = createBottomTabNavigator();

export default function GroupsLayout() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "home") {
                        return <Ionicons name="chatbubbles" size={size} color={color}/>;
                    }

                    return null;
                },
            })}
        >
            <Tab.Screen
                name="home"
                component={HomePage}
                options={{ tabBarLabel: "Accueil" }}
            />
        </Tab.Navigator>
    );
}
