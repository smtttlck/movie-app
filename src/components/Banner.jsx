import React from 'react'
import { useNavigate } from 'react-router-dom'
import bannerPoster from '/bannerPoster.png';
import Button from './Button';

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div
            className="banner d-flex flex-column justify-content-center rounded"
            style={{ backgroundImage: `url(${bannerPoster})` }}
        >
            <div className="banner-text w-25 ms-5">
                <h1>BROWSE OUR POPULAR MOVIES HERE</h1>
                <Button 
                    url={'/media/movie/1'}
                    text={'Browse Now'}
                />
            </div>
        </div>
    )
}

export default Banner