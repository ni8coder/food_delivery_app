import {createSlice} from '@reduxjs/toolkit';

export type Message = {
  message: string;
  channel: string;
  publisher: string;
};

type InitialState = {
  messages: {
    [channel: string]: Message[];
  };
};

const initialState: InitialState = {messages: {}};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const channel = action.payload.channel;
      const data = action.payload.data;

      if (state.messages[channel]) {
        state.messages[channel] = [...state.messages[channel], data];
      } else {
        state.messages[channel] = [data];
      }
    },
  },
});

export const {addMessage} = messageSlice.actions;

export default messageSlice.reducer;
