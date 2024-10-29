
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import Header from '../../components/Header';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { useFocusEffect } from '@react-navigation/native';

const Saved = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]); // State to hold the fetched products
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const apiToken = useSelector((state) => state.user.user.userdata.api_token); // Get the API token from Redux
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://intechsol.co/sav/api/allsave', {
        headers: {
          Authorization: `Bearer ${apiToken}`, // Pass the API token in the headers
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setProducts(data.deels); // Update the state with the fetched products
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the products every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [apiToken]) // Re-fetch data when the API token changes or screen is focused
  );

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => { navigation.navigate('DealsItemDetail', { item }) }}>
      <Image source={{ uri: item.image }} style={styles.dealImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.discountText}>Save {item.discount}%</Text>
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
      <Header title={"Saved"} ShowBackButton={true} />

      <View style={styles.searchBar}>
        <Image source={require('../../assets/icons/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#777"
          value={searchQuery} // Bind search input to searchQuery state
          onChangeText={(text) => setSearchQuery(text)} // Update searchQuery on input change
        />
      </View>

      {/* Conditionally render image or FlatList */}
      {filteredProducts.length === 0 ? (
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/img/Saved.png')} style={styles.image} />
          <Text style={styles.subText}>No Item Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts} // Use filteredProducts instead of products
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor gets string value
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjust height for better shadow effect
    shadowOpacity: 0.25,
    shadowRadius: 6, // Increased radius for softer shadow
    elevation: 3, // For Android shadow
    paddingVertical: 5,
    margin:10
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize:12
  },
  listContainer: {
    padding: 10,
    paddingBottom:'20%'
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Ensure background color is set
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjust height for better shadow effect
    shadowOpacity: 0.25,
    shadowRadius: 6, // Increased radius for softer shadow
    elevation: 5, // For Android shadow
    margin: 10,
    padding: 15,
    paddingVertical: 15,
    
  },
  imageContainer:{
    width:'100%',
    height:'70%',
    alignItems:'center'
  },
  image: {
    width: wp(100),
    height: wp(75),
    // marginRight: 10,
    resizeMode:'contain'
  },
  dealImage:{
    width:wp(15),
    height:wp(15),
    resizeMode:'contain',
    marginRight:10
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: 'black',
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5E5E5',
    paddingLeft: 10,
    position:'absolute',
    left:'80%'
  },
  price: {
    fontSize: 19,
    fontFamily: 'Inter-Bold',
    color: '#15BE77',
  },
  discountText:{
    fontSize:10,
    color:'#989898',
    fontFamily: 'Inter-Regular',

  }
});

export default Saved;
