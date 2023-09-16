import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import CustomSafeAreaView from '@components/CustomSafeAreaView';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CoffeeCup from '@assets/images/home/coffee-cup.svg';
import PotatoChips from '@assets/images/home/potato-chips.svg';
import CakePiece from '@assets/images/home/cake-piece.svg';
import Group1 from '@assets/images/home/Group-1.png';
import Group2 from '@assets/images/home/Group-2.png';
import Group3 from '@assets/images/home/Group-3.png';
import Group4 from '@assets/images/home/Group-4.png';
import Food from '@assets/images/home/food-image.png';
import Star from '@assets/images/home/star.png';
import {SvgProps} from 'react-native-svg';
import NewModuleButton from 'controls/NewModuleButton';
import {useTranslation} from 'react-i18next';

const SNACKS = [
  {SVGImage: CoffeeCup, title: 'Drink'},
  {SVGImage: PotatoChips, title: 'Food'},
  {SVGImage: CakePiece, title: 'Cake'},
  {SVGImage: CoffeeCup, title: 'Snack'},
  {SVGImage: PotatoChips, title: 'Food'},
  {SVGImage: CakePiece, title: 'Cake'},
];

type SnackItemProps = {
  SVGImage: React.FC<SvgProps>;
  title: string;
};
const SnackItem = (props: SnackItemProps) => {
  const {SVGImage, title} = props;
  return (
    <View style={styles.itemView}>
      <View style={styles.itemImageView}>
        {/* <CoffeeCup width="30" height="30" /> */}
        <SVGImage width={30} height={30} />
      </View>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
};

const NEARME_DATA = [{}, {}, {}, {}, {}, {}];

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();

  const RenderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', gap: 15}}>
        <View>
          <Image source={Food} style={{width: 120, height: 120}} />
        </View>
        <View style={{gap: 10}}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
            Dapur Ijah Restaurant
          </Text>
          <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
            13 th Street, 46 W 12th St, NY
          </Text>
          <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
            3 min - 1.1 km
          </Text>
          <Image source={Star} style={{width: 60, height: 10}} />
        </View>
      </View>
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      {/* <NewModuleButton /> */}
      {/* <TouchableOpacity
        style={{paddingVertical: 10}}
        onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={25} color="rgba(0,0,0,0.5)" />
      </TouchableOpacity> */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.searchView}>
          <EvilIcon name="search" size={20} color="rgba(0,0,0,0.5)" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.itemViewScroll}
            showsHorizontalScrollIndicator={false}>
            {SNACKS.map((item, idx) => (
              <SnackItem
                key={idx.toString()}
                SVGImage={item.SVGImage}
                title={item.title}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.foodMenuView}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18}}>
            {/* Food Menu */}
            {t('Drink')}
          </Text>
          <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
            View all
          </Text>
        </View>

        <View style={{gap: 15}}>
          <ScrollView
            horizontal
            contentContainerStyle={{gap: 15}}
            showsHorizontalScrollIndicator={false}>
            <Image source={Group1} style={{width: 130, height: 130}} />
            <Image source={Group2} style={{width: 130, height: 130}} />
            <Image source={Group4} style={{width: 130, height: 130}} />
            <Image source={Group1} style={{width: 130, height: 130}} />
          </ScrollView>
          <ScrollView
            horizontal
            contentContainerStyle={{gap: 15}}
            showsHorizontalScrollIndicator={false}>
            <Image source={Group3} style={{width: 130, height: 130}} />
            <Image source={Group4} style={{width: 130, height: 130}} />
            <Image source={Group1} style={{width: 130, height: 130}} />
            <Image source={Group2} style={{width: 130, height: 130}} />
          </ScrollView>
        </View>

        <View style={styles.foodMenuView}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18}}>
            Near Me
          </Text>
          <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
            View all
          </Text>
        </View>

        <View style={{gap: 15}}>
          {NEARME_DATA.map((item, idx) => (
            <RenderItem key={idx.toString()} item={item} />
          ))}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'red',
    paddingLeft: 12,
    paddingRight: 12,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'red',
    // flex: 1,
    gap: 20,
  },
  searchView: {
    backgroundColor: '#ECF0F1',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  searchInput: {
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
  itemImageView: {
    backgroundColor: '#ECF0F1',
    // backgroundColor: '#D35400',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  itemText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  itemViewScroll: {
    gap: 30,
    // borderWidth: 2,
    // borderColor: 'red',
    // flex: 1,
    // height: 74,
  },
  foodMenuView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
  },
});

export default HomeScreen;
