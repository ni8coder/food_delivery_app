import {createSlice} from '@reduxjs/toolkit';

export type Place = {
  latitude: string;
  longitude: string;
  placeName: string;
  userName: string;
  userId: string;
};

export type InitialStateProps = {
  isLoading: boolean;
  places: Place[];
};

const initialState: InitialStateProps = {
  isLoading: true,
  places: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const {setPlaces} = authSlice.actions;

export default authSlice.reducer;
