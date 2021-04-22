import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {StatusBarHeader} from '../components/status-bar';
import {black, midnightblue} from '../constant/color';

export const PrivacyScreen = ({navigation}: {navigation: any}) => {
  const {colors} = useTheme();
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollView, {backgroundColor: colors.surface}]}>
        <StatusBarHeader />

        <View style={styles.mainContainer}>
          <View style={styles.iconRow}>
            <IconButton
              icon="arrow-left"
              color={midnightblue}
              size={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={[styles.signUpText, {color: midnightblue}]}>
              Privacy
            </Text>
          </View>

          <View style={styles.mailContainer}>
            <Text style={[styles.whoCanSee, {color: black}]}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus magnam rem aut quis consequuntur odit repudiandae
              facere. Incidunt nesciunt eveniet porro! Fuga rem, atque nam
              debitis eos laudantium inventore, dolore laboriosam officiis sequi
              vel adipisci reprehenderit maiores corrupti distinctio deserunt
              sint quod rerum animi. Unde consequatur adipisci, rerum
              repudiandae incidunt modi explicabo officia eius nisi tenetur
              voluptatibus sed autem maiores expedita ipsum tempore vel aliquid
              aspernatur ad reiciendis maxime? Et qui amet, veritatis debitis
              cumque perferendis labore reprehenderit perspiciatis dolore harum
              consectetur officiis vero consequuntur placeat. Cum beatae
              perferendis dolorem! Ducimus aperiam odit quidem praesentium
              mollitia ad placeat ratione illo?
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  mainContainer: {
    marginHorizontal: width / 25,
    marginTop: height / 22,
    position: 'relative',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  mailContainer: {
    marginHorizontal: width / 35,
  },
  whoCanSee: {
    marginTop: 15,
    textAlign: 'justify',
    lineHeight: 22,
  },
});
