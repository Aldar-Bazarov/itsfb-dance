import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice'
import newsReducer from './slices/news.slice'
import eventsReducer from './slices/events.slice'

export default configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        events: eventsReducer,
    },
    devTools: true,
})