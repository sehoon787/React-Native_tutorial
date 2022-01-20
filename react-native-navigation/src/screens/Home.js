import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
    /* flex: 1; */
    background-color: #fff563;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 20px;
    margin-bottom: 10px;
`;

const Home = ({navigation}) => {
    return(
        <Container>
            <StyledText>Home</StyledText>
            <Button 
                title="Go to the list screen"
                onPress={()=>navigation.navigate("List")}
            />
        </Container>
    );
};

export default Home;