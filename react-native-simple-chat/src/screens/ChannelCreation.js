import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Text, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "../components";
import { ProgressContext } from "../contexts";
import { createChannel } from "../utils/firebase";

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({theme})=>theme.errorText};
`;

const ChannelCreation = ({navigation})=>{
    const { spinner } = useContext(ProgressContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const descriptionRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(()=>{
        setDisabled(!(title && !errorMessage));
    }, [title, description, errorMessage]);

    const _handleTitleChange = title => {
        setTitle(title);
        setErrorMessage(title.trim() ? '' : 'Please enter the title.');
    };

    const _handleCreateButtonPress = async () => {
        try{
            spinner.start();
            const id = await createChannel({title, description});
            navigation.replace('Channel', { id, title });

            // for(let idx=0; idx<2; idx++){
            //     setTitle(title+idx);
            //     setDescription(description+idx);
            //     console.log(title+idx);
            //     await createChannel({title, description});
            //     // await createChannel({title, description, idx});
            //     console.log("complete");
            // };

        } catch (e) {
            Alert.alert('Creation Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{flex: 1}}
            extraScrollHeight={20}
        >
            <Container>
                {/* <Text style={{fontSize: 24}}>Channel Creation</Text> */}
                <Input 
                    label="Title"
                    value={title}
                    onChangeText={_handleTitleChange}
                    onSubmitEditing={()=>{
                        setTitle(title.trim());
                        descriptionRef.current.focus();
                    }}
                    onBlur={()=>setTitle(title.trim())}
                    placeholder="Title"
                    returnKeyType="next"
                    maxLength={20}
                />

                <Input
                    ref={descriptionRef}
                    label="Description"
                    value={description}
                    onChangeText={text=>setDescription(text)}
                    onSubmitEditing={()=>{
                        setDescription(description.trim());
                        _handleCreateButtonPress();
                    }}
                    onBlur={()=>setDescription(description.trim())}
                    placeholder="Description"
                    returnKeyType="done"
                    maxLength={40}
                />

                <ErrorText>{errorMessage}</ErrorText>

                <Button 
                    title="Create"
                    onPress={_handleCreateButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default ChannelCreation;