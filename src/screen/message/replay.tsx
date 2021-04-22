import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {IconButton, TextInput, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue, white} from '../../constant/color';
import {replayMail} from '../../services/mail/replay';
import {MailDetailsRes} from '../../types/mail/mail-details';

export const ReplayScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {colors} = useTheme();
  const mDetails: MailDetailsRes = route.params.mDetails;

  const [bodyMsg, setBodyMsg] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState();

  const replayMailHandler = async () => {
    if (!bodyMsg || !images) {
      return Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Empty',
        text2: 'All fields are required',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 0,
        bottomOffset: 40,
      });
    }
    try {
      setLoading(true);
      const user = await replayMail(11, bodyMsg, images?.name);
      if (user) {
        console.log(user);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Register',
          text2: '! Customer Created Successful!',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 45,
          bottomOffset: 0,
        });
        setLoading(false);
        // return navigation.navigate('Home');
      }
      if (!user) {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Customer registration faild',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 0,
          bottomOffset: 40,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Empty',
        text2: 'Unable to sign up at this time!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 0,
        bottomOffset: 40,
      });
    }
  };
  const openImgHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      //@ts-ignore
      setImages(res);
      console.log(JSON.stringify(res, null, 2));
      // RNFetchBlob.fetch(
      //   'POST',
      //   baseUrl + 'reply-mail-to-client/',
      //   {
      //     // Authorization: 'Bearer access-token',
      //     otherHeader: 'foo',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   [{name: 'image', filename: 'avatar.png', data: images?.name}],
      // )
      //   .then((resp) => {
      //     console.log(resp);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

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
              Compose
            </Text>
          </View>

          <View style={styles.mailContainer}>
            <TextInput
              placeholder="user@gmail.com"
              mode="flat"
              value={mDetails.mail_details.sender}
              style={[
                styles.inputName,
                {
                  backgroundColor: white,
                  borderColor: midnightblue,
                },
              ]}
              left={
                <Text style={[styles.inputEIcon, {color: colors.accent}]}>
                  From
                </Text>
              }
              underlineColor={white}
            />

            <TextInput
              placeholder="user@gmail.com"
              mode="flat"
              value={mDetails.mail_details.receiver}
              style={[
                styles.inputName,
                {backgroundColor: white, borderColor: midnightblue},
              ]}
              left={
                <Text style={[styles.inputEIcon, {color: colors.accent}]}>
                  From
                </Text>
              }
              underlineColor={white}
            />

            <TextInput
              placeholder="Subject  Lorem ipsum is simple"
              mode="flat"
              value={mDetails.mail_details.subject}
              style={[
                styles.inputName,
                {backgroundColor: white, borderColor: midnightblue},
              ]}
              left={
                <Text style={[styles.inputEIcon, {color: colors.accent}]}>
                  From
                </Text>
              }
              underlineColor={white}
            />

            <TextInput
              placeholder="Body msg Lorem ipsum is simple"
              mode="flat"
              value={bodyMsg}
              numberOfLines={20}
              style={[
                styles.bodyMsg,
                {backgroundColor: white, borderColor: midnightblue},
              ]}
              underlineColor={white}
              onChangeText={(text) => setBodyMsg(text)}
              left={<TextInput.Icon onPress={openImgHandler} name="file" />}
              right={
                <TextInput.Icon
                  name="send"
                  onPress={() => {
                    replayMailHandler();
                  }}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
    marginTop: height / 16,
    position: 'relative',
  },
  iconRow: {
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  mailContainer: {
    marginVertical: 15,
    marginHorizontal: width / 35,
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
    fontSize: 11,
    marginVertical: 8,
  },
  mailTxt: {
    fontSize: 13,
    width: width / 1.6,
    textAlign: 'justify',
    lineHeight: 18,
  },
  mailLogo: {
    width: width / 6,
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
  inputName: {
    elevation: 2,
    height: 30,
    fontSize: 14,
    marginBottom: 15,
    borderWidth: 1,
    paddingVertical: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  inputEIcon: {
    paddingTop: 10,
  },
  bodyMsg: {
    elevation: 2,
    height: 90,
    fontSize: 12,
    marginBottom: 15,
    borderWidth: 1,
    paddingVertical: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
