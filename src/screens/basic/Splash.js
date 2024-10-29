import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding1');
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFF9" barStyle="dark-content" />
      <Image source={require('../../assets/img/Splash.png')} style={styles.splashImage} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFF9'
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})