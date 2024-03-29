import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  isLoggedIn: boolean;
  name: string;
  devices: Array<any>;
  creds: any;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  name: "",
  devices: [],
  creds: {},
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
    saveUser: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.creds = action.payload;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.creds = {};
      state.devices = [];
      state.name = "";
    },
    updateDevices: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.devices = action.payload;
    },
    updateDevice: (state, action: PayloadAction<any>) => {
      let tmp = [...state.devices];
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].id === action.payload.id) {
          tmp[i] = action.payload;
        }
      }
      state.devices = tmp;
    },
  },
});

export const { signOut, saveUser, updateDevices, updateDevice } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
