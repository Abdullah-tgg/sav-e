import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground, StatusBar, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice'; // Import loginUser thunk

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error,isAuthenticated } = useSelector(state => state.user); // Access loading and error state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    useEffect(()=>{
    if(isAuthenticated){
            navigation.navigate('BottomNav')
        }
    },[])
    const validateFields = () => {
        let valid = true;
        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Email validation
        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!email.includes('@')) {
            setEmailError('Email must contain "@" symbol.');
            valid = false;
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        }

        return valid;
    };

    const handleLogin = () => {
        if (validateFields()) {
            const credentials = { email, password };
            dispatch(loginUser(credentials))
                .unwrap()
                .then(() => {
                    // Navigate to BottomNav on successful login
                    navigation.navigate('BottomNav');
                })
                .catch(err => {
                    console.error(err); // Handle login error
                });
        }
    };

    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={'#FFFFF9'} barStyle={'dark-content'}/>

                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtext}>Please enter your email address and password for login.</Text>

                <Image source={require('../../assets/icons/Logo.png')} style={styles.logo} />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#777777"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#777777"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {error && <Text style={styles.errorText}>{error}</Text>} 

                <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20, marginTop: 5}} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={{color: '#002055', fontSize: 12}}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button with Loader */}
                <TouchableOpacity style={styles.signupButton} onPress={handleLogin} disabled={loading}>
                    {
                        loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" style={{paddingVertical:5}} />  
                    ) : (
                        <Text style={styles.signupText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Not registered yet? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginLink}>Create An Account</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.socialText}>Log In with</Text>
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
        backgroundColor: 'FFFFF9', 
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
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    signupText: {
        color: '#FFF',
        fontSize: 20,
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
        fontFamily:'Inter-Regular',

        alignSelf: 'center',
    },
    socialIconContainer: {
        padding: 12, 
        borderColor: '#34A853',
        borderWidth: 1,
        margin: 10,
        borderRadius: 15,
    },
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default Login;
