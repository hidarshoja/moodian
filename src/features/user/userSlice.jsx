import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 10,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    changeId: (state, action) => {
      state.id = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeId } = userSlice.actions

export default userSlice.reducer