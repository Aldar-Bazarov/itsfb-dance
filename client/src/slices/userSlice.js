import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  role: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { username, email, role } = action.payload;
      state.username = username;
      state.email = email;
      state.role = role;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.username = '';
      state.email = '';
      state.role = '';
      state.isAuthenticated = false;
    },
  },
});

// Экшн креэйторы генерируются для каждого случая функции-редьюсера
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;