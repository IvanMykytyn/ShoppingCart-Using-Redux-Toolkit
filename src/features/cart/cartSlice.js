import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },
    toggleAmount: (state, { payload }) => {
      const currentItem = state.cartItems.find((item) => item.id === payload.id)
      if (payload.toggle === "inc"){
        currentItem.amount += 1
        state.amount += 1
      }
      else if(payload.toggle === "dec"){
        currentItem.amount -= 1  
        state.amount -= 1
      }
    },
    calculateTotals: (state) => {
      let total = 0
      let amount = 0

      state.cartItems.forEach(item => {
        total += item.amount * item.price
        amount += item.amount
      })

      state.total = parseFloat(total.toFixed(2))
      state.amount = amount
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
})

export const { clearCart, removeItem, toggleAmount, calculateTotals } = cartSlice.actions

export default cartSlice.reducer
