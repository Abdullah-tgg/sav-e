import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Get device width for responsiveness
const { width } = Dimensions.get('window');

const VlogsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const apiToken = useSelector((state) => state.user.user.userdata.api_token); // Get API token from Redux
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params; // Get the category passed from the previous screen

  useEffect(() => {
    // Fetch data from the API based on the selected category
    const fetchData = async () => {
      try {
        // Determine the post_id based on the category
        const type = category === 'giveaways' ? 'giveaways' : 'promos';
        console.log(category);
        
        const response = await axios.post(
          'https://intechsol.co/sav/api/posttype',
          { type: type }, // Dynamically pass the post_id here
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        if (response.data.status === 'success') {
          setData(response.data.posts); // Set posts data
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiToken, category]);

  // Function to filter data based on the search query
  const filteredData = data.filter((item) => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('VlogDetail', {item, category})}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Vlogs" ShowBackButton={true} />
      <View style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require('../../assets/icons/Search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery} // Bind searchQuery to input
            onChangeText={setSearchQuery} // Update search query on input change
          />
        </View>

        {/* FlatList for Vlogs */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData} // Use filtered data for the list
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 5,
    margin: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 12,
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  itemImage: {
    width: width * 0.3,
    height: widthPercentageToDP(30),
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#09051C',
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#777777',
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
});

export default VlogsList;
