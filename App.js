import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Search from './Screens/Search';
import HomeScreen from './Screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator()
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon:({color}) => {
            let iconName;
            if(route.name === "HomeScreen"){
              iconName = "home-city"
            }else if(route.name === "Search"){
              iconName = "city-variant"
            }
            return <MaterialCommunityIcons name={iconName} size={25} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTinitColor: "grey",
          activeBackgroundColor: "#00aaff",
          inactiveBackgroundColor: "#00aaff"
        }}
        >
          <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{city:"India"}}
          />
          <Tab.Screen
          name="Search"
          component={Search}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};



export default App;
