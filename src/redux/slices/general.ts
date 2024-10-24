import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  count: number;
  text: string;
};

const initialState: State = {
  count: 0,
  text: '',
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    reset(state) {
      state.count = 0;
      state.text = '';
    },
  },
});

export const { increment, decrement, setText, reset } = generalSlice.actions;
export default generalSlice;
