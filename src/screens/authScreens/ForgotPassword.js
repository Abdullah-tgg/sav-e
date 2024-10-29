import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleContinue = async () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
      setLoading(true); // Set loading state to true when the request starts

      try {
        // Make the API call to send the email
        const response = await axios.post('https://intechsol.co/sav/api/forgot', { email });

        // If successful, navigate to the Verification screen and pass the email
        navigation.navigate("Verification", { email });
      } catch (error) {
        // Handle the error, show a message or set error state if needed
        setEmailError('Failed to send email. Please try again.');
      } finally {
        setLoading(false); // Set loading state to false after the request is done
      }
    }
  };

  return (
    <View style={styles.background}>
    <StatusBar backgroundColor={'#FFFFF9'} barStyle={'dark-content'}/>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>Forgot Password</Text>

        {/* Subtext */}
        <Text style={styles.subtext}>
          Please enter your email address to receive a link to reset your password.
        </Text>

        {/* Email Input */}
        <TextInput
          style={[styles.input, emailError ? styles.errorBorder : null]}
          placeholder="Email"
          placeholderTextColor="#7D7D7D"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFF9', 

  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: '10%',
    paddingTop: '20%', 
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
  input: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#34A853',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 12,
    color: '#000',
    fontFamily:'Inter-Regular',
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    marginTop:'30%',
    marginBottom:'10%'
},
  errorBorder: {
    borderColor: 'red',
    fontFamily:'Inter-Regular',

  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    fontFamily:'Inter-Regular',

  },
  continueButton: {
    marginVertical:'40%',
    backgroundColor: '#34A853',
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

export default ForgotPassword;
