import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const DealsItemDetail = ({ route }) => {
  const navigation = useNavigation()
  const { item } = route.params;
  const apiToken = useSelector(state => state.user.user.userdata.api_token); // Get apiToken from Redux
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(item); // Store the item in state

  const handleLinkPress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }
  };
  const handleSavePress = async () => {
    setLoading(true);
    console.log(product.id);
    
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/save_deel',
        { deel_id: product.id }, // Send deel_id as an integer
        {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Add the API token to the request header
          },
        }
      );

      const data = response.data;
      // console.log(data);
      
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      navigation.goBack()
    } catch (error) {
      console.error('Error saving the product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error saving the product',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/like_deel',
        { deel_id: product.id }, // Send deel_id as an integer
        {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Add the API token to the request header
          },
        }
      );

      const data = response.data;
      console.log(data);
      
      Toast.show({
        type: 'success',
        text1: data.message,
      });

      // Update the likes count with the new value from the API response
      setProduct(prevProduct => ({
        ...prevProduct,
        likes_count: data.total_likes, // Update the likes_count based on API response
      }));
    } catch (error) {
      console.error('Error liking the product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error liking the product',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#34A853" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Deal Details" ShowBackButton={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Image */}
        <ImageBackground source={{ uri: product.image }} style={styles.productImage} resizeMode='contain' >
          <TouchableOpacity style={{flex:1}} onPress={handleSavePress}>
            <Image 
              source={product.is_saved 
                ? require('../../assets/icons/Saved.png') 
                : require('../../assets/icons/Unsaved.png')} 
              style={{width:'20%',height:"10%",resizeMode:'contain', position:'absolute', right:0}} 
            />
          </TouchableOpacity>
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

        {/* Like and Comment Counts */}
        <View style={styles.likeCommentCountContainer}>
          <View style={styles.actionCount}>
            <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
            <Text style={styles.likeCommentText}>{product.likes_count} Likes</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.actionCount}>
            <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
            <Text style={styles.likeCommentText}>{product.comments_count} Comments</Text>
          </View>
        </View>

        {/* Like and Comment Section */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
            <Text style={styles.actionText}>Love</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate("DealComment",{product})}>
            <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: wp(90),
    height: wp(80),
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
    fontFamily:'Inter-Regular',

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
    marginBottom:'20%',    
    fontFamily:'Inter-Regular',

  },
  likeCommentCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderColor: '#D8D8D8',
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: '5%',
    marginBottom:'15%'
  },
  likeCommentText: {
    fontSize: 12,
    color: '#777777',
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
  actionContainer: {
    width:wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8',
    marginTop: 20,
    paddingTop: 10,
    position: 'absolute', // Absolute positioning to place the action buttons at the bottom
    bottom: 0,
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

export default DealsItemDetail
