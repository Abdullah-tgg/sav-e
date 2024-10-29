import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // To access Redux state
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const token = useSelector(state => state.user.user.userdata.api_token); // Access token from Redux

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://intechsol.co/sav/api/allproduct', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        });
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) {
    
    return <View style={{flex:1, justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#34A853" /></View>;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showWelcomeMessage />

      <View style={styles.content}>
        {/* Recent Deals Header */}
        <View style={styles.recentDealsContainer}>
          <Text style={styles.recentDealsText}>Recent Deals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {/* Product List */}
        <FlatList
          horizontal
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate("ProductDetail", { item })}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDate}>{item.date}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Kliq Logo */}
        <Image source={require('../../assets/img/Kliq.png')} style={styles.kilqLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  content: {
    padding: 20,
  },
  recentDealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  recentDealsText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 10,
    color: '#777777',
    fontFamily: 'Inter-Regular',
  },
  productContainer: {
    width: wp(45),
    borderRadius: 15,
    height: wp(65),
    marginRight:10
  },
  productImage: {
    width: wp(45),
    height: wp(45),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'contain',
  },
  productInfo: {},
  productTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  productDate: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777777',
    marginBottom: 5,
    fontFamily: 'Inter-Regular',
  },
  productPrice: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  kilqLogo: {
    width: '100%',
    height: wp(60),
    resizeMode: 'contain',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
