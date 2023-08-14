import {View} from 'react-native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type CustomSafeAreaViewProps = {
  style: object;
  children: ReactNode | undefined;
};

const CustomSafeAreaView = (props: CustomSafeAreaViewProps) => {
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
