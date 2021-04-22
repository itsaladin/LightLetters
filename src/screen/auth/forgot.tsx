import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Button, TextInput, TouchableRipple, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue, white} from '../../constant/color';
import {regx} from '../../constant/regx';
import {signIn} from '../../services/auth/signIn';
import {useRootStore} from '../../stores/root-store';

const Forgot = ({navigation}: {navigation: any}) => {
  const {colors} = useTheme();
  const {logIn} = useRootStore();
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState({
    email: '',
    password: '',

    check_passwordInputChange: false,
    check_emailInputChange: false,
    check_textEmailChange: false,

    secureTextEntry: true,
    conSecureTextEntry: true,

    isValidEmail: true,
    isValidPassword: true,
  });
  const handleEmailChange = (val: any) => {
    if (regx.test(val)) {
      setData({
        ...data,
        email: val,
        check_textEmailChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textEmailChange: false,
        isValidEmail: false,
      });
    }
  };

  const signInHandler = async (parsData: any) => {
    if (!parsData.email || !parsData.password) {
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
      const user = await signIn(parsData.email, parsData.password);

      if (user?.status === 'login success') {
        logIn(user);
        console.log(user);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Register',
          text2: user.email + '! Login Successful!',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 45,
          bottomOffset: 0,
        });
        setLoading(false);
        return navigation.navigate('Drawer');
      }
      if (user?.status !== 'login success') {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Customer Login faild',
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
        text2: 'Unable to sign in at this time!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 0,
        bottomOffset: 40,
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollView, {backgroundColor: colors.surface}]}>
        <StatusBarHeader />

        <View style={styles.mainContainer}>
          <Text style={[styles.signUpText, {color: midnightblue}]}>
            Forgot Password
          </Text>

          <Text style={[styles.gStatPara, {color: midnightblue}]}>Email</Text>
          <TextInput
            placeholder="user@gmail.com"
            mode="flat"
            value={data.email}
            style={[styles.inputPassword, {backgroundColor: white}]}
            underlineColor={white}
            onChangeText={(val: string) => {
              handleEmailChange(val);
            }}
            secureTextEntry={false}
          />
        </View>

        <Button
          mode="contained"
          loading={loading}
          style={styles.signUpBtn}
          color={midnightblue}
          uppercase={true}
          onPress={() => {
            signInHandler(data);
          }}>
          Reset Password
        </Button>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={[styles.signInTxt, {color: midnightblue}]}>
            Go back to login ?
          </Text>
        </TouchableRipple>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};
export const ForgotScreen = observer(Forgot);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  mainContainer: {
    marginHorizontal: width / 15,
    marginTop: height / 8,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  gStatPara: {
    fontSize: 13,
    textAlign: 'justify',
    marginVertical: 10,
  },
  inputName: {
    elevation: 2,
    height: 35,
    fontSize: 12,
    borderWidth: 1,
    paddingVertical: 5,
    marginBottom: 10,
    paddingLeft: 15,
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
  signUpBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: height / 30,
    marginBottom: height / 50,
    marginHorizontal: 25,
    lineHeight: 18,
  },
  signInTxt: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
