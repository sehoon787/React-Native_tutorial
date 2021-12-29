import React from "react";
import { Pressable, Text } from "react-native";

const PressableButton = (props) => {
    return (
        <Pressable
        style={{
            backgroundColor: "blue",
            padding: 16,
            margin: 10,
            borderRadius: 8}}
            onPressIn={()=>console.log("press In")} 
            onLongPress={()=>console.log("Long press")}
            onPressOut={()=>console.log("press Out")}
            onPress={()=>console.log("press")}
            delayLongPress={1000}
            pressRetentionOffset={{bottom:50, left:50, right:50, top:50}}
            hitSlop={50}>
            <Text style={{padding:10, fontSize:30, color:"white"}}>{props.title}</Text>
        </Pressable>
    );
};

export default PressableButton;