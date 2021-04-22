import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ForgotScreen} from '../screen/auth/forgot';
import {LoginScreen} from '../screen/auth/login';
import {SignUpScreen} from '../screen/auth/signUp';
import {OnBoardingScreen} from '../screen/boarding/onBoarding';
import {MessageScreen} from '../screen/message/details';
import {ReplayScreen} from '../screen/message/replay';
import {PersonalDScreen} from '../screen/profile/details';
import {StartScreen} from '../screen/start';
import {DrawerScreen} from './drawer';

const Stack = createStackNavigator();

export const RootStackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>();
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value: any) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator initialRouteName="onBoarding">
        <Stack.Screen
          name="onBoarding"
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Replay"
          component={ReplayScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Personal Details"
          component={PersonalDScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="onBoarding"
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Replay"
          component={ReplayScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Personal Details"
          component={PersonalDScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};
