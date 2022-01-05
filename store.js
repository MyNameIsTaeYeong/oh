import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    logOut: (state, action) => {
      state = action.payload;
    },
  },
});

export const { logOut } = user.actions;

export default configureStore({ reducer: user.reducer });
