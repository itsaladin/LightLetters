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
import {Button, IconButton, useTheme} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {useAsyncEffect} from 'use-async-effect';
import {DetailsLoading} from '../../components/details-loading';
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue} from '../../constant/color';
import {customerProfilePic} from '../../services/config';
import {getMDetails} from '../../services/message/details';
import {MailDetailsRes} from '../../types/mail/mail-details';

export const MessageScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {colors} = useTheme();
  const mId = route.params.id;
  const [message, setMessage] = useState<MailDetailsRes>();

  useAsyncEffect(async (isMounted) => {
    const mDetails = await getMDetails(mId);
    if (!isMounted()) {
      return;
    }
    setMessage(mDetails);
  }, []);

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
            <IconButton
              icon="dots-vertical"
              color={midnightblue}
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </View>

          {(message === null || message === undefined) && (
            <View style={styles.loadContain}>
              <DetailsLoading />
            </View>
          )}

          {message && (
            <View>
              <Text style={[styles.signUpText, {color: midnightblue}]}>
                {message?.mail_details.subject}
              </Text>

              <View style={styles.mailContainer}>
                <Image
                  style={styles.mailLogo}
                  source={{
                    uri:
                      customerProfilePic +
                      message.customer_info.profile_picture,
                  }}
                />
                <View>
                  <View style={styles.titleActivity}>
                    <Text style={[styles.draft, {color: colors.text}]}>
                      {message?.client_info.name}
                    </Text>
                    <Text style={[styles.activeSTxt, {color: midnightblue}]}>
                      2 day ago
                    </Text>
                  </View>
                  <Text style={[styles.email, {color: colors.text}]}>
                    {message?.mail_details.sender}
                  </Text>

                  <HTML
                    html={message?.mail_details.mail_body}
                    tagsStyles={{
                      p: {
                        fontSize: 13,
                        width: width / 1.6,
                        textAlign: 'justify',
                        lineHeight: 18,
                        color: colors.placeholder,
                      },
                    }}
                  />

                  <Button
                    style={styles.signUpBtn}
                    mode="contained"
                    color={midnightblue}
                    disabled={message.mail_details.reply_status === null}
                    uppercase={false}
                    onPress={() => {
                      navigation.navigate('Replay', {
                        mDetails: message,
                      });
                    }}>
                    Replay
                  </Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  p: {backgroundColor: '#FF0000'},
  scrollView: {
    height: '100%',
  },
  mainContainer: {
    marginHorizontal: width / 20,
    marginTop: height / 16,
    position: 'relative',
  },
  loadContain: {
    marginTop: 35,
  },
  iconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpText: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  mailContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  draft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 11.5,
    marginVertical: 8,
  },
  mailLogo: {
    width: width / 6,
    height: height / 9,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  activeSTxt: {},
  signUpBtn: {
    justifyContent: 'center',
    borderRadius: 10,
    height: height / 16,
    width: width / 2.5,
    alignSelf: 'flex-end',
    alignContent: 'center',
    marginTop: height / 20,
  },
});
