import { configureStore } from '@reduxjs/toolkit'
import general from './slices/general'
import usersSlice from './slices/userSlice'
// ...
const store = configureStore({
  reducer: {
    general: general.reducer,
    users: usersSlice.reducer

  },
})
export type RootState = ReturnType<typeof store.getState>

export default store