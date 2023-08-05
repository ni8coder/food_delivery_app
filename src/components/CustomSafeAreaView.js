import {View, Text} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomSafeAreaView = props => {
  const insets = useSafeAreaInsets();

  const insetStyle = {
    paddingTop: insets.top,
    paddingBottm: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    backgroundColor: '#E5E5E5',
  };

  return (
    <View {...props} style={[insetStyle, props.style]}>
      {props.children}
    </View>
  );
};

export default CustomSafeAreaView;
