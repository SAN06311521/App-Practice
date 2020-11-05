import React,{useState} from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Search = ({navigation}) => {

  const [city,setCity] = useState('')
  const [cities,setCities] = useState([])
  const fetchCities = (text) => {
    setCity(text)
    fetch("https://sutocomplete.wunderground.com/aq?query="+text)
    .then(item=>item.json())
    .then(cityData=>{
      setCities(cityData.RESULTS.slice(0,9))
    })
  }
  const buttonClick = async () => {
    await AsyncStorage.setItem("newcity",city)
    navigation.navigate("HomeScreen",{city:city})
  }
  const listClick = async (cityname) => {
    setCity(cityname),
    await AsyncStorage.setItem("newcity",cityname)
    navigation.navigate("HomeScreen",{city:cityname})
  }
  return (cityname) (
    <View style={{flex: 1}}>
        <Header name="Search screen"/>
        <TextInput 
        label="City name"
        theme={{color:{primary:"#00aaff"}}}
        value={city}
        onChangeText={(text) => fetchCities(text)}
        />
        <Button 
        icon="content-save" 
        mode="contained" 
        theme={{color:{primary:"#00aaff"}}}
        style={{margin: 20}}
        onPress={() => buttonClick()}
        >
          <Text style={{color: "white"}}>Save Changes</Text>
        </Button>
        <FlatList 
        data={cities}
        renderItem={({item}) => {
          return(
            <Card 
            style={{margin: 2, padding: 12}}
            onPress={() => listClick(item.name)}
            >
              <Text>{item.name}</Text>
            </Card>
          )
        }}
        keyExtractor={item=>item.name}
        />
    </View>
  );
};