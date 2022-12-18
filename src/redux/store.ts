import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import firebaseSlice from './firebase/firebaseSlice'
import userSlice from './user/userSlice'
// ...

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    firebaseReducer: firebaseSlice
  },
  middleware:customizedMiddleware
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch