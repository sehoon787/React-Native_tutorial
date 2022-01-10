import React, {useState} from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Dimensions, StatusBar } from "react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import Input from "./Input";
import { images } from "./images"
import IconButton from "./components/IconButton";
import Task from "./components/Task";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({theme})=>theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
flex: 1;
width: ${({width})=>width-40}px;
`;

export default function App(){
    const width = Dimensions.get('window').width;
    
    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});
    // const [tasks, setTasks] = useState({
    //     '1': {'id': '1', text: 'sehun', completed: false},
    //     '2': {'id': '2', text: 'React Native', completed: false},
    //     '3': {'id': '3', text: 'Pyhton', completed: false},
    //     '4': {'id': '4', text: 'C++', completed: false}
    // });

    console.log('ready:'+isReady);

    const _saveTasks = async tasks => {
        try{
            await AsyncStorageLib.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch(e){
            console.log(e);
        }
    };

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorageLib.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _addTask=()=>{
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false}
        };
        setNewTask('');
        // setTasks({...tasks, ...newTaskObject});
        _saveTasks({...tasks, ...newTaskObject});

        console.log(tasks[2])
        // console.log(newTaskObject)

        alert(`Add: ${newTask}`);
    };

    const _handleTextChange = text => {
        setNewTask(text);
        console.log("App.js: "+text);
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        // setTasks(currentTasks); 
        _saveTasks(currentTasks); 
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        // setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _updateTask = item => {
        console.log('update : ' + item);
        // console.log('update : ' + item.id);

        const currentTasks = Object.assign({}, tasks);
        // const currentTasks = {...tasks};    // shallow copy라서 Object.assign대신 전개구문도 가능
        currentTasks[item.id] = item;

        // setTasks(currentTasks);
        _saveTasks(currentTasks); 
    };

    const _onBlur = () => {
        setNewTask('');
    };

    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle={"light-content"}>
                    backgroundColor={theme.background}
                </StatusBar>
                <Title>ToDO List</Title>
                <Input placeholder="+Add a Task"
                       value={newTask}
                       onChangeText={_handleTextChange}
                       onSubmitEditing={_addTask}
                       onBlur={_onBlur}
                />
                <List width={width}>
                    {/* <Task text='sehun'/>
                    <Task text='React Native'/>
                    <Task text='Python'/>
                    <Task text='Edit TODO Item'/> */}
                    {Object.values(tasks).reverse().map(item=>(
                        // key 없어도 동작은 하지만 warning이 뜬다.
                        <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask}/>
                    ))}
                </List>
                {/* <IconButton type={images.uncompleted}/>
                <IconButton type={images.completed}/>
                <IconButton type={images.delete}/>
                <IconButton type={images.update}/> */}
            </Container>
        </ThemeProvider>
    ) : (
        <AppLoading
        startAsync={_loadTasks}
        onFinish={()=>setIsReady(true)}
        onError={console.error}
        />
    );
};