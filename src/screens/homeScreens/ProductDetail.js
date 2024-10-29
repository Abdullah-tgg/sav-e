import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Linking, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ProductDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params; // Get product id from navigation params
  const apiToken = useSelector(state => state.user.user.userdata.api_token); // Get apiToken from Redux
  // console.log(id,apiToken);
  const [product, setProduct] = useState(item);
  const [loading, setLoading] = useState(false);
  console.log(product);
  
  // setProduct(item)
  // Fetch product data from the API
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await axios.get(`https://intechsol.co/sav/api/product/${id}/showproduct`, {
  //         headers: {
  //           Authorization: `Bearer ${apiToken}`, // Add the API token to the request header
  //         },
  //       });
  //       console.log(response);
        
  //       // const data = response;
  //       setProduct(response); // Set the product data
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     } finally {
  //       setLoading(false); // Hide loading spinner once data is fetched
  //     }
  //   };

  //   fetchProduct();
  // }, [id, apiToken]);

  // Function to handle the "Like" button press
  const handleLike = async () => {
    setLoading((true))
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/like_product',
        { product_id: product.id }, // Send post_id as an integer
        {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Add the API token to the request header
          },
        }
      );
  
      const data = response.data;
      // console.log(data);
      
      // Show the toast message with the response message
      Toast.show({
        type: 'success',
        text1: data.message,
      });
  
      // Optionally, update the product's like count here if necessary
      setProduct(prevProduct => ({
        ...prevProduct,
        total_likes: data.total_likes,
      }));
    } catch (error) {
      console.error('Error liking the product:', error);
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error liking the product',
      });
    }
    finally{
      setLoading(false)
    }
  };
  const handleLinkPress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }
  if (loading) {
    return <ActivityIndicator size="large" color="#34A853" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
  
  };
  return (
    <View style={styles.container}>
      <Header title="Details" ShowBackButton={true} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Image */}
        <ImageBackground source={{ uri: product.image }} style={styles.productImage} resizeMode='contain' >
          
        </ImageBackground>

        {/* Product Title and Price */}
        <View style={styles.titlePriceContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>

        {/* Product Date */}
        <Text style={styles.productDate}>{product.date}</Text>

        {/* Product Description */}
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Product Link */}
        <TouchableOpacity onPress={() => handleLinkPress(product.link)}>
          <Text style={styles.productLink}>{product.link}</Text>
        </TouchableOpacity>
        {/* Disclaimer */}
        <Text style={styles.disclaimer}>Disclaimer</Text>
        <Text style={styles.productDisclaimer}>{product.disclaimer}</Text>

        <View style={styles.likeCommentCountContainer}>
          <View style={styles.actionCount}>
            <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
            <Text style={styles.likeCommentText}>{product.total_likes} Likes</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.actionCount}>
            <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
            <Text style={styles.likeCommentText}>{product.total_comments} Comments</Text>
          </View>
        </View>

        {/* Like and Comment Section */}
        <View style={styles.actionContainer}>
      
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              {loading?(
                <ActivityIndicator size="small" color="#FFF" />):(  
                <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
                )}  
            <Text style={styles.actionText}>Love</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ProductComment",{id:product.id})}>
            <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Toast Component */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  content: {
    padding: wp(5),
  },
  productImage: {
    width: wp(100),
    height: wp(90),
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productTitle: {
    fontSize: 18,
    fontFamily:'Inter-Bold',
    color: '#000',
    flex: 1,
  },
  productPrice: {
    fontSize: 24,
    fontFamily:'Inter-Bold',
    color: '#34A853', // Primary color
    marginLeft: 10,
  },
  productDate: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 10,
    fontFamily:'Inter-Regular',
    textAlign: 'left',
  },
  productDescription: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'left',
    marginBottom: 20,
    lineHeight:20,
    fontFamily:'Inter-Regular'
  },
  productLink: {
    fontSize: 12,
    color: '#34A853', // Primary color
    textAlign: 'left',
    marginBottom: 10,
    fontFamily:'Inter-Regular',
    borderBottomColor:'#D8D8D8',
    borderBottomWidth:1,
    width:'50%'
  },
  disclaimer: {
    fontSize: 14,
    fontFamily:'Inter-Bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'left',
  },
  productDisclaimer: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'left',
    lineHeight:20,
    fontFamily:'Inter-Regular',
  },
likeCommentCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderColor: '#D8D8D8',
    borderRadius: 15,
    borderWidth: 1,
    margin: '5%',
  },
  actionCount: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D8D8D8',
  },
  likeCommentText: {
    fontSize: 12,
    color: '#777777',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8',
    marginTop: 20,
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  actionImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 14,
    color: '#000',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D8D8D8',
  },
});

export default ProductDetail;
