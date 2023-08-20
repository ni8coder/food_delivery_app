import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {FeedPost, getFeedsFetch} from 'feature/feeds/feedSlice';
import ActivityLoader from 'components/ActivityLoader';
import colors from 'theme/colors';
import {fontSize} from 'theme/fonts';

const OrderScreen = ({navigation}) => {
  const uid = useRef(1);
  const dispatch = useAppDispatch();
  const feeds = useAppSelector(state => state.feeds.posts);
  const isFetching = useAppSelector(state => state.feeds.isLoading);

  const fetchPosts = useCallback(async () => {
    dispatch(getFeedsFetch(uid.current));
    uid.current = uid.current + 1;
  }, [dispatch, uid]);

  useEffect(() => {
    console.log('useeffect ran');
    fetchPosts();
  }, [fetchPosts]);

  const renderSeparatorComponent = () => (
    <View style={styles.separatorContainer} />
  );

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isFetching}
        onRefresh={fetchPosts}
        tintColor={colors.primary}
      />
    );
  };

  const renderItem = ({item}: {item: FeedPost}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <Button onPress={fetchPosts} title="Fetch Posts" />
      {feeds.length === 0 ? (
        <ActivityLoader />
      ) : (
        <FlatList
          data={feeds}
          keyExtractor={(_, idx) => idx.toString()}
          ItemSeparatorComponent={renderSeparatorComponent}
          refreshControl={renderRefreshControl()}
          renderItem={renderItem}
        />
      )}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'blud',
    borderRadius: 20,
  },
  separatorContainer: {height: 10},
  itemTitle: {
    fontSize: fontSize.medium,
  },
});

export default OrderScreen;
