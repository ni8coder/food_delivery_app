import {createSlice} from '@reduxjs/toolkit';

type User = {
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: object;
  multiFactor: object;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: [];
  providerId: string;
  tenantId: string | null;
  uid: string;
};

type InitialStateType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  isIntroShown: boolean;
  user: User | null;
};

const initialState: InitialStateType = {
  isLoading: true,
  isLoggedIn: false,
  isIntroShown: false,
  user: null,
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
      state.user = null;
    },
    introShown: state => {
      state.isIntroShown = true;
    },
  },
});

export const {takeSignUp, takeSignIn, signIn, signOut, introShown} =
  authSlice.actions;

export default authSlice.reducer;
