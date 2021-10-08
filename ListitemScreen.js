import React,{useEffect,useState} from 'react'
import { View, Text,FlatList ,StyleSheet,Platform,Linking} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {db} from "../Screen/firebase"


const ListitemScreen = () => {
  const [loading,setLoading]=useState(false)

  const [items,setItems]=useState([])

  
  const getDetail =async ()=>{
  const querySnap  = await db.collection('ads').get()

  const Display = querySnap.docs.map(docSnap=>docSnap.data()
  )
    // console.log(querySnap)
  setItems(Display)


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
          <Card.Title title= {item.name} />
          <Card.Content>
            <Paragraph> {item.year}</Paragraph>
            <Paragraph> {item.desc}</Paragraph>
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
        <View>
            <FlatList
            data={items.reverse()}
            keyExtractor={ (item) =>  item.phone}
            renderItem={({item})  =>MyComponent(item)  }
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

export default ListitemScreen
