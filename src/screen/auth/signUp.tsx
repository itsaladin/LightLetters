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
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue, white} from '../../constant/color';
import Toast from 'react-native-toast-message';
import {signUp} from '../../services/auth/signup';
import {regx} from '../../constant/regx';

export const SignUp = ({navigation}: {navigation: any}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    password: '',
    confPassword: '',

    check_FNameChange: false,
    check_LNameChange: false,
    check_textInputChange: false,
    check_passwordInputChange: false,
    check_ConfpasswordInputChange: false,
    check_emailInputChange: false,
    check_textEmailChange: false,
    check_textPhoneChange: false,

    secureTextEntry: true,
    conSecureTextEntry: true,

    isValidFName: true,
    isValidLName: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfPassword: true,
  });
  const handleFirstNameChange = (val: any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        fName: val,
        check_FNameChange: true,
        isValidFName: true,
      });
    } else {
      setData({
        ...data,
        fName: val,
        check_FNameChange: false,
        isValidFName: false,
      });
    }
  };
  const handleLastNameChange = (val: any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        lName: val,
        check_LNameChange: true,
        isValidLName: true,
      });
    } else {
      setData({
        ...data,
        lName: val,
        check_LNameChange: false,
        isValidLName: false,
      });
    }
  };
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
  const handlePasswordChange = (val: any) => {
    if (val.length >= 6) {
      setData({
        ...data,
        password: val,
        check_passwordInputChange: true,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        check_passwordInputChange: false,
        isValidPassword: false,
      });
    }
  };
  const handleConfPasswordChange = (val: any) => {
    if (val.length >= 6) {
      setData({
        ...data,
        confPassword: val,
        isValidConfPassword: true,
      });
    } else {
      setData({
        ...data,
        confPassword: val,
        isValidConfPassword: false,
      });
    }
  };
  const signUpHandler = async (parsData: any) => {
    if (
      !parsData.fName ||
      !parsData.lName ||
      !parsData.email ||
      !parsData.password ||
      !parsData.confPassword
    ) {
      return Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Empty',
        text2: 'All fields are required',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 0,
      });
    }
    if (parsData.password !== parsData.confPassword) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Empty',
        text2: 'Password did not match',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 0,
        bottomOffset: 40,
      });
    }
    try {
      setLoading(true);
      const user = await signUp(
        parsData.fName,
        parsData.lName,
        parsData.email,
        parsData.password,
        parsData.confPassword,
      );

      if (
        user?.customer_info.id !== null ||
        user?.customer_info.id !== undefined ||
        user?.customer_info.status === 'Pending'
      ) {
        console.log(user);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Register',
          text2: user?.customer_info.email + '! Customer Created Successful!',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 0,
        });
        setLoading(false);
        return navigation.navigate('Drawer');
      }
      if (user?.customer_info.id === null || !user?.customer_info.id) {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Customer registration faild',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 0,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Empty',
        text2: 'Unable to sign up at this time!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 0,
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
            SIGN UP
          </Text>

          <Text style={[styles.gStatPara, {color: midnightblue}]}>
            First Name
          </Text>
          <TextInput
            placeholder="First Name"
            mode="flat"
            value={data.fName}
            style={[
              styles.inputName,
              {
                backgroundColor: white,
                borderColor: midnightblue,
              },
            ]}
            underlineColor={white}
            onChangeText={(val: string) => {
              handleFirstNameChange(val);
            }}
          />

          <Text style={[styles.gStatPara, {color: midnightblue}]}>
            Last Name
          </Text>
          <TextInput
            placeholder="Last Name"
            mode="flat"
            value={data.lName}
            style={[
              styles.inputName,
              {
                backgroundColor: white,
                borderColor: midnightblue,
              },
            ]}
            underlineColor={white}
            onChangeText={(val: string) => {
              handleLastNameChange(val);
            }}
          />

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
          />

          <Text style={[styles.gStatPara, {color: midnightblue}]}>
            Password
          </Text>
          <TextInput
            placeholder="98@32#%3380"
            mode="flat"
            value={data.password}
            style={[
              styles.inputPassword,
              {backgroundColor: white, borderColor: midnightblue},
            ]}
            underlineColor={white}
            onChangeText={(val: string) => {
              handlePasswordChange(val);
            }}
            secureTextEntry={true}
          />

          <Text style={[styles.gStatPara, {color: midnightblue}]}>
            Confirm Password
          </Text>
          <TextInput
            placeholder="98@32#%3380"
            mode="flat"
            value={data.confPassword}
            style={[
              styles.inputPassword,
              {backgroundColor: white, borderColor: midnightblue},
            ]}
            underlineColor={white}
            onChangeText={(val: string) => {
              handleConfPasswordChange(val);
            }}
            secureTextEntry={true}
          />
        </View>

        <Button
          style={styles.signUpBtn}
          mode="contained"
          color={midnightblue}
          uppercase={true}
          loading={loading}
          onPress={() => {
            signUpHandler(data);
          }}>
          Sign Up
        </Button>

        <View style={styles.haveAccContain}>
          <Text style={[styles.haveAccoutn, {color: colors.placeholder}]}>
            Already Have An Account ?
          </Text>
          <TouchableRipple
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.signInTxt, {color: midnightblue}]}>
              SignIn
            </Text>
          </TouchableRipple>
        </View>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export const SignUpScreen = observer(SignUp);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  mainContainer: {
    marginHorizontal: width / 15,
    marginTop: height / 15,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
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
  haveAccContain: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  haveAccoutn: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  signUpBtn: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height / 30,
    marginBottom: height / 50,
    height: height / 16,
    marginHorizontal: 25,
  },
  signInTxt: {
    textDecorationLine: 'underline',
  },
});
