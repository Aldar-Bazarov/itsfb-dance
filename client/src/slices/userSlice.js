import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  role: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.firstName = action.payload.firstname;
      state.secondName = action.payload.secondname;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.firstName = '';
      state.secondName = '';
      state.email = '';
      state.role = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;