import {createSlice} from '@reduxjs/toolkit';

export type Message = {
  message: string;
  channel: string;
  publisher: string;
};

type InitialState = {
  messages: {
    [channel: string]: {
      list: Message[];
      unreadCount: number;
    };
  };
};

const initialState: InitialState = {
  messages: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const channel = action.payload.channel;
      const data = action.payload.data;
      // console.log('inside add message', channel, data);
      if (state.messages[channel]?.list) {
        state.messages[channel].list = [...state.messages[channel].list, data];
        state.messages[channel].unreadCount += 1;
      } else {
        state.messages[channel] = {list: [data], unreadCount: 1};
      }
    },
    updateUnreadCount: (state, action) => {
      const channel = action.payload.channel;

      state.messages[channel].unreadCount += 1;
    },
    resetUnreadCount: (state, action) => {
      const channel = action.payload.channel;
      // console.log('resetUnreadCount channel', channel);
      state.messages[channel].unreadCount = 0;
    },
  },
});

export const {addMessage, updateUnreadCount, resetUnreadCount} =
  messageSlice.actions;

export default messageSlice.reducer;
