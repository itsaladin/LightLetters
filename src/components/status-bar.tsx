import React from 'react';
import {StatusBar} from 'react-native';
import {midnightblue} from '../constant/color';

export const StatusBarHeader = () => {
  return (
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor={midnightblue}
    />
  );
};
