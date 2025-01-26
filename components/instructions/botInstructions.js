import { StyleSheet, Text, View, ImageBackground, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BotInstructions() {

  const image = require('../../assets/background.jpeg')

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
          <Text style={styles.headerText}>Required Parameters</Text>
          <Text style={styles.bodyText}>You must select a coin, a backtest period, candle length, and
          set an initial investment. Please understand that these calculations take a significant
          amount of computing power and, depending on the variables you select, can take a few minutes.
          A longer backtest period (i.e. 10 years) and shorter candle period (i.e. 5 minutes) will cause
          the run time to be longer, and vice versa.</Text>
          <Text style={styles.headerText}>Buy Low/High</Text>
          <Text style={styles.bodyText}>You've probably heard of the concept of buy low, sell high.
          This parameter does not refer to the price of the coin, but rather the value of the indicator.
          In leading indicators, such as momentum indicators (i.e. RSI), it is generally accepted to buy
          at low values. Meanwhile, for lagging indicators, like a trend indicator (i.e. EMA) or trend 
          strength indicator (i.e. ADX), it is generally accepted that you are better off buying high 
          to go with the trend. For the indicators in this app, they will always be set to the default
          "preferred" option.</Text>
          <Text style={styles.headerText}>Triggers Sell</Text>
          <Text style={styles.bodyText}>This parameter identifies which indicator will determine when
          to sell. Note that your options for selling are either 1 indicator, 1 indicator and stop loss,
          1 indicator and stop loss and take profit, or just stop loss and take profit. If you try to do
          anything else, you will receive a warning in the backtest. Note that the trigger on indicators
          looks for the opposite of a sell signal. For example, if you're buying when RSI goes below the
          low level, you'll be buying when it goes above the high level. There are some exceptions, such
          as in ADX, a trend strength indicator, which gives the same buy and sell signal because all
          it does is show trend strength and not trend direction.</Text>
          <Text style={styles.headerText}>On Crossing</Text>
          <Text style={styles.bodyText}>This parameter is a little more confusing and probably not
          found on many other platforms. The idea of "On Crossing" is that buy and sell signals are
          only given when the value crosses another given parameter. For example, if you want to buy
          at a low RSI, say 30, then your buy signal will be given once the RSI goes from less than
          30 to greater than 30. This can be useful because say in a serious downtrend, the RSI will
          go below 30 and you'll have bought, but it stays below 30 for a significant period of time
          and you continue to lose money. Instead, try to determine when this downtrend is reversing
          and buy when the RSI crosses back above the low 30 level. I recommend against selecting
          this parameter for multiple indicators at once since this "cross" needs to happen on the 
          exact same candle to trigger a buy, but maybe you'll find a way to make it work.</Text>
          <Text style={styles.headerText}>Other</Text>
          <Text style={styles.bodyText}>Once you click the "Calculate" button, let the backtest run. If
          you try to immediately start another backtest, it is not programmed to run simultaneously, but
          will run after the first one is complete. If you need to stop a backtest, your best bet is to
          fully close out of the app. Otherwise, you can also select "Calculate" for several backtests,
          let them all run, and then go into your "Account" and see the results later on. Stop loss,
          and take profit must be entered as percentages. Ensure you select the checkbox next to
          them if you'd like them to be used in your backtest.</Text>
        </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

BotInstructions.navigationOptions = screenProps => ({
  title: "Bot Instructions",
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