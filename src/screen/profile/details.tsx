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
import {Button, IconButton, TextInput, useTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Toast from 'react-native-toast-message';
import {StatusBarHeader} from '../../components/status-bar';
import {midnightblue, white} from '../../constant/color';
import {savePassword} from '../../services/profile/profile';
import {useRootStore} from '../../stores/root-store';

export const PersonalDScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {colors} = useTheme();
  const user = useRootStore();
  // const proDetails = route.params.proDetails;
  // console.log(proDetails);

  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cNewPass, setCNewPass] = useState('');

  const [gender, setGender] = useState<string | number>();
  const [showDropDown, setShowDropDown] = useState(false);
  const [passEdit, setPassEdit] = useState(true);
  const [updatePro, setUpdatePro] = useState(true);

  const genderList = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Others', value: 'others'},
  ];
  const savePassHandler = async () => {
    if (!oldPass || !newPass || !cNewPass) {
      return Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Empty',
        text2: 'All fields are required',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 25,
        bottomOffset: 0,
      });
    }
    try {
      setLoading(true);
      const userResult = await savePassword(
        Number(user.user?.customer_id!),
        Number(oldPass),
        Number(newPass),
        Number(cNewPass),
      );

      if (userResult?.message === 'Password Changed') {
        console.log('password changed');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Register',
          text2: userResult.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 0,
        });
        setLoading(false);
        // return navigation.navigate('Drawer');
      }
      if (userResult?.message !== 'Password Changed') {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Customer Login faild',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 0,
          bottomOffset: 0,
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
          <View style={styles.iconRow}>
            <IconButton
              icon="arrow-left"
              color={midnightblue}
              size={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={[styles.signUpText, {color: midnightblue}]}>
              Personal Details
            </Text>
          </View>

          <View style={styles.mailContainer}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.tinyLogo}
                source={require('../../assets/images/logo/avatar.png')}
              />
              <IconButton
                icon="square-edit-outline"
                style={[styles.chnageImg, {backgroundColor: midnightblue}]}
                color={white}
                size={18}
                onPress={() => console.log('Pressed')}
              />
            </View>

            <View style={styles.profieContain}>
              <View style={styles.nameRow}>
                <Text style={[styles.gStatPara, {color: midnightblue}]}>
                  First Name
                </Text>
                <IconButton
                  icon="square-edit-outline"
                  style={[styles.inputEIcon, {backgroundColor: midnightblue}]}
                  color={white}
                  size={16}
                  onPress={() => setUpdatePro(!updatePro)}
                />
              </View>
              <TextInput
                placeholder="Adam"
                mode="flat"
                value={name}
                disabled={updatePro}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setName(text)}
              />

              <Text style={[styles.gStatPara, {color: midnightblue}]}>
                Last Name
              </Text>
              <TextInput
                placeholder=" Smith"
                mode="flat"
                disabled={updatePro}
                value={name}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setName(text)}
              />

              <Text style={[styles.gStatPara, {color: midnightblue}]}>
                Email
              </Text>
              <TextInput
                placeholder="user@gmail.com"
                mode="flat"
                disabled={updatePro}
                value={email}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setEmail(text)}
              />

              <Text style={[styles.gStatPara, {color: midnightblue}]}>
                Proof of ID
              </Text>
              <DropDown
                label={'Gender'}
                mode={'outlined'}
                value={gender}
                setValue={setGender}
                list={genderList}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
              <Button
                style={styles.updatePass}
                mode="contained"
                color={midnightblue}
                uppercase={false}
                loading={loading}
                dark={true}
                compact={true}
                onPress={() => {
                  savePassHandler();
                }}>
                Update Profile
              </Button>
            </View>

            <View style={styles.changePassContian}>
              <View style={styles.nameRow}>
                <Text style={[styles.changePassword, {color: midnightblue}]}>
                  Change Password
                </Text>
                <IconButton
                  icon="square-edit-outline"
                  style={[styles.inputEIcon, {backgroundColor: midnightblue}]}
                  color={white}
                  size={16}
                  onPress={() => setPassEdit(!passEdit)}
                />
              </View>

              <Text style={[styles.oldPassword, {color: midnightblue}]}>
                Enter your old password
              </Text>
              <TextInput
                placeholder="aladdin$#123"
                mode="flat"
                disabled={passEdit}
                value={oldPass}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setOldPass(text)}
              />

              <Text style={[styles.oldPassword, {color: midnightblue}]}>
                Enter your new password
              </Text>
              <TextInput
                placeholder="aladdin$#123"
                mode="flat"
                disabled={passEdit}
                value={newPass}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setNewPass(text)}
              />
              <Text style={[styles.oldPassword, {color: midnightblue}]}>
                Confirm new password
              </Text>
              <TextInput
                placeholder="aladdin$#123"
                mode="flat"
                disabled={passEdit}
                value={cNewPass}
                style={[
                  styles.inputName,
                  {backgroundColor: white, borderColor: midnightblue},
                ]}
                underlineColor={white}
                onChangeText={(text) => setCNewPass(text)}
              />
              <Button
                style={styles.savePass}
                mode="contained"
                color={midnightblue}
                uppercase={false}
                dark={true}
                compact={true}
                onPress={() => {
                  savePassHandler();
                }}>
                Save Password
              </Button>
            </View>
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
    marginTop: height / 22,
    position: 'relative',
  },
  imgContainer: {
    alignSelf: 'center',
  },
  tinyLogo: {
    width: 120,
    height: 120,
    borderRadius: 10,
    position: 'relative',
  },
  chnageImg: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: height / 8,
  },
  iconRow: {
    flexDirection: 'row',
  },
  updatePass: {
    borderRadius: 20,
    marginVertical: 20,
    width: width / 2,
    height: height / 23,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  savePass: {
    borderRadius: 20,
    width: width / 2,
    alignSelf: 'center',
    height: height / 23,
    justifyContent: 'center',
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
  changePassContian: {
    marginBottom: 10,
  },
  profieContain: {
    marginTop: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gStatPara: {
    fontSize: 13,
    marginBottom: 5,
  },
  changePassword: {
    fontSize: 15,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  inputName: {
    elevation: 2,
    height: 30,
    fontSize: 12,
    marginBottom: 15,
    paddingLeft: 10,
    borderWidth: 1,
    paddingVertical: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  inputEIcon: {
    borderRadius: 5,
  },
  oldPassword: {
    fontSize: 11,
    marginBottom: 5,
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
