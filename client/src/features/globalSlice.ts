import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Order, User } from "../typings";

export interface CounterState {
  user: User | null;
  orders: Order[];
}

const initialState: CounterState = {
  user: null,
  orders: [],
};

export const counterSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setOrders } = counterSlice.actions;

export default counterSlice.reducer;
