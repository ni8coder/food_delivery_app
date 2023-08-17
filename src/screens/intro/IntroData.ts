import ChickenLeg from '@assets/images/initial_carousel/chicken_leg.png';
import Shipped from '@assets/images/initial_carousel/shipped.png';
import Group from '@assets/images/initial_carousel/group.png';
import CreditCard from '@assets/images/initial_carousel/credit_card.png';
import {ImageSourcePropType} from 'react-native';

export type IntroData = {
  image: ImageSourcePropType;
  title: string;
  subTitle: string;
  endBtn?: boolean;
};

export const INTRO_DATA: IntroData[] = [
  {
    image: ChickenLeg,
    title: 'Delicious Food',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    image: Shipped,
    title: 'Fast Shipping',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum rhoncus nulla.',
  },
  {
    image: Group,
    title: 'Certificate Food',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies mauris a id.',
  },
  {
    image: CreditCard,
    title: 'Payment Online',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui ultricies sit massa.',
    endBtn: true,
  },
];
