import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import CText from 'components/CText';
import {fontSize} from 'theme/fonts';
import {useTranslation} from 'react-i18next';

const LocaleScreen = () => {
  const {t} = useTranslation();
  return (
    <CustomSafeAreaView style={styles.container}>
      <CText style={{fontSize: fontSize.medium}}>{t('locale')}</CText>
      <CText style={{fontSize: fontSize.medium}}>
        {t('count', {count: 2})}
      </CText>
      <CText style={{fontSize: fontSize.medium}}>
        {t('intlNumber', {val: 1000})}
      </CText>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 0,
  },
});

export default LocaleScreen;
