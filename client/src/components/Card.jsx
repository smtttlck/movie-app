import React, { useState } from 'react'
import { GoStarFill as Star } from "react-icons/go"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Card = ({ id, name, releaseDate, rating, posterPath, array }) => {

    const navigate = useNavigate()    

    const {theme} = useSelector(state => state.theme)

    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="card" onClick={() => navigate(`/${rating ? "detail" : "actor"}/${id}`)}>
            {/* card image */}
            {isLoading && <Loader />}
            <div className="card-img">
                <img src={posterPath} onLoad={() => setIsLoading(false)}/>
            </div>
            <div className="card-img-overlay text-center">
                {/* hover effect for media */}
                <div className="card-hover-texts m-auto">
                    {array?.map((data, index) => (
                        <div key={`${id}-${index}`} className={`genre bg-${theme} rounded px-2 m-auto`}>
                            <p>{data.name}</p>
                        </div>
                    ))}
                </div>
                {/* card title */}
                <h5 className="card-title">{name}</h5>
                <div className="card-texts d-flex justify-content-evenly">
                    {/* media release year */}
                    {releaseDate && <p className="card-text">{releaseDate}</p>}
                    {/* media vote average */}
                    {rating && <p className="card-text"><Star />{rating}</p>}
                </div>
            </div>
        </div>
    )
}

export default Card