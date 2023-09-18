import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import React, {forwardRef, memo, useEffect, useState} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import colors from 'theme/colors';
import {fontSize} from 'theme/fonts';
import CText from 'components/CText';
import {useAppSelector} from 'app/hooks';
import {Message} from 'feature/message/messageSlice';

type PlaceDetail = {
  author: string;
  userName: string;
  userId: string;
};

type MessageListProps = {
  messages: Message[];
};

const MessageList = forwardRef<ActionSheetRef, MessageListProps>(
  (props, ref) => {
    const [placeDetail, setPlaceDetail] = useState<PlaceDetail[]>([]);
    const authUser = useAppSelector(state => state.auth.user);
    const userPositionData = useAppSelector(state => state.places.userPosition);
    // console.log('message list rendered');

    useEffect(() => {
      if (userPositionData) {
        let placeDetailsData = userPositionData.map(data => ({
          userId: data.userId,
          userName: data.userName,
          author: data.author,
        }));

        setPlaceDetail(placeDetailsData);
      }
    }, [userPositionData]);

    const getPublisherName = (userId: string) => {
      const author = placeDetail.filter(place => place.userId === userId)[0]
        ?.author;

      return author ? author : 'unknown';
    };

    const chatBoxAlign = (publisher: string) => {
      return authUser?.uid === publisher ? 'flex-end' : 'flex-start';
    };

    return (
      <ActionSheet containerStyle={styles.actionSheet} ref={ref}>
        <FlatList
          data={props.messages}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  styles.chatContainer,
                  {alignItems: chatBoxAlign(item.publisher)},
                ]}>
                <View
                  style={[
                    styles.chatTextBox,
                    {alignItems: chatBoxAlign(item.publisher)},
                  ]}>
                  <CText style={[styles.publisher]}>
                    {getPublisherName(item.publisher)}
                  </CText>
                  <CText>{item.message}</CText>
                </View>
              </View>
            );
          }}
        />
      </ActionSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  userAvatarContainer: {
    position: 'absolute',
    top: 70,
    right: 10,
    flex: 1,
    gap: 10,
  },
  actionSheet: {
    height: Dimensions.get('screen').height / 2,
    padding: 10,
    backgroundColor: colors.app.background,
  },
  chatContainer: {
    paddingVertical: 5,
    // alignItems: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  publisher: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
  chatTextBox: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default memo(MessageList);
