import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice'
import newsReducer from './slices/news.slice'

export default configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
    },
    devTools: true,
})