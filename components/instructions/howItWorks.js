import { StyleSheet, Text, View, ImageBackground, Dimensions, SafeAreaView, 
    Linking, ScrollView } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HowItWorks() {

  const image = require('../../assets/background.jpeg')

  const openRsi = () => {
      Linking.openURL('https://www.investopedia.com/terms/r/rsi.asp')
      .catch(err => alert("Error opening website"))
  }

  const openMacd = () => {
    Linking.openURL('https://www.investopedia.com/terms/m/macd.asp')
    .catch(err => alert("Error opening website"))
  }

  const openAdx = () => {
    Linking.openURL('https://www.investopedia.com/articles/trading/07/adx-trend-indicator.asp')
    .catch(err => alert("Error opening website"))
  }

  const openEma = () => {
    Linking.openURL('https://www.investopedia.com/ask/answers/122314/how-do-i-use-exponential-moving-average-ema-create-forex-trading-strategy.asp')
    .catch(err => alert("Error opening website"))
  }

  const openBb = () => {
    Linking.openURL('https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/bollinger-bands')
    .catch(err => alert("Error opening website"))
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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headerText}>Why Use A Bot?</Text>
                <Text style={styles.bodyText}>Bots can make trading simple. Once it starts running,
                you don't need to do anything besides stop it when you desire. This app uses a strategy
                known as quantitative trading, which means it's entirely historically and numerically
                based strategies. Instead of sitting in front of a computer waiting for certain indicators
                to give a signal, the bot will recognize that for you and initiate the trade. A "good" bot
                will almost always reduce losses and still get most of the gains. For example, if the coin
                has a 5% increase, the bot may increase by only 3%, but if the coin drops by 5%, the bot
                may only lose 1 or 2%.</Text>
                <Text style={styles.headerText}>Considerations</Text>
                <Text style={styles.bodyText}>Please do some research before you start trading. These
                bots can be extremely powerful, but also can also cause an extreme deficit if not used
                properly. My desire is for these bots to provide a more stable path for growth in the 
                volatile crypto market, but I wil be up front that I will not take responsibility if
                your bot does not succeed. These are just a few considerations of many when it comes 
                to bots. First, just because something worked the past 1, 2, or 3 years, doesn't mean
                it will work in the coming year. In fact, many professionals change their strategies
                every few months or years. Generally try not to go too far back when backtesting. This
                being said, be careful with "optimizing". If you pick a strategy and choose to optimize
                it to the point where it works, this means it may not work in the future. Instead,
                consider trying a significantly different strategy. Also, keep in mind that a strategy
                that works on one coin, may not necessarily work on another because they trend differently.
                Again, there are many more considerations, but this isn't a research paper. Do your
                research, and good luck finding a successful strategy.
                </Text>
                <Text style={styles.headerText}>Indicators</Text>
                <Text style={styles.bodyText}>Below is a list of the indicators used in this app. I am
                not endorsing them, and do not have any affiliation with them whatsoever. I simply have
                found them helpful and informational in conducting my own research. Again, keep in mind
                that this is only a small sampling of indicators, and I will try to add more, but being
                only a single individual, you will need to be patient.
                </Text>
                <TouchableOpacity onPress={() => openRsi()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>RSI</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openAdx()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>ADX</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEma()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>EMA</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openMacd()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>MACD</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openBb()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Bollinger Bands</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

HowItWorks.navigationOptions = screenProps => ({
  title: "How It Works",
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
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    margin: 5,
    borderColor: 'white',
    borderWidth: 3,
    width: Dimensions.get('window').width - 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 22,
    textAlign: 'center'
  }
});