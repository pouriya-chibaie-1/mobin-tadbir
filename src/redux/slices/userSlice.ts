import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface User {
  id: string;
  name: string;
  limit: number;
  email: string;
  phoneNumber: string;
  country: string;
  password?: string;
  passwordVisible?: boolean;
}
interface UserState {
  step: number;
  users: Array<User>;
  errorMessages: any;
}

const initialState: UserState = {
  step: 1,
  users: [],
  errorMessages: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    completeInformation(state) {
      state.step = 2;
    },
    receivePassword(state) {
      state.users = state.users.map((user) => {
        return { ...user, password: nanoid(8), passwordVisible: false };
      });
      state.step = 3;
    },
    setUser(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
    },
    setErrorMessages(state, action: PayloadAction<any>) {
      state.errorMessages = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
      delete state.errorMessages[action.payload];
      if (state.users.length === 0) {
        state.step = 1;
      }
    },
    deleteUsersWithErrors(state) {
      const keys = Object.keys(state.errorMessages);
      state.users = state.users.filter(
        (user) => !keys.includes(user.id)
      );
      state.errorMessages = {};
      if (state.users.length === 0) {
        state.step = 1;
      }
    },
    setPasswordVisible(state, action: PayloadAction<string>) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload) {
          return { ...user, passwordVisible: !user.passwordVisible };
        }
        return user;
      });
    },
  },
});

export const {
  setStep,
  completeInformation,
  receivePassword,
  setUser,
  setErrorMessages,
  deleteUser,
  deleteUsersWithErrors,
  setPasswordVisible
} = usersSlice.actions;
export default usersSlice;
