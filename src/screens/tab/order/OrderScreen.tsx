import {View, Text, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, GET_POSTS} from '../../../constants/api_constants';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const OrderScreen = ({navigation}) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = async () => {
    setIsFetching(true);
    fetch(`${BASE_URL}${GET_POSTS}`, {})
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setIsFetching(false);
      })
      .catch(e => {
        console.log('error occured');
        console.log(e);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    // fetchPosts();
  }, []);

  return (
    <CustomSafeAreaView style={{flex: 1}}>
      <Button onPress={fetchPosts} title="Fetch Posts" />
      <FlatList
        refreshing={isFetching}
        onRefresh={fetchPosts}
        data={posts}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => {
          return (
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'blud',
                borderRadius: 20,
              }}>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </CustomSafeAreaView>
  );
};

export default OrderScreen;
