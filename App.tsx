import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import VenueDetailScreen from './src/screens/VenueDetailScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
<Stack.Screen name="Survey" component={SurveyScreen} options={{ title: 'Preferences Survey' }} />
        <Stack.Screen name="Discovery" component={DiscoveryScreen} options={{ title: 'Discover Venues' }} />
        <Stack.Screen name="VenueDetail" component={VenueDetailScreen} options={{ title: 'Venue Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}