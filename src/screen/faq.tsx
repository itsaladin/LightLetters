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
import {midnightblue} from '../constant/color';

export const FAQScreen = ({navigation}: {navigation: any}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView>
      <StatusBarHeader />

      <View style={[styles.mainContainer, {backgroundColor: colors.surface}]}>
        <View style={styles.iconRow}>
          <IconButton
            icon="arrow-left"
            color={midnightblue}
            size={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={[styles.signUpText, {color: midnightblue}]}>FAQ</Text>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.scrollView]}>
          <View style={styles.mailContainer}>
            <Text style={[styles.textTitle, {color: midnightblue}]}>
              My passport/driving license count as both proofs of ID and proof
              of residential address?
            </Text>
            <Text style={[styles.textBody, {color: colors.text}]}>
              No, these must be separate. The passport or driving license counts
              as just proof of ID and not proof of residential address.
              Therefore, you must supply the proof of residential address
              document separately, i.e. a bank statement.
            </Text>

            <Text style={[styles.textTitle, {color: midnightblue}]}>
              Can I supply proof of my company address?
            </Text>
            <Text style={[styles.textBody, {color: colors.text}]}>
              To ensure we comply with AML regulations, we can only accept proof
              of residential address documents, i.e, you must live at the
              address.
            </Text>

            <Text style={[styles.textTitle, {color: midnightblue}]}>
              I do not have a smartphone or a webcam. How can I complete the
              online ID verification check?
            </Text>
            <Text style={[styles.textBody, {color: colors.text}]}>
              Our online ID validation software ensures you get validated
              quickly and simply. If, however, you are not able to complete or
              pass the online ID validation, we can accept a certified copy of
              your photo ID and recent proof of address. Please read our
              certification requirements here.
            </Text>

            <Text style={[styles.textTitle, {color: midnightblue}]}>
              How often would I need to provide ID documents?
            </Text>
            <Text style={[styles.textBody, {color: colors.text}]}>
              We are legally obliged to conduct ongoing compliance checks to
              ensure that all identifying information is correct and up to date.
              Therefore, you will be required to provide new documents, for
              example, when your passport has expired, the residential address
              has changed, or if the documents on file are older than 3 years.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  mainContainer: {
    paddingHorizontal: width / 25,
    paddingTop: height / 22,
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
  textTitle: {
    marginTop: 15,
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
  },
  textBody: {
    marginTop: 15,
    textAlign: 'justify',
    lineHeight: 18,
    fontSize: 13,
  },
});
