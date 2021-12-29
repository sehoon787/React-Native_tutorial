import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Counter from './components/Counter';
import EventButton from './components/EventButton';
import EventInput from './components/EventInput';
import MyButton from './components/MyButton';
import PressableButton from './components/PressableButton';

const App = () => {
  // const name = "hanbit";
  // const name = "sehun";
  const name = "test";

  return (    
    // <Fragment>
    // <>
    <View style={{
      flex: 1,
      backgroundColor: '#fff', 
      alignItems: 'center', 
      justifyContent: 'center'
      }}
    >
      {/*1. 
      <Text style={styles.text}>My name is {name}!</Text> */}
      
      {/* 2.
      <Text style={styles.text}>
        {(()=>{
          if(name==="hanbit") return "My name is Hanbit.";
          else if(name==="sehun") return "My name is sehun.";
          else return "My name is React Native.";
        })
        ()}
      </Text> */}
      
      {/*3. 
      <Text style={styles.text}>
        My name is {name==="sehun" ? "sehun KIM" : "React Native"}
      </Text> */}
      
      {/*4. 
      {name==="sehun" && (<Text style={styles.text}>My name is Sehun</Text>)}
      {name!=="sehun" && (<Text style={styles.text}>This is React Native</Text>)} */}

      <Text style={{fontSize: 30, marginBottom: 10}}>
          {(()=>{
          if(name==="hanbit") return "My name is Hanbit.";
          else if(name==="sehun") return "My name is sehun.";
          else return "My name is React Native.";
        })()}
        </Text>
      
      {/* <Button title="Btn" onPress={()=>alert("Click!!")}/> */}

      <MyButton title="props" onPress={()=>alert("Default!!")}/>
      <MyButton title="props" onPress={()=>alert("Default!!")}>First Child Props</MyButton>
      {/* <MyButton title="props" onPress={()=>alert("Default!!")}>Second Child Props</MyButton> */}

      <MyButton onPress={()=>alert("Default!!")}/>

      <Counter/>

      {/* <EventButton/> */}

      {/* <EventInput/> */}

      <PressableButton title="Pressable Btn"/>

      {/* <StatusBar style="auto" /> */}
    </View>
    // </>
    // </Fragment>

  );
};

 export default App;