import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Drawer, Title, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAsyncEffect} from 'use-async-effect';
import {alterTertiary} from '../constant/color';
import {customerProfilePic} from '../services/config';
import {getProDetails} from '../services/profile/profile';
import {useRootStore} from '../stores/root-store';
import {ProfileRes} from '../types/profile/profile';

export const DrawerNav = (props: any) => {
  const {colors} = useTheme();
  const {isLoggedIn, user, logout, setVerifed} = useRootStore();

  const [profile, setProfile] = useState<ProfileRes>();

  useAsyncEffect(async (isMounted) => {
    const data = await getProDetails(user?.customer_id);
    if (!isMounted()) {
      return;
    }
    setProfile(data);
    setVerifed(data!.status === 'Verified' ? true : false);
  }, []);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View
            style={[
              styles.userInfoSection,
              {backgroundColor: colors.disabled},
            ]}>
            {isLoggedIn ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profile', {proDetails: profile});
                  }}>
                  <Image
                    width={180}
                    height={180}
                    source={{
                      uri: customerProfilePic + profile?.profile_picture,
                    }}
                  />
                  <Title style={[styles.title, {color: colors.text}]}>
                    {`${profile?.first_name} ${profile?.last_name}`}
                  </Title>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}>
                  <Image
                    width={80}
                    height={80}
                    style={styles.profImg}
                    source={require('../assets/images/avater/avatar.png')}
                  />
                </TouchableOpacity>
                <Title style={[styles.title, {color: colors.text}]}>
                  Adam Smith
                </Title>
              </>
            )}
          </View>
          <Drawer.Section style={styles.draweSection}>
            <DrawerItem
              icon={() => (
                <Icon
                  name="home-circle-outline"
                  color={alterTertiary}
                  size={26}
                />
              )}
              label="Mailbox"
              labelStyle={{color: alterTertiary}}
              onPress={() =>
                props.navigation.navigate('Mailbox', {proDetails: profile})
              }
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section title="Setting">
        <Divider />
        <DrawerItem
          icon={() => (
            <Icon name="face-profile" color={alterTertiary} size={26} />
          )}
          label="Profile"
          labelStyle={{color: alterTertiary}}
          onPress={() => {
            props.navigation.navigate('Profile', {proDetails: profile});
          }}
        />
        <DrawerItem
          icon={() => <Icon name="security" color={alterTertiary} size={26} />}
          label="Privacy Policy"
          labelStyle={{color: alterTertiary}}
          onPress={() => {
            props.navigation.navigate('Privacy');
          }}
        />
        <DrawerItem
          icon={() => (
            <Icon name="lock-question" color={alterTertiary} size={26} />
          )}
          label="FAQ"
          labelStyle={{color: alterTertiary}}
          onPress={() => {
            props.navigation.navigate('FAQ');
          }}
        />
        <DrawerItem
          icon={() => <Icon name="login" color={alterTertiary} size={26} />}
          label="Log out"
          labelStyle={{color: alterTertiary}}
          onPress={() => {
            logout();
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: -4.2,
    paddingVertical: 10,
  },
  title: {
    alignSelf: 'center',
    paddingTop: 10,
  },

  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  draweSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginHorizontal: 16,
  },

  secTwo: {
    marginLeft: 60,
  },
});
