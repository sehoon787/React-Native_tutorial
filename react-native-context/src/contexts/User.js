import { createContext, useState } from "react";

const UserContext = createContext({
    // name: 'sehun KIM'});
    user: {name: ''},
    dispatch: () => {}
});

const UserProvider = ({children})=>{
    const [name, setName] = useState('sehun KIM');

    const value = {user: {name}, dispatch: setName};

    // console.log(value)
    console.log(name)
    // console.log("children: "+children)
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

const UserConsumer = UserContext.Consumer;
// console.log(UserConsumer);

export {UserProvider, UserConsumer};
export default UserContext;