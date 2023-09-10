import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {fontFamily, fontSize} from 'theme/fonts';
import colors from 'theme/colors';

interface CTextProps {
  style?: StyleProp<TextStyle>;
  children: string;
}

const CText = ({style, children}: CTextProps) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.robotoRegular,
    fontSize: fontSize.normal,
    color: colors.black,
  },
});

export default CText;
