import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/userSlice'; // Import the signup thunk
import { useEffect } from 'react';

const Signup = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user); // Get loading, error, and isAuthenticated from the Redux store

    const [fullName, setFullName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('BottomNav'); // Navigate to Home screen upon successful signup
        }
    }, [isAuthenticated, navigation]);

    const validateFields = () => {
        let isValid = true;

        // Reset error messages
        setFullNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');

        if (!fullName) {
            setFullNameError('Full Name is required.');
            isValid = false;
        }

        if (!lastName) {
            setLastNameError('Last Name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!email.includes('@')) {
            setEmailError('Invalid email format.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        }

        return isValid;
    };

    const handleSignup = () => {
        if (validateFields()) {
            const userData = {
                firstname: fullName,
                lastname: lastName,
                email: email,
                password: password,
            };

            dispatch(signupUser(userData)); // Dispatch the signupUser action
        }
    };

    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <StatusBar backgroundColor={'#FFFFF9'} barStyle={'dark-content'}/>
                {/* Title and Subtext */}
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtext}>
                    Please enter your information and create your account
                </Text>

                {/* Logo */}
                <Image source={require('../../assets/icons/Logo.png')} style={styles.logo} />

                {/* Input Fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#7D7D7D"
                    value={fullName}
                    onChangeText={setFullName}
                />
                {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#7D7D7D"
                    value={lastName}
                    onChangeText={setLastName}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7D7D7D"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#7D7D7D"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
                    <Text style={styles.signupText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Media Register Section */}
                <Text style={styles.socialText}>Register with</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.socialIconContainer}>
                        <Image source={require('../../assets/img/Apple.png')} style={styles.socialIcon} />
                    </View>
                    <View style={styles.socialIconContainer}>
                        <Image source={require('../../assets/img/Google.png')} style={styles.socialIcon} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFF9', 

    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: '10%',
    },
    title: {
        fontSize: 25,
        fontFamily:'Inter-Bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    subtext: {
        fontSize: 14,
        color: '#7D7D7D',
        textAlign: 'left',
        fontFamily:'Inter-Regular',
        marginBottom: 30,
        alignSelf: 'flex-start',
    },
    logo: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',
        marginBottom: 30,
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
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontSize: 12,
        fontFamily:'Inter-Regular',

    },
    signupButton: {
        backgroundColor: '#34A853',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop:'10%'
    },
    signupText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily:'Inter-Bold',
    },
    loginContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    loginText: {
        fontSize: 14,
        color: '#979797',
        fontFamily:'Inter-Bold',
    },
    loginLink: {
        fontSize: 14,
        color: '#34A853',
        fontFamily:'Inter-Bold',
    },
    socialText: {
        fontSize: 14,
        color: '#979797',
        marginBottom: 15,
        alignSelf: 'center',        
        fontFamily:'Inter-Regular',

    },
    socialIconContainer: {
        padding: 12,
        borderColor: '#34A853',
        borderWidth: 1,
        margin: 10,
        backgroundColor:'#F8F8EC',
        borderRadius: 15,
    },
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default Signup;
