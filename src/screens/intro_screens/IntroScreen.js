import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import DotCarousel from '../../components/DotCarousel';
import {INTRO_DATA} from './IntroData';
import IntroItem from './components/IntroItem';
import {AuthContext} from '../../context/auth_context/AuthContext';
import {useAuth} from '../../context/auth_context/useAuth';

const IntroScreen = () => {
  const [currentIndictorIndex, setIndicatorIndex] = React.useState(0);
  const {navigateHome} = useAuth();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#D35400'}}>
        <Carousel
          loop={false}
          pagingEnabled={true}
          width={width}
          height={height}
          // autoPlay={true}
          data={INTRO_DATA}
          scrollAnimationDuration={1000}
          //   onSnapToItem={index => setIndicatorIndex(index)}
          onProgressChange={(_, absoluteProgress) => {
            setIndicatorIndex(Math.round(absoluteProgress));
          }}
          renderItem={({item}) => (
            <IntroItem
              item={item}
              index={currentIndictorIndex}
              navigateHome={navigateHome}
            />
          )}
          //   style={{borderWidth: 2, borderColor: 'green'}}
        />
        <DotCarousel
          length={4}
          currentIndictorIndex={currentIndictorIndex}
          maxIndicators={4}
        />
      </View>
    </>
  );
};

export default IntroScreen;
