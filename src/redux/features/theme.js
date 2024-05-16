import { createSlice } from "@reduxjs/toolkit"

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        // create theme(if there isn't in local storage)
        theme: (localStorage.getItem("theme")) ? localStorage.getItem("theme") : "light"
    },
    reducers: {
        changeTheme: (state) =>{ 
            state.theme = (state.theme == "light") ? "dark" : "light" // change theme
            localStorage.setItem("theme", state.theme ) // save new value of theme to local storage
        }
    }
})

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer