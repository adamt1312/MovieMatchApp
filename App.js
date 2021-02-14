import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import signInScreen from './Screens/signInScreen';
import signUpScreen from './Screens/signUpScreen';
import homeScreen from './Screens/homeScreen';
import { useEffect } from 'react';
import exploreMoviesScreen from './Screens/exploreMoviesScreen';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config
        }
      }}>
        <Stack.Screen name="SignIn" component={signInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={signUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={homeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="rmc" component={exploreMoviesScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
export default App;