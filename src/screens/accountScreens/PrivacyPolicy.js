import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header'; // Assuming you are using the custom Header component

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Privacy Policy" ShowBackButton={true} />
        <View style={styles.content}>
      {/* Content with Shadow */}
      <View style={styles.shadowContainer}>
       
        <Text style={styles.description}>
        A privacy policy is a legal document where you disclose what data you collect from users, how you manage the collected data and how you use that data. The important objective of a privacy policy is to inform users how youcollect, use and manage the collected
        The Privacy Policy Generator(privacypolicygenerator
            .info) is a free generator of privacy policies for websites, apps & Facebook pages/app. You can use our free generator to create the privacy policy for your business.
            The most important thing to remember is that a privacy policy is required by law if you collect data from users, either directly or indirectly. For example, if you have a contact form on your website you need a privacy policy. 
But you will also need a privacy policy if you use analytics tools such as Google Analytics.
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
    lineHeight:28
  },
});

export default PrivacyPolicy;
