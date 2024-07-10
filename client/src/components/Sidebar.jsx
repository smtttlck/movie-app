import React from 'react'
import { useSelector } from 'react-redux'
import ThemeButton from './ThemeButton'
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ admin, table, setTable }) => {

    const { theme } = useSelector(state => state.theme)

    const navigate = useNavigate()

    return (
        <aside className={`sidebar p-2 bg-${theme}2`}>
            <div className="sidebar-header d-flex justify-content-between">
                <h3 className="pink2">PANEL</h3>
                <ThemeButton />
            </div>
            <div className="sidebar-header d-flex justify-content-between">
                <h5 className="pink">{admin.name}</h5>
                <span
                    className="themeChanger d-flex align-items-center justify-content-center rounded"
                    style={{ color: (theme == "light") ? "#000" : "#fff" }}
                    onClick={() => {
                        localStorage.removeItem("authToken")
                        navigate("/login")
                    }}
                >
                    <BiLogOut />
                </span>
            </div>
            <ul className="list-unstyled p-0 mt-3">
                <li
                    className={(table == "Movie") ? "selected" : ""}
                    onClick={() => setTable("Movie")}
                >
                    Movie
                </li>
                <li
                    className={(table == "Actor") ? "selected" : ""}
                    onClick={() => setTable("Actor")}
                >
                    Actor
                </li>
                <li
                    className={(table == "Category") ? "selected" : ""}
                    onClick={() => setTable("Category")}
                >
                    Category
                </li>
                {admin.level === "root" &&
                    <li
                        className={(table == "Admin") ? "selected" : ""}
                        onClick={() => setTable("Admin")}
                    >
                        Admin
                    </li>
                }
            </ul>
        </aside>
    )
}

export default Sidebar