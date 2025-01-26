import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default function Instructions(props) {

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
      
          <TouchableOpacity onPress={() => props.navigation.navigate("BacktestInstructions")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Backtest Instructions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("BotInstructions")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Bot Instructions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("HowItWorks")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>How It Works</Text>
            </View>
          </TouchableOpacity>
      
        </View>
    </ImageBackground>
  </SafeAreaView>
    
  );
}

Instructions.navigationOptions = screenProps => ({
  title: "Instructions",
  headerStyle: {
      backgroundColor: '#07E20D'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000'
  }
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
