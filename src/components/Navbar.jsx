import React, { useEffect, useRef } from 'react'
import { BiSolidCameraMovie as CameraIcon } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BiSun as Sun, BiMoon as Moon } from "react-icons/bi"
import { BsList } from "react-icons/bs";
import { changeTheme } from '../redux/features/theme'

const Navbar = () => {

    const {theme} = useSelector(state => state.theme)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const navRef = useRef()

    const navMenuControl = () => {
        // for toggle effect
        navRef.current.style.opacity = (navRef.current.style.opacity == "1") ? "0" : "1"
        navRef.current.style.height = (navRef.current.style.height == "50px") ? "0px" : "50px"        
    }

    useEffect(() => {
        // body color according to theme
        const color = (theme == "light") ? "#FFFFFF" : "#1F2122"
        document.body.style.backgroundColor = color

    },[theme])

    return (
        <header className="header d-flex justify-content-center">
            <nav className="navbar w-100 justify-content-evenly my-3">
                {/* logo */}
                <div className="logo">
                    <Link to="/">
                        <CameraIcon />
                    </Link>
                </div>
                {/* search input */}
                <div className="search-input">
                    <input 
                        type="text" className="rounded px-2" 
                        size="30" placeholder="Search Movie" 
                        style={{backgroundColor: (theme == "dark") ? "#000" : "#fff", color: (theme == "light") ? "#000" : "#fff"}}
                        onKeyDown={(e) => (e.key == "Enter") && navigate(`/search/${e.target.value}`)}
                    />
                </div>
                {/* nav links */}
                <span 
                    className="navToggler d-none align-items-center justify-content-center rounded" 
                    style={{color: (theme == "light") ? "#000" : "#fff"}}
                    onClick={() => navMenuControl()}
                >
                    {<BsList />}
                </span>
                <ul className="nav" ref={navRef}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/media/movie/1">Movie</Link>
                    </li>
                    <li>
                        <Link to="/media/tv/1">Series</Link>
                    </li>
                    <li>
                        <Link to="/myList">My List</Link>
                    </li>
                </ul>
                {/* theme button */} 
                <span 
                    className="themeChanger d-flex align-items-center justify-content-center rounded" 
                    style={{color: (theme == "light") ? "#000" : "#fff"}}
                    onClick={() => dispatch(changeTheme())}
                >
                    {(theme == "light") ? <Sun /> : <Moon />}
                </span>
            </nav>
        </header>
    )
}

export default Navbar