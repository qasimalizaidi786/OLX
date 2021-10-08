import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,KeyboardAvoidingView,TouchableOpacity,Alert } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {auth} from "../Screen/firebase"



const SignUp = ({navigation}) => {
  const [text, setText] = useState('');
  const [passward, setPassward] = useState('');

  const SignUser= async ()=>{ 
    if(text===""|| passward===""){
      Alert.alert("Please Fill the blank")
      return
    }
    try{
      await auth.createUserWithEmailAndPassword(text, passward)
    console.log('User is Created');}

     catch(err){
       Alert.alert('Some went Wrong Please Try Again Later')
     }
  }
  return (
        <>
       <KeyboardAvoidingView behavior="position">
         <View style={styles.box1}>
         <Image style={{width:200,height:200}} source={require('../assets/logo1.jpg')}/>
         <Text style={{fontSize:22}}>Please SignUp </Text>
         </View>
         <View style={styles.box2}>
         <TextInput
      label="Email"
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
    />
     <TextInput
      label="Passward"
      mode="outlined"
      value={passward}
      secureTextEntry={true}
      onChangeText={text => setPassward(text)}
    />
    <Button mode="contained" onPress={() => SignUser()
    }>
    SignUp
  </Button>
    <Button mode="contained" onPress={() => navigation.goBack("Login")}>
    Login
  </Button>
         </View>
       </KeyboardAvoidingView>
       </>
     );
}


const styles = StyleSheet.create({
  box1:{
    alignItems:'center'
  },
  box2:{
    paddingHorizontal:50,
    height:"50%",
    justifyContent:'space-evenly'
    
  }
    
  });
  

export default SignUp
