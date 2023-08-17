import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import CustomSafeAreaView from 'components/CustomSafeAreaView';

export type FilterHandle = {
  focusUsername: () => void;
  focusEmail: () => void;
};

type FilterProps = {};

const Filter = forwardRef<FilterHandle, FilterProps>((props, ref) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const usernameRef = useRef<TextInput>(null!);
  const emailRef = useRef<TextInput>(null!);

  useImperativeHandle(ref, () => ({
    focusUsername: () => usernameRef.current.focus(),
    focusEmail: () => emailRef.current.focus(),
  }));

  return (
    <View style={styles.container}>
      <TextInput
        ref={usernameRef}
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.inputStyle}
      />
      <TextInput
        ref={emailRef}
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.inputStyle}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 20,
    width: '80%',
    padding: 5,
  },
});

export default Filter;
