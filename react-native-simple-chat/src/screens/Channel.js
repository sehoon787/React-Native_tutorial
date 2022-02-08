import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text } from 'react-native';

import { query, limit, collection, orderBy, onSnapshot } from "@firebase/firestore";
import { createMessage, DB, getCurrentUser } from "../utils/firebase";
import { FlatList } from "react-native-gesture-handler";
import { Input } from "../components";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
`;

const SendButton = props => {
    const theme = useContext(ThemeContext);

    // console.log(props);
    return(
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <MaterialIcons
                name='send'
                size={24}
                color={ props.text ? theme.sendButtonActivate : theme.sendButtonInactivate }
            />
        </Send>
    );
};

const Channel = ({route, navigation})=>{
    // console.log(route);
    // console.log(route?.params);
    // console.log(navigation);

    const theme = useContext(ThemeContext);
    const { uid, name, photoUrl } = getCurrentUser();
    const [messages, setMessages] = useState([]);
    // const [text, setText] = useState([]);

    const id = route?.params?.id;
    const ref = collection(DB,`channels/${id}/messages`);
    const q = query(ref, orderBy("createdAt", 'desc'), limit(150));
    useEffect(()=>{
        const unsubscribe = onSnapshot(q, 
        (snapshot) => {
            const list = [];
            snapshot.forEach(doc => {
                list.push(doc.data());
            });
            setMessages(list);
        });

        return ()=>unsubscribe();
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({headerTitle: route?.params?.title || 'Channel' });
    }, []);

    const _handleMessageSend = async messageList => {
        // console.log(messageList[0]);

        const newMessage = messageList[0];
        try{
            await createMessage({channelId: id, message: newMessage});
        } catch (e) {
            Alert.alert('Send Message Error', e.message);
        }
    };

    return (
        <Container>
            {/* <Text style={{fontSize: 24}}>ID: {route?.route?.params?.id}</Text> */}
            {/* <Text style={{fontSize: 24}}>Title: {route?.route?.params?.title}</Text> */}
            {/* <FlatList
                keyExtractor={item=>item['id']}
                data={messages}
                renderItem={({item})=>
                    <Text style={{fontSize: 24}}>{item.text}</Text>
                }
                inverted={true}
            />
            <Input 
                value={text}
                onChangeText={text=>setText(text)}
                onSubmitEditing={()=>createMessage({channelId: id, text})}
            /> */}
            <GiftedChat
                listViewProps={{style: {backgroundColor: theme.background}}}
                placeholder="Enter a message..."
                messages={messages}
                user={{_id: uid, name, avatar: photoUrl}}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',
                    underlineColorAndroid: 'transparent',
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={props => <SendButton {...props}/>}
            />
        </Container>
    );
};

export default Channel;