import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import axios from 'axios';

const NewCredentials = ({ route, navigation }) => {
  const { email, code } = route.params; // Get email and pin (code) from the params
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePress = async () => {
    // Basic password validation
    if (!newPassword || !confirmNewPassword) {
      setErrorMessage('Password fields cannot be empty.');
    } else if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
      setLoading(true); // Show loader while API call is made
      try {
        const response = await axios.post('https://intechsol.co/sav/api/reset', {
          email: email,
          pin: code, // Use the code (pin) from previous verification step
          password: newPassword,
          password_confirmation: confirmNewPassword,
        });

        setLoading(false);

        if (response.data.status === 'success') {
          // Navigate back to the Login screen on successful password reset
          navigation.navigate('Login');
        } else {
          setErrorMessage('Failed to reset password. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage('An error occurred. Please try again.');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={'#FFFFF9'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>New Credentials</Text>

        {/* Subtext */}
        <Text style={styles.subtext}>Enter and confirm your new password</Text>

        {/* New Password Input */}
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#7D7D7D"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        {/* Confirm New Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#7D7D7D"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
        />

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Update Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleUpdatePress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>Update</Text>
          )}
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
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subtext: {
    fontSize: 14,
    color: '#7D7D7D',
    // marginBottom: 30,
    alignSelf: 'flex-start',
    marginVertical:'30%'
  },
  input: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#34A853',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 12,
    color: '#000',
    fontFamily:'Inter-Regular',
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,

},
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#34A853',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:'30%'
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewCredentials;
