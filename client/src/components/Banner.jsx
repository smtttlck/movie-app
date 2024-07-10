import React from 'react'
import { useNavigate } from 'react-router-dom'
import bannerPoster from '/bannerPoster.png'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <section
            className="banner d-flex flex-column justify-content-center rounded"
            style={{ backgroundImage: `url(${bannerPoster})` }}
        >
            <div className="banner-text w-25 ms-5">
                <h1>BROWSE OUR POPULAR MOVIES HERE</h1>
                <button
                    className="btn btn-outline-danger bg-pink"
                    onClick={() => navigate('/media/movie?page=1&pageSize=20')}
                >
                    Browse Now
                </button>
            </div>
        </section>
    )
}

export default Banner