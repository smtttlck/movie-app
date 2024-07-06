import React, { useEffect, useRef } from 'react'
import { BiSolidCameraMovie as CameraIcon } from "react-icons/bi"
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsList } from "react-icons/bs"
import ThemeButton from './ThemeButton'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Navbar = () => {

    const {theme} = useSelector(state => state.theme)
    const navigate = useNavigate()

    const navRef = useRef()
    const searchInputRef = useRef()

    const query = useQuery()

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

    useEffect(() => {
        if(!query.has("name"))
            searchInputRef.current.value = ""

    },[query.toString()])

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
                        ref={searchInputRef}
                        type="text" className="form-control rounded px-2" 
                        size="30" placeholder="Search Movie" 
                        style={{backgroundColor: (theme == "dark") ? "#000" : "#fff", color: (theme == "light") ? "#000" : "#fff"}}
                        onKeyDown={(e) => (e.key == "Enter") && navigate(`/media/movie?name=${e.target.value}&page=1&pageSize=20`)}
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
                        <Link to="/media/movie?page=1&pageSize=20">Movie</Link>
                    </li>
                    <li>
                        <Link to="/media/actor?page=1&pageSize=20&movies=true">Actor</Link>
                    </li>
                </ul>
                <ThemeButton />
            </nav>
        </header>
    )
}

export default Navbar