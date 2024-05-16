import { configureStore } from "@reduxjs/toolkit"
import themeReducer  from "../features/theme"
import moviesReducer from "../features/movies"

export default configureStore({
    reducer: {
        theme: themeReducer, // for theme
        movies: moviesReducer // for favorite movies
    }
})