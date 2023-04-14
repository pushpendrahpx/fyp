import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';




// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import * as rtdb from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCNNtXTEic_d9H1lHMk3lJvznCq2sWn8",
  authDomain: "finalyearproject-d2b17.firebaseapp.com",
  databaseURL: "https://finalyearproject-d2b17-default-rtdb.firebaseio.com",
  projectId: "finalyearproject-d2b17",
  storageBucket: "finalyearproject-d2b17.appspot.com",
  messagingSenderId: "407695514449",
  appId: "1:407695514449:web:0d61a6106c8d6742115170",
  measurementId: "G-383ZD475P7"
};


// Define a type for the slice state
// interface CounterState {
//   app: FirebaseApp
// }



// const analytics = getAnalytics(app);



export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = auth;
export const firebaseStore = firestore;
export const firebaseRTDB = rtdb;

// Define the initial state using that type
const initialState = {
  app:initializeApp(firebaseConfig),
  // analytics: <Analytics> getAnalytics(this.app)
}






export const firebaseSlice = createSlice({
  name: 'firebase',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
  }
})

export const {  } = firebaseSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default firebaseSlice.reducer