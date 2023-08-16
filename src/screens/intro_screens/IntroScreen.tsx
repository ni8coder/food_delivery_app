import * as React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import DotCarousel from '../../components/DotCarousel';
import {INTRO_DATA} from './IntroData';
import IntroItem from './components/IntroItem';
import {useAppDispatch} from '../../app/hooks';
import {introShown} from '../../feature/auth/authSlice';

const IntroScreen = () => {
  const [currentIndictorIndex, setIndicatorIndex] = React.useState(0);
  const dispatch = useAppDispatch();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const navigateHome = React.useCallback(() => {
    console.log('navigate home');
    dispatch(introShown());
  }, [dispatch]);

  console.log('IntroScreen render');

  return (
    <>
      <View style={styles.container}>
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

// const IntroScreen = () => {
//   const width = Dimensions.get('window').width;
//   return (
//     <View style={{flex: 1}}>
//       <Carousel
//         loop
//         width={width}
//         height={width / 2}
//         autoPlay={true}
//         data={[...new Array(6).keys()]}
//         scrollAnimationDuration={1000}
//         onSnapToItem={index => console.log('current index:', index)}
//         renderItem={({index}) => (
//           <View
//             style={{
//               flex: 1,
//               borderWidth: 1,
//               justifyContent: 'center',
//             }}>
//             <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D35400'},
});

export default IntroScreen;
