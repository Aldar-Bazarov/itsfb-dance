import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action) {
        state.news = action.payload
    },
    removeNews(state, action) {
        state.news = state.news.filter(oneNews => oneNews.id !== action.payload)
    }
  },
});

export const { setNews, removeNews } = newsSlice.actions;
export default newsSlice.reducer;