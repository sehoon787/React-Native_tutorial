import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Text, Button, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { query, limit, collection, orderBy, onSnapshot } from "@firebase/firestore";
import { DB } from "../utils/firebase";
import moment from "moment";

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({theme})=>theme.listBorder};
    padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;

const ItemDescription = styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color: ${({theme})=>theme.listTime};
`;

const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({theme})=>theme.listTime};
`;

// const channels = [];
// for(let idx=0; idx<1000; idx++){
//     channels.push({
//         id: idx,
//         title: `title ${idx}`,
//         description: `description ${idx}`,
//         createdAt: idx,
//     });
// }

const getDataOrTime = ts => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');

    return moment(ts).format(now.diff(target, 'days') > 0 ? now.diff(target, 'year') > 0 ? 'YYYY/MM/DD' : 'MM/DD' : 'HH:mm');
};

const Item = React.memo(
    ({item: {id, title, description, createdAt}, onPress})=>{
        const theme = useContext(ThemeContext);
        // console.log(`Item: ${id}`);

        return(
            <ItemContainer onPress={()=>onPress({id, title})}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{getDataOrTime(createdAt)}</ItemTime>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);

const ChannelList = ({navigation})=>{
    const [channels, setChannels] = useState([]);

    const ref = collection(DB, 'channels');
    const q = query(ref, orderBy("createdAt", 'desc'), limit(150));
    // console.log(q);

    useEffect(()=>{
        // const unsubscribe = onSnapshot(collection(DB, 'channels'), 
        const unsubscribe = onSnapshot(q, 
        (snapshot) => {
            const list = [];
            snapshot.forEach(doc => {
                // console.log(doc.data().id);
                list.push(doc.data());
            });
            setChannels(list);
        });

        return ()=>unsubscribe();
    }, []);

    const _handleItemPress = params => {
        // console.log(params);
        navigation.navigate('Channel', params);
    };

    return (
        <Container>
            {/* <Text style={{fontSize: 24}}>Channel List</Text>
            <Button 
                title="Channel Creation"
                onPress={()=>navigation.navigate('Channel Creation')}
            /> */}
            <FlatList
                keyExtractor={item=>item['id']}
                data={channels}
                renderItem={({item})=>(
                    <Item item={item} onPress={_handleItemPress} />
                )}
                windowSize={13}
                onEndReachedThreshold={0.8}
            />
        </Container>
    );
};

export default ChannelList;