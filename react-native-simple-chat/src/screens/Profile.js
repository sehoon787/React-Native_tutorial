import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text } from 'react-native';
import { ProgressContext, UserContext } from "../contexts";
import { getCurrentUser, logout, updateUserPhoto } from "../utils/firebase";
import { Button, Image, Input } from "../components";

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Profile = ()=>{
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    const theme = useContext(ThemeContext);

    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            // dispatch({});
            await logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            dispatch({});
            spinner.stop();
        }
    };

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const updatedUser = await updateUserPhoto(url);
            setPhotoUrl(updatedUser.photoUrl);
        } catch (e) {
            Alert.alert("Photo Error", e.message);
        } finally {
            spinner.stop();
        }
    };
    
    return (
        <Container>
            {/* <Text style={{fontSize: 24}}>Profile</Text> */}
            <Image 
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton
                rounded
            />
            <Input label="Name" value={user.name} disabled/>
            <Input label="Email" value={user.email} disabled/>
            <Button 
                title="logout"
                onPress={_handleLogoutButtonPress}
                containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
            />
        </Container>
    );
};

export default Profile;