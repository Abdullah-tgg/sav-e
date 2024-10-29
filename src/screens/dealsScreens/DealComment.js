import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header'; // Assuming you have a Header component
import Toast from 'react-native-toast-message'; // For displaying success or error messages

const { width } = Dimensions.get('window');

const DealComment = ({ route }) => {
  const { product } = route.params; // Get product id from navigation params
  const apiToken = useSelector(state => state.user.user.userdata.api_token); // Get apiToken from Redux

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]); // State for storing comments
  const [noComments, setNoComments] = useState(false); // State to manage no comments

  // Fetch comments function
  const fetchComments = async () => {
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/deel_commentall',
        { deel_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const data = response.data;

      if (data.status === 'success' && data.total_comments > 0) {
        setComments(data.comments);
        setNoComments(false);
      } else {
        setNoComments(true);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setNoComments(true); // Show no comments if there's an error
    }
  };

  // Call fetchComments when the component mounts
  useEffect(() => {
    fetchComments();
  }, [product, apiToken]); // Depend on product and apiToken

  // Function to handle posting a comment
  const postComment = async () => {
    if (!comment.trim()) {
      Toast.show({ type: 'error', text1: 'Comment cannot be empty!' });
      return;
    }

    setLoading(true); // Show loading while posting the comment
    try {
      const response = await axios.post(
        'https://intechsol.co/sav/api/deel_comment',
        { deel_id: product.id, comment: comment },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const data = response.data;

      // Show success toast
      Toast.show({ type: 'success', text1: 'Comment Posted' });

      // Clear comment input and refetch comments
      setComment('');
      await fetchComments(); // Fetch comments again after posting
    } catch (error) {
      console.error('Error posting comment:', error);
      Toast.show({ type: 'error', text1: 'Failed to post comment' });
    } finally {
      setLoading(false); // Hide loading after the API call is done
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Comments" ShowBackButton={true} />

      {/* Display comments or no comments image */}
      <View style={styles.commentsContainer}>
        {noComments ? (
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/img/NoComments.png')} style={styles.image} />
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Comment Input Section */}
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a comment..."
          placeholderTextColor="#777"
          value={comment}
          onChangeText={setComment} // Update comment state
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={postComment} 
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Image source={require('../../assets/icons/Send.png')} style={styles.sendIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff9',
    justifyContent: 'space-between',
  },
  commentsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  commentItem: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#000',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 12,
    paddingLeft: 10,
    color: '#000',
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#34A853',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default DealComment;
