import React from 'react';
import { View, Text, StyleSheet, Image,StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Onboarding1 = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
          <StatusBar backgroundColor="#FFFFF9" barStyle="dark-content" />

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/img/Onboarding3.png')} style={styles.onboardingImage} />
      </View>

      {/* Main Text */}
      <Text style={styles.mainText}>Effortless Shopping</Text>

      {/* Sub Text */}
      <Text style={styles.subText}>Unbeatable Prices — Download the App Today!
      </Text>

      {/* Next Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.nextText}>Next</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/Next.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 40,
  },
  onboardingImage: {
    width: 300, // adjust as needed
    height: 250, // adjust as needed
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
    maxWidth: '80%',
    fontFamily: 'Inter-Regular',

  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#34A853', // Green color for the button
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 15,
    borderRadius: 40,
    marginRight: 10, // Space between button and icon
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nextText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  iconContainer: {
    width: '40%',
    height: 40,
    backgroundColor: '#F5F5F6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0
  },
  icon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});
export default Onboarding1;
