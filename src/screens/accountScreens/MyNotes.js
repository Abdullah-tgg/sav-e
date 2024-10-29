import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Header from '../../components/Header'; // Assuming you have a Header component

const { width, height } = Dimensions.get('window');

const MyNotes = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="My Notes" ShowBackButton={true} />
      <View style={{padding:20}}>
      <View style={styles.searchBar}>
          <Image source={require('../../assets/icons/Search.png')} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search..." 
            placeholderTextColor="#888" 
          />
        </View>
      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/img/NoData.png')} style={styles.image} />
        <Text style={styles.subText}>No Item Found</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7EA',
    alignItems:'center',
  },
  searchBar: {
      flexDirection: 'row',
      width:'100%',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      paddingHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 }, // Adjust height for better shadow effect
      shadowOpacity: 0.25,
      shadowRadius: 6, // Increased radius for softer shadow
      elevation: 3, // For Android shadow
      paddingVertical: 5,
    //   margin:10
    },
    searchIcon: {
      width: 20,
      height: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginLeft: 10,
    },
  imageContainer: {
    // flex: 1,
    marginTop:'30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6, // Adjust size as needed
    height: width * 0.6,
    resizeMode: 'contain',
  },
  subText:{
    fontWeight:'bold',
    color:'#000',
marginTop:'10%'
  }
});

export default MyNotes;
