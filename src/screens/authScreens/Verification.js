import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';

const Verification = ({ route, navigation }) => {
  const { email } = route.params; // Get the email from params
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerification = async () => {
    console.log(email,code);
    
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('https://intechsol.co/sav/api/confirmcode', {
        email: email,
        pin: code,
      });

      setLoading(false);

      if (response.data.status === 'success') {
        // Navigate to the NewCredentials screen and pass the email and code as params
        navigation.navigate('NewCredentials', { email: email, code: code });
      } else {
        // Show error message for invalid code
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Verification failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={'#FFFFF9'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>Verification</Text>

        {/* Subtext */}
        <Text style={styles.subtext}>
          Please enter the code sent to {email}.
        </Text>

        {/* OTP Input */}
        <OTPTextInput
          tintColor="#FCCE01"
          style={styles.otpInput}
          textInputStyle={styles.otpTextInput}
          handleTextChange={(code) => setCode(code)}
          offTintColor="#ccc"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleVerification}
          disabled={loading || !code}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFF9', 

  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: '10%',
    paddingTop: '20%', // Adjust top padding to move content down
  },
  heading: {
    fontSize: 25,
    fontFamily:'Inter-Bold',
    color: '#000',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subtext: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginVertical:'30%',
    fontFamily:'Inter-Regular',

  },
  otpInput: {
    borderRadius: 15,
    paddingLeft: 30,
    margin: 10,
    height: 60,
    width: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'15%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  otpTextInput: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontFamily:'Inter-Regular',
  },
  continueButton: {
    marginVertical:'50%',
    backgroundColor: '#34A853', // Primary color
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily:'Inter-Bold',
  },
});

export default Verification;
