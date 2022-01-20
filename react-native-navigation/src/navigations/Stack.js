import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import List from "../screens/List";
import Item from "../screens/Item";
import { Platform } from "react-native";
import styled from "styled-components";

const Stack = createStackNavigator();

const StackNavigation = () => {
    return(
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                cardStyle: {backgroundColor: '#f98221'},
                headerStyle: {
                    height: 100,
                    backgroundColor: '#95a5a6',
                    borderBottomWidth: 5,
                    borderBottomColor: '#34495e'
                },
                headerTitleStyle: {color: "#ffffff", fontSize: 24},
                headerTitleAlign: 'center',
                headerTitle: ({style})=>(
                    <MaterialCommunityIcons name='react' style={style}/>
                )
            }}
        >
                {/* Home */}
                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{headerShown: false}} 
                />

                {/* List */}
                <Stack.Screen 
                    name="List" 
                    component={List}
                    options={{
                        headerTitle: 'List Screen',
                        headerBackTitleVisible: true,
                        headerBackTitle: 'Prev',
                        headerTitleStyle: {fontSize: 24},
                        headerTintColor: '#e74c3c',
                        headerBackImage: ({tintColor})=>{
                            const style = {
                                marginRight: 5,
                                marginLeft: Platform.OS === 'ios' ? 11 : 0
                            };
                            return(
                                <MaterialCommunityIcons
                                    name='keyboard-backspace'
                                    size={30}
                                    color={tintColor}
                                    style={style}
                                />
                            );
                        }
                    }}
                />
                
                {/* Deatil */}
                <Stack.Screen 
                    name="Detail" 
                    component={Item} 
                />

        </Stack.Navigator>
    )
}

export default StackNavigation;