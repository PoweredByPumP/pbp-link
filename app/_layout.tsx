// app/_layout.tsx
import React, { useState, useEffect } from "react";
import {createDrawerNavigator, DrawerToggleButton} from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import DrawerContent from "../components/Drawer";
import ChatLayout from "./chat/_layout";
import GroupsLayout from "./groups/_layout";

const DrawerNav = createDrawerNavigator();

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

export default function Layout() {
    const { width } = useWindowDimensions();
    const isDesktop = width >= 1420;

    // État local pour le collapse du drawer
    const [collapsed, setCollapsed] = useState(false);

    // Sur mobile, on force l'état "ouvert"
    useEffect(() => {
        if (!isDesktop && collapsed) {
            setCollapsed(false);
        }
    }, [isDesktop, collapsed]);

    return (
        <DrawerNav.Navigator
            screenOptions={{
                drawerType: isDesktop ? "permanent" : "front",
                drawerStyle: {
                    width: isDesktop ? EXPANDED_WIDTH : undefined,
                },
                swipeEnabled: !isDesktop,
                headerLeft: () => !isDesktop ? (<DrawerToggleButton />) : undefined,
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
            <DrawerNav.Screen name="chat" component={ChatLayout} options={{ title: "Chats" }} />
            <DrawerNav.Screen name="groups" component={GroupsLayout} options={{ title: "Groupes" }} />
        </DrawerNav.Navigator>
    );
}
