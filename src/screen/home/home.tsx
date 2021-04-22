import {useNetInfo} from '@react-native-community/netinfo';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, TextInput, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useAsyncEffect} from 'use-async-effect';
import {LoadingComponent} from '../../components/loading';
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue, redColor, tertiary, white} from '../../constant/color';
import {inBoxClientPImg} from '../../services/config';
import {getCMails} from '../../services/mail/customer';
import {useRootStore} from '../../stores/root-store';
import {CustomerMails} from '../../types/mail/customer-mails';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const {colors} = useTheme();
  const netInfo = useNetInfo();
  const {user, verifed} = useRootStore();

  const [name, setName] = useState('');
  const [isSearch, setSearch] = useState<boolean>(true);
  const [emails, setEmails] = useState<CustomerMails>();

  useAsyncEffect(async (isMounted) => {
    const mails = await getCMails(user?.customer_id);
    if (!isMounted()) {
      return;
    }
    setEmails(mails);
  }, []);

  return (
    <SafeAreaView>
      <StatusBarHeader />

      <View style={[styles.mainContainer, {backgroundColor: colors.surface}]}>
        <View style={styles.marginHorizon}>
          {netInfo.isConnected === false &&
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Network Error',
              text2: 'No internet connection !!',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 40,
              bottomOffset: 0,
            })}
          <TextInput
            placeholder="Search Emails"
            mode="flat"
            value={name}
            disabled={isSearch}
            style={[
              styles.inputName,
              {backgroundColor: white, borderColor: midnightblue},
            ]}
            left={
              <TextInput.Icon
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={styles.inputEIcon}
                name="menu"
              />
            }
            right={
              <TextInput.Icon
                style={styles.inputEIcon}
                onPress={() => {
                  setSearch(false);
                }}
                name="magnify"
              />
            }
            underlineColor={white}
            onChangeText={(text) => setName(text)}
          />
          {!verifed && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Personal Details');
              }}>
              <Text style={[styles.isVerfyTxt, {color: redColor}]}>
                Your user account is not verified To verify, please click
                "verify account"
              </Text>
            </TouchableOpacity>
          )}
          <Text style={[styles.signUpText, {color: midnightblue}]}>Inbox</Text>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.scrollView]}>
          {(emails === null || emails === undefined) && (
            <View style={styles.loadinContian}>
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
            </View>
          )}

          {emails &&
            emails?.all_mail?.map((email, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.marginHorizon,
                    {
                      backgroundColor:
                        email.read_status === null ? tertiary : white,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Message', {id: email.id});
                    }}>
                    <View style={styles.mailContainer}>
                      <View style={styles.mailLeftBody}>
                        <Image
                          style={styles.mailLogo}
                          source={{
                            uri: `${inBoxClientPImg + email.profile_picture}`,
                          }}
                        />
                        <View style={styles.mailTContain}>
                          <Text
                            style={[styles.name, {color: colors.placeholder}]}>
                            {email.name}
                          </Text>
                          <Text
                            style={[
                              styles.mailTxt,
                              {color: colors.placeholder},
                            ]}>
                            {email.subject?.split(' ', 3)}
                          </Text>
                        </View>
                      </View>

                      <Text style={[styles.activeSTxt, {color: midnightblue}]}>
                        1 day ago
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </View>
              );
            })}
          {emails?.all_mail?.length === 0 && (
            <View style={styles.marginHorizonEmpty}>
              <View style={styles.mailContainer}>
                <Text style={[styles.name, {color: colors.placeholder}]}>
                  Empty Mailbox !!!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {},
  mainContainer: {
    height: '100%',
    paddingTop: height / 16,
  },
  loadinContian: {
    marginHorizontal: width / 20,
  },
  marginHorizon: {
    marginHorizontal: width / 20,
  },
  marginHorizonEmpty: {
    height: height / 2,
    marginHorizontal: width / 20,
  },
  divider: {
    height: 2,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  isVerfyTxt: {
    textAlign: 'center',
    marginVertical: 15,
    marginHorizontal: 25,
  },
  inputEIcon: {
    paddingTop: 10,
  },
  gStatPara: {
    fontSize: 13,
    textAlign: 'justify',
    marginVertical: 10,
  },
  inputName: {
    elevation: 2,
    height: 30,
    fontSize: 12,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 5,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputPassword: {
    elevation: 2,
    height: 35,
    fontSize: 12,
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  createAccount: {
    alignSelf: 'center',
    marginTop: 10,
  },
  mailContainer: {
    flex: 1,
    marginVertical: 15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  draft: {
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  email: {
    fontSize: 11,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  mailTxt: {
    fontSize: 14,
  },
  mailLogo: {
    width: width / 6,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  mailTContain: {
    marginLeft: width / 25,
  },
  mailLeftBody: {
    flexDirection: 'row',
  },
  activeSTxt: {
    fontSize: 10,
  },
  editIcon: {
    padding: 5,
    borderRadius: 10,
  },
});
