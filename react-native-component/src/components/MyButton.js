import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import PropTypes from 'prop-types';

const MyButton = props =>{
    console.log(props);

    return(
        <TouchableOpacity style={{
            backgroundColor: "blue",
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        // onPress={() => alert("Click!!")}>
        onPress={() => props.onPress()}>
            {/* <Text style={{fontSize: 24}}>{props.title}</Text> */}
            <Text style={{color: "white", fontSize: 24}}>
                {props.children || props.title}
            </Text>
        </TouchableOpacity>
    );
};

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
};

MyButton.defaultProps = {
    title: 'Button'
};

export default MyButton;