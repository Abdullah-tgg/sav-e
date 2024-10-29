import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
const Header = ({ title, ShowBackButton, showWelcomeMessage }) => {
  const navigation = useNavigation();
  const today = moment().format('MMMM, Do');
  const name = useSelector((state)=>state.user.user.userdata.firstname)
  // console.log(name);
  

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={"#E3F0E9"} barStyle="dark-content" />
      {ShowBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/Back.png')} style={styles.backImage} />
        </TouchableOpacity>
      )}
      
      {showWelcomeMessage && (
        <View style={styles.welcomeMessage}>
          <Image source={require('../assets/img/Elogo.png')} style={styles.logo} />
          <View>
            <Text style={styles.welcomeText}>Hello {name}</Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
        </View>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 30,
    position: 'relative',
    backgroundColor: '#E3F0E9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7, // For Android shadow
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 5,
  },
  backImage: {
    width: wp(6),
    height: wp(10),
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#000000',
    maxWidth: '50%',
    fontFamily:'Inter-Bold',
  },
  welcomeMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    position: 'absolute',
    left: 20,
  },
  logo: {
    width: wp(12),
    height: wp(20),
    marginRight: 10,
    marginTop:10,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 14,
    color: '#000',
    fontFamily:'Inter-Regular',

  },
  dateText: {
    fontSize: 12,
    color: '#000',
    fontFamily:'Inter-Bold',
  },
});

export default Header;
