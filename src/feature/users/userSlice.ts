import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | undefined;
  address: string;
  phone: string;
  parent: FirebaseFirestoreTypes.DocumentReference | undefined;
};

type InitialStateType = {
  users: User[];
};

const initialState: InitialStateType = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      console.log('payload', action.payload);
      state.users = action.payload;
    },
  },
});

export const {setUsers} = userSlice.actions;

export default userSlice.reducer;
