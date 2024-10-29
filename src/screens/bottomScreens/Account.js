import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice'; // Adjust the path if necessary

const Account = () => {
  const dispatch = useDispatch();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const navigation = useNavigation();

  const toggleNotificationSwitch = () => {
    setIsNotificationEnabled(previousState => !previousState);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());

    // Navigate to the login screen or landing page after logout
    navigation.navigate('Login'); // Adjust the route if necessary
  };

  return (
    <ScrollView style={accountStyles.container}>
      {/* Header */}
      <Header title="Account" />

      {/* Profile Container */}
      <View style={accountStyles.shadowContainer}>
        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons/Profile.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Profile</Text>
            <Text style={accountStyles.description}>View and edit your profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Other Options Containers */}
      <View style={accountStyles.shadowContainer}>
        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={() => navigation.navigate('Saved')}>
          <Image source={require('../../assets/icons/SavedPosts.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Saved Deals</Text>
            <Text style={accountStyles.description}>Post from community</Text>
          </View>
        </TouchableOpacity>

        {/* Notifications with Toggle */}
        <TouchableOpacity style={accountStyles.touchableOpacity}>
          <Image source={require('../../assets/icons/Notifications.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Notifications</Text>
            <Text style={accountStyles.description}>Manage notifications settings</Text>
          </View>
          <Switch
            trackColor={{ false: '#cfcfcf', true: '#34A853' }}
            thumbColor={isNotificationEnabled ? '#34A853' : '#FFFFF9'}
            onValueChange={toggleNotificationSwitch}
            value={isNotificationEnabled}
          />
        </TouchableOpacity>
      </View>

      {/* More Options */}
      <View style={accountStyles.shadowContainer}>
        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={() => navigation.navigate('AboutUs')}>
          <Image source={require('../../assets/icons/AboutUs.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>About Us</Text>
            <Text style={accountStyles.description}>Learn more about us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.touchableOpacity}>
          <Image source={require('../../assets/icons/ContactUs.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Contact Us</Text>
            <Text style={accountStyles.description}>Get in touch with us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Image source={require('../../assets/icons/PrivacyPolicy.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Privacy Policy</Text>
            <Text style={accountStyles.description}>Read our privacy policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={() => navigation.navigate('TermsConditions')}>
          <Image source={require('../../assets/icons/TermOfUse.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Terms of Use</Text>
            <Text style={accountStyles.description}>Review terms and conditions</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Manage Account and Change Password */}
      <View style={accountStyles.shadowContainer}>
        <TouchableOpacity style={accountStyles.touchableOpacity} onPress={()=>navigation.navigate('ChangePassword')}>
          <Image source={require('../../assets/icons/ChangePassword.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Change Password</Text>
            <Text style={accountStyles.description}>Update your password</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.touchableOpacity}>
          <Image source={require('../../assets/icons/ManageAccount.png')} style={accountStyles.icon} />
          <View style={accountStyles.divider}></View>
          <View style={accountStyles.textContainer}>
            <Text style={accountStyles.title}>Manage Account</Text>
            <Text style={accountStyles.description}>Control your account settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={accountStyles.logoutButton} onPress={handleLogout}>
        <Text style={accountStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const accountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
    marginBottom:'20%'
  },
  shadowContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    // marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  divider:{
    borderLeftColor:'#E5E5E5',
    borderLeftWidth:1,
    height:'100%',
    marginHorizontal:20
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily:'Inter-Bold',
  },
  description: {
    fontSize: 10,
    color: '#777',
    fontFamily:'Inter-Regular',

  },
  logoutButton: {
    width:'80%',
    alignSelf:'center',
    backgroundColor: '#FFFFF9',
    borderColor: '#34A853',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical:20
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#34A853',
    fontWeight: 'bold',
  },
});

export default Account;
