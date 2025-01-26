import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import IndicatorParameters from './indicatorParameters';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed'

export default function TimelineDropDown(props) {
  const [open, setOpen] = useState(props.open ? props.open : false);
  const [value, setValue] = useState(props.value ? props.value : '');
  const [items, setItems] = useState(props.items ? props.items : []);

  placeholder = props.placeholder ? props.placeholder : 'Select an item'

  const updateBacktestPeriod = (value) => {
    setValue(value)
    props.updateBacktestPeriod(value)
  }

  return (
      <Dropdown
        label={placeholder}
        data={items}
        containerStyle={props.style ? props.style : 
          {justifyContent: 'center', flex: 1}}
        style={{color: '#fff', margin: 10}}
        onChangeText={updateBacktestPeriod}
      />
  );
}