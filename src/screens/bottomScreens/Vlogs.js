import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Get device width for responsiveness
const { width } = Dimensions.get('window');

const Vlogs = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Header title={"Vlogs"} />
      <View style={{ padding: 20 }}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require('../../assets/icons/Search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Containers for Giveaways and Promos */}
        <View style={styles.rowContainer}>
          {/* Giveaways Container */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('VlogsList', { category: 'giveaways' })}>
            <Image source={require('../../assets/img/Giveaways.png')} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Giveaways</Text>
              <Text style={styles.description}>Enter our giveaways for a chance to win amazing prizes!</Text>
            </View>
          </TouchableOpacity>

          {/* Promos Container */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('VlogsList', { category: 'promos' })}>
            <Image source={require('../../assets/img/Promos.png')} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Promos</Text>
              <Text style={styles.description}>Check out our latest promotions and special offers.</Text>
            </View>
          </TouchableOpacity>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjust height for better shadow effect
    shadowOpacity: 0.25,
    shadowRadius: 6, // Increased radius for softer shadow
    elevation: 3, // For Android shadow
    paddingVertical: 5
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 12
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF', // Changed to white for better contrast
    borderRadius: 10,
    width: (width - 60) / 2, // Ensure containers are responsive
    overflow: 'hidden', // To ensure rounded corners
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjust height for better shadow effect
    shadowOpacity: 0.3, // Slightly increased opacity
    shadowRadius: 8, // Increased radius for more prominent shadow
    elevation: 3, // Increased elevation for Android shadow
    padding: 10,
    alignItems: 'center'
  },
  itemImage: {
    width: '100%',
    height: widthPercentageToDP(40),
    alignSelf: 'center',
    borderRadius: 10,

  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 10,
    color: '#777777',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    lineHeight: 18

  },
});

export default Vlogs;
