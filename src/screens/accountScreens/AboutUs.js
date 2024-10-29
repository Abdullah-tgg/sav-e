import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header'; // Assuming you are using the custom Header component

const AboutUs = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="About Us" ShowBackButton={true} />
        <View style={{padding:20}}>
      {/* Content with Shadow */}
      <View style={styles.shadowContainer}>
        <Image
          source={require('../../assets/icons/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.description}>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
          Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla 
          ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, 
          mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 
          grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications 
          de mise en page de texte, comme Aldus PageMaker.
        </Text>
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
  shadowContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  logo: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode:'contain'
  },
  description: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    lineHeight:24
  },
});

export default AboutUs;
