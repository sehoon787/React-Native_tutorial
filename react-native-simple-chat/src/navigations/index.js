import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from "../components";
import { ProgressContext, UserContext } from "../contexts";
import MainStack from "./MainStack";

const Navigation = () => {
    const { inProgress } = useContext(ProgressContext);
    const { user } = useContext(UserContext);

    // console.log(user?.uid);
    // console.log(user?.email);

    return(
        <NavigationContainer>
            {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
            {/* {user.uid && user.email ? <MainStack /> : <AuthStack />} */}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;