import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const IntroItem = ({item}) => {
  const {image, title, subTitle} = item;
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode="contain" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '75%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 25,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15,
    color: '#FFF',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFF',
  },
});

export default IntroItem;
