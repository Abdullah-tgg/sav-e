import React ,{useState,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Header from '../../components/Header'; // Assuming you have a Header component
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const VlogDetail = ({route}) => {
  const  {category}  = route.params; // Get the category passed from the previous screen
  const {item} = route.params
  const apiToken = useSelector(state => state.user.user.userdata.api_token); // Get apiToken from Redux
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(category);
  
  useEffect(() => {
    // Set the post when the component mounts
    setPost(item);
    console.log(post);
    
    setLoading(false); // Loading ends when the post is set
  }, [item]);

  // Function to handle the "Like" button press
  const handleLike = async () => {
    // console.log(post.id);
    
    setLoading(true);
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/like_post',
        { post_id: post.id }, // Send post_id as an integer
        {
          headers: {
            Authorization: `Bearer ${apiToken}`, // Add the API token to the request header
          },
        }
      );

      const data = response.data;
      console.log(data.total_likes);
      
      // Show the toast message with the response message
      Toast.show({
        type: 'success',
        text1: data.message,
      });

      // Update the post's like count
      setPost(prevPost => ({
        ...prevPost,
        likes_count: data.total_likes,
      }));
    } catch (error) {
      console.error('Error liking the product:', error);
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error liking the product',
      });
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation()
  if (loading) {
    return <ActivityIndicator size="large" color="#34A853" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Vlog" ShowBackButton={true} />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ backgroundColor: '#FFFFF9' }}>
          {/* Video */}
          <Video
          source={{ uri: post.video }} // Corrected to dynamically load the video
          style={styles.video}
          resizeMode="cover"
          controls={true} // Adds play/pause controls
        />
          {/* Tags */}
          <View style={styles.tagsContainer}>
                <ImageBackground source={require('../../assets/img/rect1.png')} resizeMode='contain' style={styles.tagImageWithShadow}>
                <Text style={styles.tagText}>Giveaway</Text>
                </ImageBackground>
                <ImageBackground source={require('../../assets/img/rect2.png')} resizeMode='contain' style={styles.tagImageWithShadow} >
                <Text style={styles.tagText}>Giveaway</Text>
                </ImageBackground>
                <ImageBackground source={require('../../assets/img/rect3.png')} resizeMode='contain' style={styles.tagImageWithShadow}>
                <Text style={styles.tagText}>Giveaway</Text>
                </ImageBackground>
          </View>

          {/* Title */}
          <Text style={styles.title}>{post.title}</Text>

          {/* Description */}
          <Text style={styles.description}>
          {post.description}  
          </Text>

          {/* Like and Comment Counts */}
          <View style={styles.likeCommentCountContainer}>
            <View style={styles.actionCount}>
              <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
              <Text style={styles.likeCommentText}>{post.likes_count} Likes</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionCount}>
              <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
              <Text style={styles.likeCommentText}>{post.comments_count} Comments</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Like and Comment Action Box */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Image source={require('../../assets/icons/Love.png')} style={styles.actionImage} />
          <Text style={styles.actionText}>Love</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('Comments',{post, category})}>
          <Image source={require('../../assets/icons/Comment.png')} style={styles.actionImage} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF9',
  },
  scrollContainer: {
    paddingBottom: 100, // Leave space for the action buttons at the bottom
  },
  video: {
    margin: '10%',
    width: '90%',
    height: height * 0.4,
    alignSelf: 'center',
    borderRadius: 15, // Rounded corners for the video
    overflow: 'hidden',
  },
  tagsContainer: {
    width:wp(100),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems:'center',
    marginTop: -20,
    marginHorizontal: 20,
  },
  tag: {
    // width:wp(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Adjust height for better shadow effect
    shadowOpacity: 0.25,
    shadowRadius: 4, // Increased radius for softer shadow
    elevation: 4, // For Android shadow
    marginHorizontal:10,
    // position: 'relative', // Relative positioning for containing the absolute text
  },
  tagOverlay: {
    width: wp(25),
    height: wp(8),
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  tagImageWithShadow: {
    width: wp(30),
    height: wp(10),
    resizeMode: 'contain',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Adjust height for better shadow effect
    shadowOpacity: 0.25,
    shadowRadius: 4, // Increased radius for softer shadow
    elevation: 4,
  },
  tagText: {
    position: 'absolute', // Absolute positioning to overlay the text
    fontSize: 8,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional background to make text readable
    paddingHorizontal: 4,
    // borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily:'Inter-Bold',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 12,
    color: '#777777',
    fontFamily:'Inter-Regular',
    lineHeight:20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  likeCommentCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderColor: '#D8D8D8',
    borderRadius: 15,
    borderWidth: 1,
    margin: '10%',
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
    position: 'absolute', // Absolute positioning to place the action buttons at the bottom
    bottom: 0,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFF9', // Match the background
  },
  actionCount: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  actionImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 14,
    color: '#777',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D8D8D8',
  },
});

export default VlogDetail;
