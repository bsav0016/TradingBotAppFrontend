import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import IndicatorParameters from './indicatorParameters';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed'

export default function DropDownNew(props) {
  const [open, setOpen] = useState(props.open ? props.open : false);
  const [value, setValue] = useState(props.value ? props.value : '');
  const [items, setItems] = useState(props.items ? props.items : []);

  placeholder = props.placeholder ? props.placeholder : 'Select an item'

  const updateIndicator = (value) => {
    props.updateIndicator(value)
  }

  return (
    <View>
      <Dropdown
        label={placeholder}
        data={items}
        containerStyle={props.containerStyle ? props.containerStyle : 
          {justifyContent: 'center', width: Dimensions.get('window').width * 0.9 ?? 350}}
        style={props.style ? props.style : {}}
        onChangeText={ value => setValue(value) }
      />
      <IndicatorParameters
        indicator={value}
        updateIndicator={updateIndicator}
      />
    </View>
  );
}