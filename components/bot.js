import { StyleSheet, Text, View, TextInput, Dimensions, Button, 
  SafeAreaView, ScrollView, Alert, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import DropDownNew from './dropDowns/dropDown';
import CoinDropDown from './dropDowns/coinDropDown';
import CandlePeriodDropDown from './dropDowns/candlePeriodDropDown';
import TimelineDropDown from './dropDowns/timelineDropDown';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';

export default function Bot() {

const [candlePeriod, setCandlePeriod] = useState('')
const [coin, setCoin] = useState('')
const [initialInvestment, setInitialInvestment] = useState('')
const [indicator1, setIndicator1] = useState({})
const [indicator2, setIndicator2] = useState({})
const [indicator3, setIndicator3] = useState({})
const [useStopLoss, setUseStopLoss] = useState(false)
const [stopLoss, setStopLoss] = useState('')
const [useTakeProfit, setUseTakeProfit] = useState(false)
const [takeProfit, setTakeProfit] = useState('')
const [requestStart, setRequestStart] = useState(false)

const [secretKey, setSecretKey] = useState('')
const [visible, setVisible] = useState(false)

let token = null;

const getData = async () => {
  token = await AsyncStorage.getItem('MR_token');
  if (token) {
  } else {
      console.log("No token")
      props.navigation.navigate("Auth")
  }
};

useEffect(() => {
    getData()
}, [])

const updateCoin = (value) => {
    setCoin(value)
}

const updateCandlePeriod = (value) => {
    setCandlePeriod(value)
}

const checkInputs = () => {
  if (!checkInitialInvestment(initialInvestment)) {
    //handled in above function
  }
  else if (!updateStopLoss(stopLoss)) {
    //handled in above function
  }
  else if (!updateTakeProfit(takeProfit)) {
    //handled in above function
  }
  else {
      requestSecretKey()
  }
}

const requestSecretKey = async () => {
  if (token === null) {
    token = await AsyncStorage.getItem('MR_token');
  }
  let canSell = validateSelling(useStopLoss, stopLoss, useTakeProfit, takeProfit, indicator1,
      indicator2, indicator3)
  let continueFunction = presentSellAlert(canSell)
  if (!continueFunction) {
      return ''
  }
  let multipleOnCrossing = checkOnCrossings(indicator1, indicator2, indicator3)
  if (multipleOnCrossing) {
      multipleOnCrossingWarning()
  }
  else {
      setVisible(true)
  }
}

const pressedSecretKey = (value) => {
  setSecretKey(value)
  try {
    let basicInfo = getBasicInfo(candlePeriod, coin, initialInvestment, stopLoss, takeProfit)
    let indicator1Object = getIndicatorInfo(indicator1)
    let indicator2Object = getIndicatorInfo(indicator2)
    let indicator3Object = getIndicatorInfo(indicator3)
    let data = {...basicInfo, ...indicator1Object, ...indicator2Object, ...indicator3Object}
    startBot(data)
  } catch (error) {
    alert(error)
    alert("There was an error starting the bot. Please check your parameters and try again.")
  }
}

function getBasicInfo(candlePeriod, coin, initialInvestment, stopLoss,
  takeProfit) {
  return {
      candlePeriod: candlePeriod,
      coin: coin,
      initialInvestment: initialInvestment,
      stopLoss: stopLoss,
      takeProfit: takeProfit
  }
}

const startBot = (data) => {
  console.log(data)
}

const deleteBacktest = () => {
    var itemNo = 0
    //Need to get itemNo
    fetch(`http://192.168.1.230:8000/api/botrequests/${itemNo}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    .then( () => {
        getData()
        //Need to transition back to display for creating new bot
    })
    .catch( error => console.log(error))
  }

const multipleOnCrossingWarning = () => {
  Alert.alert("Are you sure?", "Your bot will run, but since you selected multiple indicators" +
  " for 'On Crossing', you will have minimal to no trades. Do you want to continue with this bot?",
    [
      {
      text: "Yes",
      onPress: () => {setVisible(true)},
      style: 'default'
      },
      {
        text: "No",
        onPress: () => console.log("Cancelled"),
        style: 'cancel'
      }
    ]
  )
}
  
const checkInitialInvestment = (value) => {
  if (isNaN(value) && value !== "") {
      alert("Please enter a number")
  }
  else if ((value <= 0 || value >= 1000000000) && value !== "")  {
      alert("Period must be greater than 0 and less than 1,000,000,000. Additional digits will be cut off")   
  }
  else {
      setInitialInvestment(value)
  }
}

const updateIndicator1 = (value) => {
    setIndicator1(value)
}

const updateIndicator2 = (value) => {
    setIndicator2(value)
}

const updateIndicator3 = (value) => {
  setIndicator3(value)
}

const updateStopLoss = (value) => {
    if (value !== '' && (isNaN(value) || value >= 100 || value < 0)) {
        alert("Stop loss must be a non-negative number less than 100")
    }
    else {
        setStopLoss(value)
    }
}

const updateTakeProfit = (value) => {
  if (value !== '' && (isNaN(value) || value >= 100 || value < 0)) {
      alert("Stop loss must be a non-negative number less than 100")
  }
  else {
      setTakeProfit(value)
  }
}

const image = require('../assets/background.jpeg')

return (
  <SafeAreaView style={styles.container}>
      <ImageBackground 
      source={image} 
      style={{height: null, 
      width: Dimensions.get('window').width, 
      resizeMode: 'cover', 
      overflow: 'hidden', 
      flex: 1}}>
        <ScrollView>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Input Secret Key</Dialog.Title>
            <Dialog.Description>
              Please get your secret key from Binance and paste it here. See the instructions page if you
              don't know how to do this.
            </Dialog.Description>
            <Dialog.Input placeholder={"Secret Key"}/>
            <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
            <Dialog.Button label="Confirm" onPress={pressedSecretKey} />
          </Dialog.Container>


          <View style={styles.rowContainer}>
              <CoinDropDown 
                  items={[{label: 'ETH', value: 'ETH'}, {label: 'BTC', value: 'BTC'},
                          {label: 'LTC', value: 'LTC'}]} 
                  placeholder={"Choose coin"}
                  updateCoin={updateCoin}
              />

              <CandlePeriodDropDown
                  items={[{label: '1-Hour', value: '1h'}, {label: '5-Minute', value: '5m'},
                          {label: '15-Minute', value: '15m'}]} 
                  placeholder={"Candle Period"}
                  updateCandlePeriod={updateCandlePeriod}
              />
          </View>

          <View style={styles.rowContainer}>
              <TextInput
                  placeholder='Initial Investment ($)'
                  placeholderTextColor='#63666A'
                  style={styles.parameter}
                  onChangeText={checkInitialInvestment}
                  keyboardType={'number-pad'}
              />
          </View>
          
          <DropDownNew 
              items={[{label: 'RSI', value: 'rsi'}, {label: 'Bollinger Bands', value: 'bb'},
                      {label: 'ADX', value: 'adx'}, {label: 'MACD', value: 'macd'},
                      {label: 'EMA', value: 'ema'}, {label: 'None', value: 'none'}]} 
              placeholder={"Choose an indicator"}
              updateIndicator={updateIndicator1}
              containerStyle={styles.indicatorContainerStyle}
          /> 

          <DropDownNew 
              items={[{label: 'RSI', value: 'rsi'}, {label: 'Bollinger Bands', value: 'bb'},
                      {label: 'ADX', value: 'adx'}, {label: 'MACD', value: 'macd'},
                      {label: 'EMA', value: 'ema'}, {label: 'None', value: 'none'}]} 
              placeholder={"Choose an indicator"}
              updateIndicator={updateIndicator2}
              containerStyle={styles.indicatorContainerStyle}
          /> 

          <DropDownNew 
              items={[{label: 'RSI', value: 'rsi'}, {label: 'Bollinger Bands', value: 'bb'},
                      {label: 'ADX', value: 'adx'}, {label: 'MACD', value: 'macd'},
                      {label: 'EMA', value: 'ema'}, {label: 'None', value: 'none'}]} 
              placeholder={"Choose an indicator"}
              updateIndicator={updateIndicator3}
              containerStyle={styles.indicatorContainerStyle}
          />

          <View style={styles.rowContainer}>
              <Text style={styles.label}>Use Stop Loss?  </Text>

              <Checkbox
                  disabled={false}
                  value={useStopLoss}
                  onValueChange={(value) => setUseStopLoss(value)}
                  style={{backgroundColor: '#fff'}}
              />

              <TextInput
                  placeholder='Percent'
                  placeholderTextColor='#63666A'
                  style={styles.parameter}
                  onChangeText={updateStopLoss}
                  keyboardType={'number-pad'}
              />
          </View>

          <View style={styles.rowContainer}>
              <Text style={styles.label}>Use Take Profit?  </Text>

              <Checkbox
                  disabled={false}
                  value={useTakeProfit}
                  onValueChange={(value) => setUseTakeProfit(value)}
                  style={{backgroundColor: '#fff'}}
              />

              <TextInput
                  placeholder='Percent'
                  placeholderTextColor='#63666A'
                  style={styles.parameter}
                  onChangeText={updateTakeProfit}
                  keyboardType={'number-pad'}
              />
          </View>

          <Button onPress={requestSecretKey} title={"Start Bot!"}/>

      </ScrollView>
      </ImageBackground>
  </SafeAreaView>
);
}

Bot.navigationOptions = screenProps => ({
  title: "Creating Bot",
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
  alignItems: 'center',
  justifyContent: 'center',
},
rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
indicatorContainerStyle: {
    flex: 1,
    margin: 10,
    alignContent: 'center',
},
parameter: {
  borderWidth: 2,
  borderColor: '#63666A',
  backgroundColor: '#fff',
  color: '#000',
  paddingHorizontal: 8,
  paddingVertical: 15,
  borderRadius: 5,
  margin: 10,
  width: Dimensions.get('window').width * 0.43 ?? 175
},
result: {
  fontSize: 18,
  marginHorizontal: 5,
  color: '#fff',
  backgroundColor: '#000'
},
label: {
    color: '#fff'
},
otherDropDown: {
    itemColor: '#fff',
    margin: 5
}
});

function getIndicatorInfo(indicator) {
  if (indicator['indicator'] == 'rsi') {
      return {
          useRsi: 'True',
          rsiPeriod: indicator['period'],
          rsiLow: `${indicator['parameter1']}`,
          rsiHigh: indicator['parameter2'],
          rsiBuyLow: indicator['buyPreffered'],
          useRsiSell: indicator['triggersSell'],
          rsiTriggersBuy: indicator['onCrossing']
      }
  }
  else if (indicator['indicator'] == 'ema') {
      return {
          useEma: 'True',
          emaPeriod: indicator['period'],
          aboveEmaBuy: indicator['buyPreffered'],
          useEmaSell: indicator['triggersSell'],
          emaTriggersBuy: indicator['onCrossing']
      }
  }
  else if (indicator['indicator'] == 'macd') {
      return {
          useMacd: 'True', 
          macdShortPeriod: indicator['period'],
          macdLongPeriod: indicator['parameter1'], 
          macdSignalPeriod: indicator['parameter2'], 
          macdShortCrossesLong: indicator['buyPreffered'], 
          useMacdSell: indicator['triggersSell'],
          macdTriggersBuy: indicator['onCrossing']
      }
  }
  else if (indicator['indicator'] == 'adx') {
      return {
          useADX: 'True',
          adxPeriod: indicator['period'], 
          adxValue: indicator['parameter1'],
          adxCrossingUp: indicator['buyPreffered'], 
          useAdxSell: indicator['triggersSell'],
          adxTriggersBuy: indicator['onCrossing'],
      }
  }
  else if (indicator['indicator'] == 'bb') {
      return {
          useBB: 'True',
          bbPeriod: indicator['period'], 
          bbUpperSD: indicator['parameter1'],
          bbLowerSD: indicator['parameter2'], 
          bbMaType: indicator['parameter3'],
          buyBBbelow: indicator['buyPreffered'], 
          useBBSell: indicator['triggersSell'], 
          bbTriggersBuy: indicator['onCrossing']
      }
  }
}

function checkOnCrossings(indicator1, indicator2, indicator3){
  let usedIndicator1 = (indicator1['onCrossing'] === 'True' || 
                      indicator1['onCrossing'] === 'true' ||
                      indicator1['onCrossing'] === true)
  let usedIndicator2 = (indicator2['onCrossing'] === 'True' ||
                      indicator2['onCrossing'] === 'true' ||
                      indicator2['onCrossing'] === true)
  let usedIndicator3 = (indicator3['onCrossing'] === 'True' ||
                      indicator3['onCrossing'] === 'true' ||
                      indicator3['onCrossing'] === true)

  if ((usedIndicator1 && usedIndicator2) || (usedIndicator1 && usedIndicator3) || (usedIndicator2 && usedIndicator3)){
      return true
  }
  else {
      return false
  }
}

function validateSelling(useStopLoss, stopLoss, useTakeProfit, takeProfit, indicator1, indicator2,
  indicator3){
  let usedStopLoss = (stopLoss !== "" && useStopLoss && stopLoss > 0)
  let usedTakeProfit = (takeProfit !== "" && useTakeProfit && takeProfit > 0)
  let usedIndicator1 = (indicator1['triggersSell'] === 'True' || 
                      indicator1['triggersSell'] === 'true' ||
                      indicator1['triggersSell'] === true)
  let usedIndicator2 = (indicator2['triggersSell'] === 'True' ||
                      indicator2['triggersSell'] === 'true' ||
                      indicator2['triggersSell'] === true)
  let usedIndicator3 = (indicator3['triggersSell'] === 'True' ||
                      indicator3['triggersSell'] === 'true' ||
                      indicator3['triggersSell'] === true)

  if (usedStopLoss && usedTakeProfit) {
      if (usedIndicator1 || usedIndicator2 || usedIndicator3) {
          return 'sltpmore'
      }
      else {
          return 'sltp'
      }
  }
  else if (usedIndicator1) {
      if (usedIndicator2 || usedIndicator3) {
          return 'mutlipleindicators'
      }
      else {
          return 'sltp'
      }
  }
  else if (usedIndicator2) {
      if (usedIndicator3) {
          return 'multipleindicators'
      }
      else {
          return 'sltp'
      }
  }
  else if (usedIndicator3) {
      return 'sltp'
  }
  else {
      return 'none'
  }
}

function presentSellAlert(canSell) {
  if (canSell === 'sltp') {
      return true
  }
  else if (canSell === 'none') {
      alert('You need to provide how the bot will determine sell criteria.' +
          'This can be accomplished using any of the following:\n' +
          '-Use both "Stop Loss" and "Take Profit"\n' +
          '-Select "Triggers Sell" for any indicator\n' +
          '-Use "Triggers Sell" for any indicator and combine it with "Stop Loss"')
      return false
  }
  else if (canSell === 'sltpmore') {
      alert('You used Stop Loss, Take Profit, and at least one indicator for' +
      ' sell criteria. Using both Stop Loss and Take Profit overrides any' +
      ' indicator sell trigger. The bot will still run with this override.')
      return true
  }
  else if (canSell === 'mutlipleindicators') {
      alert('Mutliple indicators were selected to trigger sell.' +
      ' Only one can be used and will override the others according' +
      ' to the following priority list: RSI, MACD, EMA, BB, then ADX.' +
      ' The bot will still run with this override.')
      return true
  }
  else {
      return false
  }
}