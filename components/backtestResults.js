import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Dimensions, SafeAreaView, ImageBackground} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-navigation';
import Dialog from 'react-native-dialog';
import Backtest from './backtest';


export default function BacktestResults(props) {

  const [backtests, setBacktests] = useState([])
  const [token, setToken] = useState(null)
  const [id, setId] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [botRunning, setBotRunning] = useState(false)
  const [email, setEmail] = useState('')
  const [itemNo, setItemNo] = useState(0);

  const [visible, setVisible] = useState(false)


  useEffect(() => {
    getData(true)
  }, [])

  const getData = async (first) => {
    setToken( await AsyncStorage.getItem('MR_token') );
    let id = await AsyncStorage.getItem('user_id');
    setId(id)
    if (id) {
        if (first) {
            setData(id)
        }
    } else {
        console.log("No token")
        props.navigation.navigate("Auth")
    }
  };

  const setData = (id) => {
    fetch(`http://192.168.1.230:8000/api/users/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => res.json())
    .then( res => {
        if (res.username === undefined) {
          alert("Couldn't get backtest info")
          props.navigation.navigate("Profile")
        }
        else {
          setUsername(res.username)
          setFirstName(res.first_name)
          setLastName(res.last_name)
          setBacktests(res.backtestRequests)
          setEmail(res.email)
          setBotRunning(res.bot_running)
        }
    })
    .catch( error => console.log(error))
  }

  const checkPassword = () => {
    fetch(`http://192.168.1.230:8000/api/authenticate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then( res => res.json())
    .then( res => {
        if (res.token) {
            deleteBacktest()
        }
        else {
            alert("Incorrect password")
        }
    })
    .catch( error => console.log(error))
    setVisible(false)
  }

  const deleteBacktest = () => {
    let newBacktests = []
    for(let i = 0; i < backtests.length; i++){
        if (!(backtests[i].id === itemNo)) {
            newBacktests.push(backtests[i])
        }
    }
    fetch(`http://192.168.1.230:8000/api/backtestrequests/${itemNo}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    .then( () => {
        setBacktests(newBacktests)
        getData(false)
    })
    .catch( error => console.log(error))
  }

  const passwordInput = (value) => {
    setPassword(value)
  }

  const showDialog = (item) => {
      setVisible(true)
      setItemNo(item.id)
  }

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
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Confirm with Password</Dialog.Title>
                    <Dialog.Description>
                    Please input your password to delete this backtest.
                    </Dialog.Description>
                    <Dialog.Input placeholder={"Password"} onChangeText={passwordInput}/>
                    <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
                    <Dialog.Button label="Confirm" onPress={() => checkPassword()} />
                </Dialog.Container>

                <FlatList


    data={backtests}
    renderItem={({item}) => (
        <TouchableOpacity onPress={() => showDialog(item)} style={{margin: 10, borderColor: 'white', borderWidth: 2, backgroundColor: '#000'}}>
            <View style={styles.rowContainer}>
                <Text style={styles.item}>ID: {item.id}</Text>
                <Text style={styles.item}>Coin: {item.coin}</Text>
                <Text style={styles.item}>Backtest Period: {item.backtestPeriod/365}yr(s)</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.item}>Candle Length: {item.candlePeriod}</Text>
                <Text style={styles.item}>Initial Investment: ${item.initialInvestment}</Text>
            </View>
            <View style={styles.rowContainer}>
                {item.totalGain >= 0 ? 
                <Text style={styles.item}>Bot Total Gain: ${Number(item.totalGain.toFixed(2))}  ({Number(item.botPercentReturn.toFixed(1))}%)</Text>
                :
                <Text style={styles.item}>Bot Total Gain: -${Number(item.totalGain.toFixed(2))*-1}  ({Number(item.botPercentReturn.toFixed(1))}%)</Text>}
            </View>
            <View style={styles.rowContainer}>
                {item.totalGain >= 0 ? 
                <Text style={styles.item}>Buy&Hold Total Gain: ${Number(item.buyAndHold.toFixed(2))}  ({Number(item.buyAndHoldPercentReturn.toFixed(1))}%)</Text>
                :
                <Text style={styles.item}>Buy&Hold Total Gain: -${Number(item.buyAndHold.toFixed(2))*-1}  ({Number(item.buyAndHoldPercentReturn.toFixed(1))}%)</Text>}
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.item}>Wins: {item.wins}</Text>
                <Text style={styles.item}>Losses: {item.losses}</Text>
            </View>

            <View style={{marginTop: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Parameters:</Text>
                </View>
            </View>

            {(item.useADX == "True") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>ADX:</Text>
                    <Text style={styles.item}>Period: {item.adxPeriod}</Text>
                    <Text style={styles.item}>ADX Value: {item.adxValue}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Buy High: {item.adxCrossingUp}</Text>
                    <Text style={styles.item}>Trig. Sell: {item.useAdxSell}</Text>
                    <Text style={styles.item}>On X'ing: {item.adxTriggersBuy}</Text>
                </View>
            </View>
            : <View/>}

            {(item.useBB === "True") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>BB:</Text>
                    <Text style={styles.item}>Period: {item.bbPeriod}</Text>
                    <Text style={styles.item}>MA Type: {item.bbMaType}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Upper SD: {item.bbUpperSD}</Text>
                    <Text style={styles.item}>Lower SD: {item.bbLowerSD}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Buy Low: {item.buyBBBelow}</Text>
                    <Text style={styles.item}>Trig. Sell: {item.useBBSell}</Text>
                    <Text style={styles.item}>On X'ing: {item.bbTriggersBuy}</Text>
                </View>
            </View>
            : <View/>}

            {(item.useEma === "True") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>EMA:</Text>
                    <Text style={styles.item}>Period: {item.emaPeriod}</Text>
                    <Text style={styles.item}>Buy Above EMA: {item.aboveEmaBuy}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Trig. Sell: {item.useEmaSell}</Text>
                    <Text style={styles.item}>On X'ing: {item.emaTriggersBuy}</Text>
                </View>
            </View>
            : <View/>}

            {(item.useMacd === "True") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>MACD:</Text>
                    <Text style={styles.item}>Short Period: {item.macdShortPeriod}</Text>
                    <Text style={styles.item}>Long Period: {item.macdLongPeriod}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Signal Period: {item.macdSignalPeriod}</Text>
                    <Text style={styles.item}>Buy Short Over Long: {item.macdShortCrossesLong}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Trig. Sell: {item.useMacdSell}</Text>
                    <Text style={styles.item}>On X'ing: {item.macdTriggersBuy}</Text>
                </View>
            </View>
            : <View/>}

            {(item.useRsi === "True") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>RSI:</Text>
                    <Text style={styles.item}>Period: {item.rsiPeriod}</Text>
                    {(item.rsiLow == '') ?
                        <Text style={styles.item}>RSI Low: (default)</Text> :
                        <Text style={styles.item}>RSI Low: {item.rsiLow}</Text>
                    }
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Buy Low: {item.rsiBuyLow}</Text>
                    <Text style={styles.item}>Trig. Sell: {item.useRsiSell}</Text>
                    <Text style={styles.item}>On X'ing: {item.rsiTriggersBuy}</Text>
                </View>
            </View>
            :<View/>
            }

            {(item.stopLoss !== "") ?
            <View style={{marginVertical: 10}}>
                <View style={styles.rowContainer}>
                    <Text style={styles.item}>Stop Loss: {item.stopLoss}%</Text>
                    {(item.takeProfit !== "") ?
                    <Text style={styles.item}>Take Profit: {item.takeProfit}</Text>
                    :<Text/>}
                </View>
            </View>
            :<View/>}
            

        </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}


                />
            </View>
        </ImageBackground>
    </SafeAreaView>
  );
}

BacktestResults.navigationOptions = screenProps => ({
  title: "Backtest Results",
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
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    justifyContent: 'space-around',
    width: Dimensions.get('window').width-20
  },
  item: {
      color: 'white',
      fontSize: 15
  }
});