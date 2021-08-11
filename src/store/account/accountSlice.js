import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: null,
  tokens: {},
}

export const accountSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateWalletAddress: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.address = action.payload
    },
    updateDAITokenBalance: (state, action) => {
      state.tokens = { ...state.tokens, DAI: action.payload }
    },
    updateADAITokenBalance: (state, action) => {
      state.tokens = { ...state.tokens, aDAI: action.payload }
    },
    disconnectWallet: (state, action) => {
      state.address = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  updateWalletAddress,
  disconnectWallet,
  updateDAITokenBalance,
  updateADAITokenBalance,
} = accountSlice.actions

export default accountSlice.reducer
