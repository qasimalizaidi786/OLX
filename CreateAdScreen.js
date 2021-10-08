import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, Alert,Platform,Linking } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { db, auth,stg } from '../Screen/firebase'
import * as ImagePicker from 'expo-image-picker';


const CreateAdScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image,setImage]=useState("");

  const postData = async () => {

    try{
     await db.collection('ads')
      .add({
        name,
        year,
        desc,
        price,
        phone,
        image,
        uid: auth.currentUser.uid
      })
        Alert.alert('posted your ad!')
      }
      catch(err){
        Alert.alert('Something Weng Wrong Try Again Later')
      }
  }


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (<>
    <View style={styles.container}>
      <Text style={styles.Text}> Create Ad! </Text>
      <TextInput
        label="Title"
        mode="outlined"
        value={name}
        onChangeText={text => setName(text)}
        
      />
      <TextInput
        label="Description "
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        value={desc}
        onChangeText={text => setDesc(text)}
      />
      <TextInput
        label="Year of purchase"
        mode="outlined"
        value={year}
        keyboardType="numeric"
        onChangeText={text => setYear(text)}
      />
      <TextInput
        label="Price"
        mode="outlined"
        value={price}
        keyboardType="numeric"
        onChangeText={text => setPrice(text)}
      />
      <TextInput
        label="Contact Number"
        mode="outlined"
        value={phone}
        keyboardType="numeric"
        onChangeText={text => setPhone(text)}
      />
      <Button  mode="contained" onPress={() => pickImage()}>
        Upload
      </Button>
      <Button  disabled={image?false:true } type="reset" mode="contained" onPress={() => postData() }>
        post
      </Button>
    </View>
  </>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 30
  },
  Text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center"
  },

});


export default CreateAdScreen