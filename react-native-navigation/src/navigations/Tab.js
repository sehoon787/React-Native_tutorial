import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Mail, Meet, Settings } from "../screens/TabScreens";

const TabIcon = ({name, size, color})=>{
    // console.log(name);
    // console.log(color);
    return <MaterialCommunityIcons name={name} size={size} color={color}/>;
}

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return(
        <Tab.Navigator
            initialRouteName="Mail"
            screenOptions={({route})=>({
                tabBarIcon: props=>{
                    let name='';
                    if(route.name==='Mail') name='email';
                    else if(route.name==='Meet') name='video';
                    else name='bluetooth-settings';
                    return TabIcon({...props, name});
                    // 그냥 settings가 load가 안됨.
                }
            })}
            tabBarOptions={{
                labelPosition: 'beside-icon', 
                showLabel: true,
                style: {
                    backgroundColor:'#54b7f9',
                    borderTopColor: '#ffffff',
                    borderTopWidth: 2
                },
                // // style 요소가 동작을 안함.
                activeTintColor: "#0000000",
                inactiveTintColor: "#cfcfcf"
            }}
        >
            <Tab.Screen 
                name="Mail" 
                component={Mail}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: props=>TabIcon({...props, name: props.focused ? 'email' : 'email-outline'})
                    // tabBarIcon: props=>TabIcon({...props, name: 'email'})
                }}
            />

            <Tab.Screen 
                name="Meet" 
                component={Meet}
                options={{
                    tabBarIcon: props=>TabIcon({...props, name: props.focused ? 'video' : 'video-outline'})
                }}
            />
            
            <Tab.Screen 
                name="Settings"
                component={Settings}
                // options={{
                //     tabBarIcon: props=>TabIcon({...props, name: props.focused ? 'settings' : 'settings-outline'})
                // }}
            />
    </Tab.Navigator>
    );
};

export default TabNavigation;