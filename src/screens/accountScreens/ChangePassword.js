// Inside Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { updateUserProfile } from '../../redux/userSlice';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const ChangePassword = () => {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const apiToken = useSelector((state) => state.user.user.userdata.api_token); // Get the user data from Redux

    const handleSaveChanges = async () => {
        // Validate required fields
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            Toast.show({ type: 'error', text1: 'Please fill out all the fields!' });
            return;
        }
        setLoading(true); // Show loading while posting the comment
        try {
            const response = await axios.post(
                'https://intechsol.co/sav/api/change-password',
                {
                    old_password: oldPassword,
                    password: newPassword,
                    password_confirmation: confirmNewPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                }
            );
            const data = response.data;

            // Show success toast
            Toast.show({ type: 'success', text1: 'Password changed successfully' });

            // Clear comment input and refetch comments
            setOldPassword('');
            setNewPassword('')
            setConfirmNewPassword('')

        } catch (error) {
            console.error('Error changing password:', error);
            Toast.show({ type: 'error', text1: 'Failed to changed password' });
        } finally {
            setLoading(false); // Hide loading after the API call is done
            navigation.navigate('BottomNav')
        }
    };
    return (
        <View style={profileStyles.container}>
            <Header title="Change Password" ShowBackButton={true} />
            <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#FFFFF9' }}>
                <Image source={require('../../assets/img/ChangePassword.png')} style={{
                    width: '100%', height: '70%', resizeMode: 'contain',
                    marginVertical: '5%'
                }} />
                <TextInput
                    style={profileStyles.input}
                    placeholder="Old Password"
                    onChangeText={setOldPassword}
                    placeholderTextColor={'#848A94'}
                />

                <TextInput
                    style={profileStyles.input}
                    placeholder="New Password"
                    onChangeText={setNewPassword}
                    placeholderTextColor={'#848A94'}
                />

                <TextInput
                    style={profileStyles.input}
                    placeholder="Confirm New Password"
                    onChangeText={setConfirmNewPassword}
                    placeholderTextColor={'#848A94'}
                />


                {/* Save Changes Button */}
                <TouchableOpacity style={profileStyles.saveButton} onPress={handleSaveChanges} disabled={loading}>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#34A853" style={{ paddingVertical: 5 }} />
                        ) : (
                            <Text style={profileStyles.saveButtonText}>Update</Text>
                        )}
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

export default ChangePassword;
