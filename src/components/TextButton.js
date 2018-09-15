import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function TextButton({buttonLabel, onPress, btnStyle={}, labelStyle={}}) {
  return (
    <View>
      <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
        <Text style={[styles.label, labelStyle]}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn : {
    marginRight:80,
    marginLeft:80,
    marginBottom: 10,
    padding:10,
    borderWidth:1,
    borderRadius: 10,
  },
  label: {
    textAlign: 'center'
  }

})