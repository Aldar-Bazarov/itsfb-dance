import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
        state.events = action.payload
    },
    removeEvent(state, action) {
        state.events = state.events.filter(event => event.id !== action.payload)
    }
  },
});

export const { setEvents, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;