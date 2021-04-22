/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
import {Text} from 'react-native-paper';
import {
  alterBlack,
  firstScreenColor,
  secondScreenColor,
  thirdScreenColor,
} from '../../constant/color';

export const OnBoardingScreen = ({navigation}: {navigation: any}) => {
  const Dots = ({selected}: {selected: any}) => {
    return (
      <View
        style={[
          styles.dotStyles,
          {backgroundColor: !selected ? 'none' : alterBlack},
        ]}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Onboarding
            // SkipButtonComponent={SkipBtn}
            // NextButtonComponent={NextBtn}
            // DoneButtonComponent={DoneBtn}
            // DotComponent={Dots}
            onSkip={() => {
              navigation.navigate('SignUp');
            }}
            onDone={() => {
              navigation.navigate('SignUp');
            }}
            pages={[
              {
                backgroundColor: firstScreenColor,
                image: (
                  <Image
                    source={require('../../assets/images/logo/Group1.png')}
                  />
                ),
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
              {
                backgroundColor: secondScreenColor,
                image: (
                  <Image
                    source={require('../../assets/images/logo/Group1.png')}
                  />
                ),
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
              {
                backgroundColor: thirdScreenColor,
                image: (
                  <Image
                    source={require('../../assets/images/logo/Group1.png')}
                  />
                ),
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height / 1.036,
  },
  dotBtn: {
    marginHorizontal: 10,
  },
  doneBtn: {fontSize: 16},
  dotStyles: {
    width: 5,
    height: 5,
    marginHorizontal: 3,
  },
});
