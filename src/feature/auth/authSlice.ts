import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userToken: '',
  isIntroShown: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
    },
    signOut: state => {
      state.isLoggedIn = false;
      state.userToken = '';
    },
    introShown: state => {
      state.isIntroShown = true;
    },
  },
});

export const {signIn, signOut, introShown} = authSlice.actions;

export default authSlice.reducer;
