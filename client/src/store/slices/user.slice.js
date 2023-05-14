import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  firstname: '',
  secondname: '',
  email: '',
  trains: '',
  awards: '',
  experience: '',
  motto: '',
  target: '',
  role: '',
  img: '',
  groupId: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.secondname = action.payload.secondname;
      state.email = action.payload.email;
      state.trains = action.payload.trains;
      state.awards = action.payload.awards;
      state.experience = action.payload.experience;
      state.motto = action.payload.motto;
      state.target = action.payload.target;
      state.role = action.payload.role;
      state.img = action.payload.img;
      state.groupId = action.payload.groupId;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.id = '';
      state.firstname = '';
      state.secondname = '';
      state.email = '';
      state.trains = '';
      state.awards = '';
      state.experience = '';
      state.motto = '';
      state.target = '';
      state.role = '';
      state.img = '';
      state.groupId = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;