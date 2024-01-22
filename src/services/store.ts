import { baseApi } from '@/services/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer } from "@/services/app.slice.ts";

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer ,
    // [decksSlice.name]: decksSlice.reducer,

    app: appReducer,
    // auth: authReducer,
    // packs: packsReducer,
    // counter: counterReducer,
    // [cardsApi.reducerPath]: cardsApi.reducer
  },
})
setupListeners(store.dispatch)
export type AppDispatchType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>
