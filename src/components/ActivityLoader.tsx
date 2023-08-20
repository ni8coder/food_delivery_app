import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import colors from 'theme/colors';

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivityLoader;
