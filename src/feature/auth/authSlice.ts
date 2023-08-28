import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: {},
  isIntroShown: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    takeSignUp: (state, action) => {
      //
    },
    takeSignIn: (state, action) => {
      //
    },
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    signOut: state => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = {};
    },
    introShown: state => {
      state.isIntroShown = true;
    },
  },
});

export const {takeSignUp, takeSignIn, signIn, signOut, introShown} =
  authSlice.actions;

export default authSlice.reducer;
