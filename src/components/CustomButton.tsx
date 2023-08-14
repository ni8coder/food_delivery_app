import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: {};
  titleStyle?: {};
};

const CustomButton = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.containerStyle]}>
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D35400',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFF',
  },
});

export default CustomButton;
