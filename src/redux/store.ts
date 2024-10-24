import { configureStore } from '@reduxjs/toolkit'
import general from './slices/general'
// ...
const store = configureStore({
  reducer: {
    general: general.reducer,

  },
})
export type RootState = ReturnType<typeof store.getState>

export default store