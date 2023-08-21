import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface FeedPost {
  title: string;
  author: string;
  source: {
    Id: string | null;
    Name: string;
  };
  publishedAt: string;
  url: string;
}

interface InitialStateType {
  posts: FeedPost[];
  isLoading: boolean;
}

const initialState: InitialStateType = {
  posts: [],
  isLoading: false,
};

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    getFeedsFetch: (state, action) => {
      console.log('inside reducer getFeedsFetch', action.payload);
      state.isLoading = true;
    },
    getFeedsSuccess: (state, {payload: data}: PayloadAction<FeedPost[]>) => {
      state.isLoading = false;
      state.posts = data;
    },
    getFeedsFailure: state => {
      state.isLoading = false;
    },
  },
});

export const {getFeedsFetch, getFeedsSuccess, getFeedsFailure} =
  feedSlice.actions;

export default feedSlice.reducer;
