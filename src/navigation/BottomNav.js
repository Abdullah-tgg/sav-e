import {Image, StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, { useCallback } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/bottomScreens/Home';
import Vlogs from '../screens/bottomScreens/Vlogs';
import Deals from '../screens/bottomScreens/Deals';
import Account from '../screens/bottomScreens/Account';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
useCallback
const Tab = createBottomTabNavigator();
const BottomNav = () => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          width: wp(100),
          height: wp(20),
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius:20,
          borderTopLeftRadius:20,
          position:'absolute',
          overflow:'hidden'
        },
        tabBarIcon: ({focused}) => {
            if (route.name === 'Home') {
            return (
              <View style={{marginTop: wp(3.5)}}>
                <View>
                  {focused ? (
                    <View style={styles.focusedview}>
                      <Image source={require('../assets/icons/HomeFocus.png')} style={styles.icon} />
                      <Text style={styles.focusedtext}>Home</Text>
                    </View>
                  ) : (
                    <View style={styles.ufocusedview}>
                      <Image source={require('../assets/icons/Home.png')} style={styles.icon} />
                      <Text style={styles.ufocusedtext}>Home</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }
          if (route.name === 'Vlogs') {
            return (
              <View style={{marginTop: wp(3.5)}}>
                <View>
                  {focused ? (
                    <View style={styles.focusedview}>
                      <Image source={require('../assets/icons/VlogsFocus.png')} style={styles.icon} />
                      <Text style={styles.focusedtext}>Vlogs</Text>
                    </View>
                  ) : (
                    <View style={styles.ufocusedview}>
                      <Image source={require('../assets/icons/Vlogs.png')} style={styles.icon} />
                      <Text style={styles.ufocusedtext}>Vlogs</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }

          if (route.name === 'Deals') {
            return (
              <View style={{marginTop: wp(5.5)}}>
                <View>
                  {focused ? (
                    <View style={styles.focusedview}>
                      <Image source={require('../assets/icons/DealsFocus.png')} style={styles.icon} />
                      <Text style={styles.focusedtext}>Deals</Text>
                    </View>
                  ) : (
                    <View style={styles.ufocusedview}>
                      <Image source={require('../assets/icons/Deals.png')} style={styles.icon} />
                      <Text style={styles.ufocusedtext}>Deals</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }

          if (route.name === 'Account') {
            return (
              <View style={{marginTop: wp(3.5)}}>
                <View>
                  {focused ? (
                    <View style={styles.focusedview}>
                      <Image source={require('../assets/icons/AccountFocus.png')} style={styles.icon} />
                      <Text style={styles.focusedtext}>Account</Text>
                    </View>
                  ) : (
                    <View style={styles.ufocusedview}>
                      <Image source={require('../assets/icons/Account.png')} style={styles.icon} />
                      <Text style={styles.ufocusedtext}>Account</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }
          
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Vlogs" component={Vlogs} />
      <Tab.Screen name="Deals" component={Deals} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  focusedview: {
    width: wp(15),
    height: wp(15),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  focusedtext: {
    fontSize: 10,
    textAlign:'center',
    color: '#34A853',
    marginTop: wp(1),
    fontFamily:'Inter-Regular',

  },
  ufocusedview: {
    width: wp(15),
    height: wp(15),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  ufocusedtext: {
    fontSize: 10,
    textAlign:'center',
     color: '#9A9BB1',
    marginTop: wp(1),
    fontFamily:'Inter-Regular',

  },
});