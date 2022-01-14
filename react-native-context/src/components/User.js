import React, { useContext } from "react";
import styled from "styled-components/native";
import UserContext, { UserConsumer, UserProvider } from "../contexts/User";

const StyledText = styled.Text`
    font-size: 24px;
    margin: 10px;
`;

const User = () => {
    // return(
        // <UserContext.Provider value={{name: "Alien Coder"}}>
            // <UserContext.Consumer>
            //     {value=><StyledText>Name: {value.name}</StyledText>}
            // </UserContext.Consumer>
        // </UserContext.Provider>

        // <UserConsumer>
        //     {({user})=><StyledText>Name: {user.name}</StyledText>}
        // </UserConsumer>
    // );
    
    const {user} = useContext(UserContext);
    return <StyledText>Name: {user.name}</StyledText>
};

export default User;