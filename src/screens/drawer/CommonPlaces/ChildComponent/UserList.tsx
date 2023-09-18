import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import CText from 'components/CText';
import colors from 'theme/colors';
import {fontFamily} from 'theme/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAppSelector} from 'app/hooks';
import {ITC} from 'config/constants/app_constants';

type UserAvatarsType = {
  animateToRegion: (userId: string) => void;
  showMessageList: (userId: string) => void;
};

const UserList = (props: UserAvatarsType) => {
  const userPositionData = useAppSelector(state => state.places.userPosition);
  const messages = useAppSelector(state => state.messages.messages);
  // console.log('user list rendered');
  const getUnreadCount = (userId: string) => {
    const channel = messages[userId];

    return channel ? channel.unreadCount : 0;
  };

  return (
    <View style={styles.userAvatarContainer}>
      {userPositionData.length
        ? userPositionData.map((user, idx) => {
            const unreadCount = getUnreadCount(user.userId);
            return (
              <View style={styles.innerContainer} key={idx.toString()}>
                {user.userId !== ITC ? (
                  <TouchableOpacity
                    onPress={() => props.animateToRegion(user.userId)}>
                    <FontAwesome5
                      name={'map-marker-alt'}
                      size={30}
                      color={user.userColor}
                    />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={styles.avatarBtn}
                  onPress={() => props.showMessageList(user.userId)}>
                  <CText style={styles.markerTitle}>{user.author}</CText>
                </TouchableOpacity>
                {unreadCount ? (
                  <View style={styles.badgeContainer}>
                    <CText style={{color: colors.white}}>{unreadCount}</CText>
                  </View>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  userAvatarContainer: {
    position: 'absolute',
    top: 70,
    right: 10,
    flex: 1,
    gap: 10,
    zIndex: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  markerTitle: {
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fontFamily.robotoRegular,
  },
  avatarBtn: {
    borderWidth: 1,
    borderRadius: 27,
    backgroundColor: colors.app.background,
    width: 54,
    height: 54,
    borderColor: colors.primary,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default memo(UserList);
