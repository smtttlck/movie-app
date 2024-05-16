import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: []
    },
    reducers: {
        addMovie: (state, action) => { // add movie to favorites
            state.movies = [...state.movies, action.payload]
        },
        deleteMovie: (state, action) => { // delete movie to favorites
            state.movies = state.movies.filter(movie => movie.id != action.payload)
        }
    }
})

export const {addMovie, deleteMovie} = moviesSlice.actions

export default moviesSlice.reducer