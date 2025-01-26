import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';


export default function Home(props) {

  const image = require('../assets/background.jpeg')

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
      
          <TouchableOpacity onPress={() => props.navigation.navigate("Backtest")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Backtest</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Bot")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Run Bot</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Instructions")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Instructions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>My Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("About")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>About/Contact</Text>
            </View>
          </TouchableOpacity>
      
        </View>
    </ImageBackground>
  </SafeAreaView>
    
  );
}

Home.navigationOptions = screenProps => ({
  title: "Home",
  headerStyle: {
      backgroundColor: '#07E20D'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000'
  },
  headerLeft: () => null
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    margin: 10,
    borderColor: '#07E20D',
    borderWidth: 3
  },
  buttonText: {
    color: '#07E20D',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 24,
    textAlign: 'center'
  }
});
