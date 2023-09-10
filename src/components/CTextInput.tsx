import {
  View,
  Text,
  TextStyle,
  StyleSheet,
  TextInput,
  StyleProp,
  TextInputProps,
} from 'react-native';
import React, {forwardRef} from 'react';
import colors from 'theme/colors';

export type CTextInputRef = TextInput;

const CTextInput = forwardRef<CTextInputRef, TextInputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      style={[styles.textInput, props.style]}
      autoCapitalize={'none'}
      placeholderTextColor={'rgba(0,0,0,0.5)'}
    />
  );
});

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    width: '90%',
    backgroundColor: '#ECF0F1',
    color: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
    position: 'absolute',
    top: 50,
    zIndex: 10,
    borderColor: colors.black,
    borderWidth: 1,
  },
});

export default CTextInput;
