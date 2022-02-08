import React, {useEffect, useRef, useState, useContext } from "react";
import { ProgressContext, UserContext } from "../contexts";
import styled from "styled-components/native";
// import { Text, Button } from 'react-native';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { removeWhitespace, validateEmail } from "../utils/common";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Alert } from "react-native";
import { login } from "../utils/firebase";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
    padding-top: ${({insets: {top}})=>top}px;
    padding-bottom: ${({insets: {bottom}})=>bottom}px;
`;

const ErrorText = styled.Text`
    align-items: center;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({theme})=>theme.errorText};
`;

const Login = ({ navigation })=> {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);

    const insets = useSafeAreaInsets();

    // const [email, setEmail] = useState('test@naver.com');   // test
    // const [password, setPassword] = useState('22042204');   // test

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(()=>{
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : 'Please verify your email.'
        );
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async () => {
        try{
            spinner.start();
            const user = await login({email, password});
            Alert.alert('Login Success', user.email);
            dispatch(user);
        } catch (e) {
            Alert.alert('Login Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} extraScrollHeight={20}>
            <Container insets={insets}>
                {/* <Text style={{fontSize: 30}}>Login Screen</Text> */}
                <Image url={images.logo} imageStyle={{borderRadius: 8}} />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button title="Login" onPress={_handleLoginButtonPress} disabled={disabled}/>
                <Button 
                    title="Sign up with E-mail" 
                    onPress={() => navigation.navigate('Signup')}
                    isFilled={false}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;