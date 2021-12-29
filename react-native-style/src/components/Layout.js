import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const Header = () => {
    return(
        <View style={[styles.container, styles.header]}>
            <Text style={styles.text}>Header</Text>
        </View>
    );
};

export const Contents = () => {
    return(
        <View style={[styles.container, styles.contents]}>
            <Text style={styles.text}>Contents</Text>
        </View>
    );
};

export const Footer = () => {
    return(
        <View style={[styles.container, styles.footer]}>
            <Text style={styles.text}>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
        height:80
    },
    header:{
        flex:1,
        backgroundColor:"red"
    },
    contents:{
        flex:5,
        backgroundColor:"blue",
        // height:480
    },
    footer:{
        flex:1,
        backgroundColor:"black",
    },
    text:{
        color:"white",
        fontSize:30
    }
});