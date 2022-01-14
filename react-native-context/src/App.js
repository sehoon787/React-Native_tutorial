import React from "react";
import styled from "styled-components/native";
import Input from "./components/Input";
import User from "./components/User";
import UserContext, { UserProvider } from "./contexts/User";

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
`;

const App = () => {
    return (
        // <UserContext.Provider value={{name: "Julian"}}>
        <UserProvider>    
            <Container>
                <User/>
                <Input/>
            </Container>
        </UserProvider>
        // </UserContext.Provider>
    );
};

export default App;