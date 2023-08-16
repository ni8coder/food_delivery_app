import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;

export const useSelectCounter = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
