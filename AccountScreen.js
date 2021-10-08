import React,{useEffect,useState} from 'react'
import { View, Text,FlatList ,StyleSheet,Linking,Platform} from 'react-native'
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import {auth,db} from "../Screen/firebase"




const AccountScreen = () => {
    const [loading,setLoading]=useState(false)
    const [items,setItems]=useState([])
    const getDetail= async ()=>{
      const querySnap = await db.collection('ads')
      .where('uid','==',auth.currentUser.uid)
      .get()
      const result = querySnap.docs.map(docSnap=>docSnap.data())
      // console.log(result)
      setItems(result)
    }
    const openDial=(phone)=>{
      if(Platform.OS ==='android')
      {
     Linking.openURL(`tel:${phone}`)
    }
    else{
      Linking.openURL(`telprompt:${phone}`)
    }
  }
    useEffect(()=>{
        getDetail()
        return ()=>{
          console.log('cleanup')
        }
        },[])

        const MyComponent = (item) => {
            return(
                <Card style={styles.card}>
                  <Card.Title title={item.name} />
                  <Card.Content>
                    <Paragraph> {item.year}</Paragraph>
                    <Paragraph>{item.desc}</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: item.image }} />
                  <Card.Actions>
                    <Button>{item.price}</Button>
                    <Button onPress= {()=>openDial()}> Contact Seller</Button>
                  </Card.Actions>
                </Card>
            )
            }
    return (
        <View style={{flex:1}}>
        <View style={{height:"30%" ,justifyContent:"space-evenly",alignItems:"center"}} >
          
                       <Text style={{fontSize:33}}>{auth.currentUser.email}</Text>
             <Button mode="contained" onPress={() => auth.signOut()  }>
     LogOut
 </Button>
 <Text style={{fontSize:33}}>your ads</Text>
 </View>
 <FlatList
            data={items.reverse()}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>MyComponent(item)  }
            onRefresh={()=>{
                setLoading(true)
                getDetail()
                setLoading(false)
            }}
            refreshing={loading}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:10 ,
        elevation:2,
        
    }
           
         });

export default AccountScreen
