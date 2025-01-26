import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';

export default function IndicatorParameters(props) {

  const [indicator, setIndicator] = useState(props.indicator ? props.indicator : '')
  const [period, setPeriod] = useState(14)
  const [parameter1, setParameter1] = useState('')
  const [parameter2, setParameter2] = useState('')
  const [parameter3, setParameter3] = useState('')
  const [parameter4, setParameter4] = useState('')
  const [buyPreffered, setBuyPreferred] = useState(true)
  const [triggersSell, setTriggersSell] = useState(false)
  const [onCrossing, setOnCrossing] = useState(false)

  const parameter1Input = useRef();
  const parameter2Input = useRef();
  const parameter3Input = useRef();
  const parameter4Input = useRef();

  useEffect(() => {
    setIndicator(props.indicator)
    setPeriod(14)
    setParameter1('')
    setParameter2('')
    setParameter3('')
    setParameter4('')
    setBuyPreferred(true)
    setTriggersSell(false)
    setOnCrossing(false)
  }, [props.indicator])

  const updatePeriod = (value) => {
    if (isNaN(value) && value !== "") {
      alert("Please enter a number for period")
    }
    else if (value <= 0 && value !== "")  {
      alert("Period must be greater than 0")
    }
    else if (value > 350) {
      alert("Max period is 350")
    }
    else {
      setPeriod(value)
      props.updateIndicator({indicator: indicator, period: value, parameter1: parameter1,
        parameter2: parameter2, parameter3: parameter3, parameter4: parameter4, 
        buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
      })
    }
    console.log(period)
  }

  const updateParameter1 = (value) => {
    if (isNaN(value) && value !== "" && indicator !== "bb") {
      alert("Please enter a number")
      return
    }
    else if (indicator === "rsi") {
      if ((value < 0 || value >= 100) && value !== '') {
        alert("RSI Low must be at least 0 and less than 100")
        return
      }
      else if (value.includes('.')) {
        alert("RSI Low must be an integer")
        return
      }
      else {
        setParameter1(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: value,
          parameter2: parameter2, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
    else if (indicator === 'macd') {
      if ((value < 2 || value >= 100) && value !== '') {
        alert("Long Period must be at least 2 and less than 100")
        return
      }
      else if (value.includes('.')) {
        alert("Long Period must be an integer")
        return
      }
      else {
        setParameter1(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: value,
          parameter2: parameter2, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
    else if (indicator === 'adx') {
      if ((value <= 0 || value >= 100) && value !== '') {
        alert("ADX Value must be greater than 0 and less than 100")
        return
      }
      else if (value.includes('.')) {
        alert("ADX Value must be an integer")
        return
      }
      else {
        setParameter1(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: value,
          parameter2: parameter2, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
    else if (indicator === 'bb') {
      if ((value <= 0 || value >= 10) && value !== '') {
        alert("Upper SD must be non-negative and no greater than 10")
        return
      }
      else {
        setParameter1(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: value,
          parameter2: parameter2, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
  }

  const updateParameter2 = (value) => {
    if (isNaN(value) && value !== "" && indicator !== "bb") {
      alert("Please enter a number")
      return
    }
    else if (indicator === "rsi") {
      if ((value <= 0 || value >= 100) && value !== '') {
        alert("RSI High must be greater than 0 and no more than 100")
      }
      else if (value.includes('.')) {
        alert("RSI High must be an integer")
      }
      else {
        setParameter2(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
          parameter2: value, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
    else if (indicator === "macd") {
      if ((value <= 0 || value >= 100) && value !== '') {
        alert("Signal Period must be greater than 0 and no more than 100")
      }
      else if (value.includes('.')) {
        alert("Signal Period must be an integer")
      }
      else {
        setParameter2(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
          parameter2: value, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
    else if (indicator === 'bb') {
      if ((value <= 0 || value >= 10) && value !== '') {
        alert("Lower SD must be non-negative and no greater than 10")
        return
      }
      else if (isNaN(value) && value !== '') {
        alert("Lower SD must be a number")
        return
      }
      else {
        setParameter2(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
          parameter2: value, parameter3: parameter3, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
  }

  const updateParameter3 = (value) => {
    if (isNaN(value) && value !== "" && indicator !== "bb") {
      alert("Please enter a number")
      return
    }
    else if (indicator === 'bb') {
      if ((value <= 0 || value >= 100) && value !== '') {
        alert("MA Type must be non-negative and less than 99")
        return
      }
      else if (value.includes('.')) {
        alert("MA Type must be an integer")
        return
      }
      else {
        setParameter3(value)
        props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
          parameter2: parameter2, parameter3: value, parameter4: parameter4,
          buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
        })
      }
    }
  }

  const updateParameter4 = (value) => {
    setParameter4(value)
    props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
      parameter2: parameter2, parameter3: parameter3, parameter4: value, 
      buyPreffered: buyPreffered, triggersSell: triggersSell, onCrossing: onCrossing
    })
  }

  const updateBuyPreffered = (value) => {
    setBuyPreferred(value)
    props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
      parameter2: parameter2, parameter3: parameter3, 
      parameter4: parameter4, buyPreffered: value,
      triggersSell: triggersSell, onCrossing: onCrossing
    })
  }

  const updateTriggerSell = (value) => {
    setTriggersSell(value)
    props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
      parameter2: parameter2, parameter3: parameter3, 
      parameter4: parameter4, buyPreffered: buyPreffered,
      triggersSell: value, onCrossing: onCrossing
    })
  }

  const updateOnCrossing = (value) => {
    setOnCrossing(value)
    props.updateIndicator({indicator: indicator, period: period, parameter1: parameter1,
      parameter2: parameter2, parameter3: parameter3, 
      parameter4: parameter4, buyPreffered: buyPreffered,
      triggersSell: triggersSell, onCrossing: value
    })
  }

  if (indicator == 'rsi') {
    return (
      <View>
        
        <Text style={styles.indicatorText}>**If you do not input parameters, they will default to parameters typically used for this indicator.**</Text>
        
        <View style={styles.rowContainer}>
          <TextInput 
            placeholder='Period'
            style={styles.parameter}
            onChangeText={updatePeriod}
            onSubmitEditing={() => parameter1Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='RSI Low'
            style={styles.parameter}
            onChangeText={updateParameter1}
            ref={parameter1Input}
            onSubmitEditing={() => parameter2Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='RSI High'
            style={styles.parameter}
            onChangeText={updateParameter2}
            ref={parameter2Input}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxPair}>
            <Text>Buy Low </Text>
            <Checkbox
              disabled={false}
              value={buyPreffered}
              onValueChange={updateBuyPreffered}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>Triggers Sell </Text>
            <Checkbox
              disabled={false}
              value={triggersSell}
              onValueChange={updateTriggerSell}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>On Crossing </Text>
            <Checkbox
              disabled={false}
              value={onCrossing}
              onValueChange={updateOnCrossing}
            />
          </View>
        </View>
      </View>
    )
  }
  else if (indicator == 'macd'){
    return (
      <View>
        
        <Text style={styles.indicatorText}>**If you do not input parameters, they will default to parameters typically used for this indicator.**</Text>

        <View style={styles.rowContainer}>
          <TextInput 
            placeholder='Short Period'
            style={styles.parameter}
            onChangeText={updatePeriod}
            onSubmitEditing={() => parameter1Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='Long Period'
            style={styles.parameter}
            onChangeText={updateParameter1}
            ref={parameter1Input}
            onSubmitEditing={() => parameter2Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='Signal Period'
            style={styles.parameter}
            onChangeText={updateParameter2}
            ref={parameter2Input}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxPair}>
            <Text>Buy Low </Text>
            <Checkbox
              disabled={false}
              value={buyPreffered}
              onValueChange={updateBuyPreffered}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>Triggers Sell </Text>
            <Checkbox
              disabled={false}
              value={triggersSell}
              onValueChange={updateTriggerSell}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>On Crossing </Text>
            <Checkbox
              disabled={false}
              value={onCrossing}
              onValueChange={updateOnCrossing}
            />
          </View>
        </View>
      </View>
    )
  }
  else if (indicator == 'ema'){
    return (
      <View>
        
        <Text style={styles.indicatorText}>**If you do not input parameters, they will default to parameters typically used for this indicator.**</Text>

        <View style={styles.rowContainer}>
          <TextInput 
            placeholder='Period'
            style={styles.parameter}
            onChangeText={updatePeriod}
            keyboardType={'number-pad'}
          />
          <View style={styles.checkboxPair}>
            <Text>Buy High </Text>
            <Checkbox
              disabled={false}
              value={buyPreffered}
              onValueChange={updateBuyPreffered}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxPair}>
            <Text>Triggers Sell </Text>
            <Checkbox
              disabled={false}
              value={triggersSell}
              onValueChange={updateTriggerSell}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>On Crossing </Text>
            <Checkbox
              disabled={false}
              value={onCrossing}
              onValueChange={updateOnCrossing}
            />
          </View>
        </View>
      </View>
    )
  }
  else if (indicator == 'bb'){
    return (
      <View>
        
        <Text style={styles.indicatorText}>**If you do not input parameters, they will default to parameters typically used for this indicator.**</Text>

        <View style={styles.rowContainer}>
          <TextInput 
            placeholder='Period'
            style={styles.parameter}
            onChangeText={updatePeriod}
            onSubmitEditing={() => parameter1Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='Upper SD'
            style={styles.parameter}
            onChangeText={updateParameter1}
            ref={parameter1Input}
            onSubmitEditing={() => parameter2Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            placeholder='Lower SD'
            style={styles.parameter}
            onChangeText={updateParameter2}
            ref={parameter2Input}
            onSubmitEditing={() => parameter3Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder='MA Type'
            style={styles.parameter}
            onChangeText={updateParameter3}
            ref={parameter3Input}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxPair}>
            <Text>Buy Low </Text>
            <Checkbox
              disabled={false}
              value={buyPreffered}
              onValueChange={updateBuyPreffered}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>Triggers Sell </Text>
            <Checkbox
              disabled={false}
              value={triggersSell}
              onValueChange={updateTriggerSell}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>On Crossing </Text>
            <Checkbox
              disabled={false}
              value={onCrossing}
              onValueChange={updateOnCrossing}
            />
          </View>
        </View>
      </View>
    )
  }
  else if (indicator == 'adx'){
    return (
      <View>
        
        <Text style={styles.indicatorText}>**If you do not input parameters, they will default to parameters typically used for this indicator.**</Text>

        <View style={styles.rowContainer}>
          <TextInput 
            placeholder='Period'
            style={styles.parameter}
            onChangeText={updatePeriod}
            onSubmitEditing={() => parameter1Input.current.focus()}
            blurOnSubmit={false}
            keyboardType={'number-pad'}
          />
          <TextInput 
            placeholder='Target Value'
            style={styles.parameter}
            onChangeText={updateParameter1}
            ref={parameter1Input}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxPair}>
            <Text>Buy High </Text>
            <Checkbox
              disabled={false}
              value={buyPreffered}
              onValueChange={updateBuyPreffered}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>Triggers Sell </Text>
            <Checkbox
              disabled={false}
              value={triggersSell}
              onValueChange={updateTriggerSell}
            />
          </View>
          <View style={styles.checkboxPair}>
            <Text>On Crossing </Text>
            <Checkbox
              disabled={false}
              value={onCrossing}
              onValueChange={updateOnCrossing}
            />
          </View>
        </View>
      </View>
    )
  }
  return (null);
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxPair: {
    padding: 4,
    flex: 1,
    flexDirection: 'row'
  },
  parameter: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'gray',
    padding: 4,
    borderRadius: 5,
    margin: 10
  },
  indicatorText: {
    backgroundColor: 'black',
    color: 'white',
    marginHorizontal: 5
  }
});