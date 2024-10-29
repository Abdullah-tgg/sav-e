// Inside Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { updateUserProfile } from '../../redux/userSlice';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false); // State to manage the dropdown's visibility
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);

  const user = useSelector((state) => state.user.user.userdata); // Get the user data from Redux

  // Update state when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Pre-fill the fields with user data every time the screen comes into focus
      if (user) {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setAddress(user.address);
        setPhoneNumber(user.phone_no);
        setGender(user.gender);
        setDateOfBirth(user.dateofbirth);
        setProfileImage(user.image ? { uri: user.image } : null); // Set the profile image if available
      }
    }, [user]) // Dependency on user data
  );

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const handleSaveChanges = async () => {
    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !gender || !dateOfBirth) {
      Toast.show({ type: 'error', text1: 'Please fill in all the required fields!' });
      return;
    }

    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: user.email, // Use email from the user object
      image: profileImage ? profileImage.uri : null, // Send `null` if no image is selected
      address: address,
      phone_no: phoneNumber,
      gender: gender,
      dateofbirth: dateOfBirth,
    };
    try {
      const resultAction = await dispatch(updateUserProfile(formData));
  
      if (updateUserProfile.fulfilled.match(resultAction)) {
        Toast.show({ type: 'success', text1: 'Profile updated successfully!' });
        navigation.navigate('BottomNav');
        
      } else {
        Toast.show({ type: 'error', text1: 'Failed to update profile.' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({ type: 'error', text1: 'An error occurred while updating the profile.' });
    }
  };
  return (
    <View style={profileStyles.container}>
      <Header title="Profile" ShowBackButton={true} />
      <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#FFFFF9' }}>
        {/* Profile Image */}
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={profileImage ? profileImage : require('../../assets/img/ProfilePlaceholder.png')}
            style={profileStyles.profileImage}
          />
        </TouchableOpacity>

        {/* First Name */}
        <TextInput
          style={profileStyles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor={'#848A94'}
        />

        {/* Last Name */}
        <TextInput
          style={profileStyles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor={'#848A94'}
        />

        {/* Address */}
        <TextInput
          style={profileStyles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={'#848A94'}
        />

        {/* Phone Number */}
        <TextInput
          style={profileStyles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor={'#848A94'}
        />

        {/* Gender Dropdown */}
        <DropDownPicker
          open={openDropdown}
          value={gender}
          items={genderItems}
          setOpen={setOpenDropdown}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Gender"
          style={profileStyles.dropdown}
          textStyle={{ color: '#848A94', fontSize: 12 }}
          dropDownContainerStyle={{ backgroundColor: '#FFFFFF' }} // Customize dropdown style
        />

        {/* Date of Birth */}
        <TextInput
          style={profileStyles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholderTextColor={'#848A94'}
        />

        {/* Save Changes Button */}
        <TouchableOpacity style={profileStyles.saveButton} onPress={handleSaveChanges}>
          <Text style={profileStyles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#34A853',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 12,
    color: '#000',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,

  },
  dropdown: {
    backgroundColor: '#FFF',
    borderColor: '#cfcfcf',
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 10,
    // marginTop:-10,
    color: '#c5c5c5',
  
  },
  saveButton: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFF9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34A853',
    marginVertical: '10%'
  },
  saveButtonText: {
    color: '#34A853',
    fontWeight: 'bold',
  },
});

export default Profile;
