import {createSlice} from '@reduxjs/toolkit';

export type UserMyPlace = {
  latitude: string;
  longitude: string;
  placeName: string;
  userName: string;
  userId: string;
};

export type UserPosition = {
  currentLatitude: number;
  currentLongitude: number;
  locationTime: number;
  speed: number;
  userId: string;
  userName: string;
  author: string;
  userColor: string;
};

export type InitialStateProps = {
  isLoading: boolean;
  places: UserMyPlace[];
  userPosition: UserPosition[];
};

const initialState: InitialStateProps = {
  isLoading: true,
  places: [],
  userPosition: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    setUserPosition: (state, action) => {
      state.userPosition = action.payload;
    },
  },
});

export const {setPlaces, setUserPosition} = authSlice.actions;

export default authSlice.reducer;
