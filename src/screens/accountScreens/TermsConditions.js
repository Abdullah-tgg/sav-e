import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header'; // Assuming you are using the custom Header component

const TermsConditions = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Terms & Conditions" ShowBackButton={true} />
        <View style={styles.content}>
      {/* Content with Shadow */}
      <View style={styles.shadowContainer}>
       
        <Text style={styles.description}>
        Terms and Conditions” is the document governing the contractual relationship between the provider of a service and its user. On the web, this document is often also called “Terms of Service” (ToS), “Terms of Use”, EULA (“End-User License Agreement”), “General Conditions” or “Legal Notes”.
        The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
        The Terms and Conditions therefore, represent the document that helps in dealing with problems or preventing them in the first place. Because of that, the Terms and Conditions are fundamental in many cases in order to mount an adequate and proper defense.
         </Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  content:{
    justifyContent:'center',
    padding:20
  },
  shadowContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  logo: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode:'contain'
  },
  description: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    lineHeight:24
  },
});

export default TermsConditions;
