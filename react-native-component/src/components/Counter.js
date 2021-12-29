import React, { useState } from "react";
import { View, Text } from 'react-native';
import MyButton from "./MyButton";

const Counter = () =>{
    const [count, setCount] = useState(0);
    const [double, setDouble] = useState(1);

    return(
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30, margin: 10}}>Count: {count}</Text>
            <Text style={{fontSize: 30, margin: 10}}>Double: {double}</Text>
            <MyButton 
            title="+" 
            onPress={()=>{
                setCount(count+1);
                setDouble(double*2);
                }}/>
            <MyButton 
            title="-" 
            onPress={()=>{
                setCount(count-1);
                setDouble(double/2);
                }}/>
        </View>
    )
};

export default Counter;