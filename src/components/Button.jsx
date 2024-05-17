import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ url, text }) => {

    const navigate = useNavigate()

    return (
        <button
            className="btn btn-outline-danger bg-pink"
            onClick={() => navigate(url)}
        >
            {text}
        </button>
    )
}

export default Button