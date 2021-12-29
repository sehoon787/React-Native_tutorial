import React, {useState} from "react";
import { Switch } from 'react-native';

import { StyleSheet, View, Text } from 'react-native';
import { viewStyles, textStyles } from "./styles";
import { Header, Contents, Footer } from "./components/Layout";
import ShadowBox from "./components/ShadowBox";

import styled, {ThemeProvider} from 'styled-components/native';
import Button from "./components/Button";
import Input from "./components/Input";
import { theme } from "./theme";

import { lightTheme, darkTheme} from "./theme";

// styled component
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const App = () => {
    // // Inline Styling
    // return(
    //     <View
    //     style={{
    //         flex:1,
    //         backgroundColor: "blue",
    //         alignItems:'center',
    //         justifyContent:'center'
    //     }}>
    //         <Text
    //         style={{
    //             padding:10,
    //             fontSize: 21,
    //             fontWeight:'600',
    //             color:'white'
    //         }}>Inline Styling - Text
    //         </Text>
            
    //         <Text
    //         style={{
    //             padding:10,
    //             fontSize: 26,
    //             fontWeight:'400',
    //             color:'red'
    //         }}>Inline Styling - Error
    //         </Text>

    //     </View>

    // // Class Styling
    // return(
    //     <View style={styles.container}>
    //         <Text style={styles.text}>Class Styling - Text</Text>
    //         <Text style={styles.error}>Class Styling - Error</Text>
    //     </View>

    // // Complex Styling
    // return(
    //     <View style={styles.container}>
    //      <Text style={styles.text}>Class Styling - Text</Text>
    //      <Text style={[styles.text, styles.error]}>Class Styling - Error</Text>
    //     </View>

    // // export Styling
    // return(
    //     <View style={viewStyles.container}>
    //         <Text style={[textStyles.text, {color:"green"}, {fontSize:30}]}>Class Styling - Text</Text>
    //         <Text style={[textStyles.text, textStyles.error]}>Class Styling - Error</Text>
    //     </View> 
    // );

    // // Header, Contents, Footer
    // return(
    //     <View style={viewStyles.container}>
    //         <Header />
    //         <Contents />
    //         <Footer />
    //     </View> 
    // );

    // // ShadowBox
    // return(
    //     <View style={viewStyles.container}>
    //         <ShadowBox />
    //     </View>
    // );

    // styled component

    const [isDark, setIsDark] = useState(false);
    const _toggleSwitch = () => setIsDark(!isDark);

    return(
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Container>
                <Switch value={isDark} onValueChange={_toggleSwitch}></Switch>
                <Button title="Sehun"/>
                <Button title="React Native"/>
                <Input borderColor="purple" />
                <Input borderColor="skyblue" />
            </Container>
        </ThemeProvider>
    )
};

// // Class Styling
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:"blue",
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     text:{
//         padding:10,
//         fontSize:21,
//         fontWeight:"600",
//         color:"white"
//     },
//     error:{
//         // padding:10,
//         // fontSize:26,
//         fontWeight:"400",
//         color:"red"
//     }

// })

export default App;