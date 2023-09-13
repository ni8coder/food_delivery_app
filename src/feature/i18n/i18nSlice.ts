import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = {
  languageCode: string;
};

const initialState: InitialStateType = {
  languageCode: 'en',
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    updateLocale: (state, action) => {
      state.languageCode = action.payload;
    },
  },
});

export const {updateLocale} = i18nSlice.actions;

export default i18nSlice.reducer;
