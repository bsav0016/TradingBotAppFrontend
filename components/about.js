import { StyleSheet, Text, View, ImageBackground, Dimensions, SafeAreaView, Linking } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function About() {

  const image = require('../assets/background.jpeg')

  const openPrivacy = () => {

  }

  const openTerms = () => {

  }

  const openEmail = () => {
    Linking.openURL('mailto:savidgeapps@gmail.com')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground 
        source={image} 
        style={{height: null, 
        width: Dimensions.get('window').width, 
        resizeMode: 'cover', 
        overflow: 'hidden', 
        flex: 1}}>
       <View style={styles.container}>
        <Text style={styles.headerText}>Thank you for choosing my app!</Text>
        <Text style={styles.bodyText}>If you have any feedback, suggestions, or would like me to make
        a custom bot for you, please reach out to me at the email address below. Why choose this
        app? I am just an individual, not a whole corporation looking to make millions of dollars.
        I am looking out for both of our best interests (no pun intended). That also means 
        minimal fees on your end. Yes, you still have to pay the low Binance fees, but I will only
        charge a small fee when you start your bot and that's it. Nothing for continuous running,
        withdrawls, etc. I work 50+ hour weeks at my full-time job and do this only because I have a
        passion for it. I hope this app opens up opportunity for those who don't understand the financial or
        computer science side as well. I will work to continue to update this app and am always open
        to new suggestions. Thanks!</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.bodyText}>Email: </Text>
          <TouchableOpacity onPress={() => openEmail()}>
            <Text style={styles.buttonText}>savidgeapps@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("Open Privacy Policy")}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Open Terms and Conditions")}>
          <Text style={styles.buttonText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

About.navigationOptions = screenProps => ({
  title: "About & Contact",
  headerStyle: {
      backgroundColor: '#07E20D'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000'
  },
  backgroundColor: '#000'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    padding: 5,
    color: '#fff',
    backgroundColor: '#000'
  },
  bodyText:{
    fontSize: 16,
    padding: 5,
    color: '#fff',
    backgroundColor: '#000'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#000'
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#07E20D',
    textDecorationLine: 'underline',
    backgroundColor: '#000',
    paddingHorizontal: 5
  }
});