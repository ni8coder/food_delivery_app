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
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    signOut: state => {
      state.isLoggedIn = false;
      state.user = {};
    },
    introShown: state => {
      state.isIntroShown = true;
    },
  },
});

export const {signIn, signOut, introShown} = authSlice.actions;

export default authSlice.reducer;
