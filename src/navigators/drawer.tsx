import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import {FAQScreen} from '../screen/faq';
import {HomeScreen} from '../screen/home/home';
import {PrivacyScreen} from '../screen/privacy';
import {PersonalDScreen} from '../screen/profile/details';
import {DrawerNav} from './drawer-nav';

const Drawer = createDrawerNavigator();

export const DrawerScreen = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerNav {...props} />}>
      <Drawer.Screen
        name="Mailbox"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Profile" component={PersonalDScreen} />
      <Drawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
