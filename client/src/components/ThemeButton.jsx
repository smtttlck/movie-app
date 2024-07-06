import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiSun as Sun, BiMoon as Moon } from "react-icons/bi"
import { changeTheme } from '../redux/features/theme'

const ThemeButton = () => {

    const { theme } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    return (
        <span
            className="themeChanger d-flex align-items-center justify-content-center rounded"
            style={{ color: (theme == "light") ? "#000" : "#fff" }}
            onClick={() => dispatch(changeTheme())}
        >
            {(theme == "light") ? <Sun /> : <Moon />}
        </span>
    )
}

export default ThemeButton