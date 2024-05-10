import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/services/auth/auth.type.ts";

type initialStateType = {
  decksId: string
  decksName: string
  decksImg: string
  user:User
  isLoggedIn:boolean
}
const initialState: initialStateType = {
  decksId: '',
  decksName:'',
  decksImg:'',
  user:{}as User,
  isLoggedIn:false
}

const slice = createSlice({
  name: 'tasks', initialState, reducers: {
    setDecksId: (state, action: PayloadAction<string>) => {
      state.decksId = action.payload
    },
    setDecksName: (state, action: PayloadAction<string>) => {
      state.decksName = action.payload
    },
    setDecksImg: (state, action: PayloadAction<string>) => {
      state.decksImg = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLoggedIn=true
    },
  }
})
export const appAC=slice.actions
export const appReducer=slice.reducer

//выводим тип State
export type initialStateType= typeof slice.getInitialState