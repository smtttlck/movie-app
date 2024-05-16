import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className="banner d-flex flex-column justify-content-center rounded">
            <div className="banner-text w-25 ms-5">
                <h1>BROWSE OUR POPULAR MOVIES HERE</h1>
                <button 
                    className="btn btn-outline-danger bg-pink"
                    onClick={() => navigate('/media/movie/1')}
                >
                    Browse Now
                </button>
            </div>
        </div>
    )
}

export default Banner