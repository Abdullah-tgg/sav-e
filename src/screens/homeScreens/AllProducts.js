import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const AllProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]); // State to hold the fetched products
  const apiToken = useSelector((state) => state.user.user.userdata.api_token); // Get the API token from Redux
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://intechsol.co/sav/api/allproduct', {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Pass the API token in the headers
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setProducts(data.products); // Update the state with the fetched products
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchProducts();
  }, [apiToken]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {navigation.navigate('ProductDetail',{item})}}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price}</Text>
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
    return(
    <View style={styles.container}>
      <Header title={"Detail"} ShowBackButton={true} />

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor gets string value
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 10,
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
  image: {
    width: wp(15),
    height: wp(15),
    marginRight: 10,
    resizeMode:'contain'
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
});

export default AllProducts;
