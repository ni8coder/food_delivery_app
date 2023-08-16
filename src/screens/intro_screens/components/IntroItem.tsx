import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IntroData} from '../IntroData';

interface IntroItemProps {
  item: IntroData;
  index: number;
  navigateHome: () => void;
}

const IntroItem = ({item, index, navigateHome}: IntroItemProps) => {
  const {image, title, subTitle, endBtn} = item;
  console.log('index', index);
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode="contain" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {endBtn === true && (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.getStartedBtn} onPress={navigateHome}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  textContainer: {
    width: '75%',
  },
  getStartedBtn: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 110,
  },
  btnText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
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
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
  },
});

export default React.memo(IntroItem);
