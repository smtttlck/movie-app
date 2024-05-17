import React, { useState } from 'react'
import { GoStarFill as Star } from "react-icons/go";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Card = ({ id, type, title, releaseDate, voteAverage, posterPath, genres, genreArray }) => {

    const navigate = useNavigate()    

    const {theme} = useSelector(state => state.theme)

    const [isLoading, setIsLoading] = useState(true)

    // convert genre id to genre name
    const convertGenre = genreId => {
        const genre = genreArray?.find(genre => genre.id == genreId)
        return genre ? genre.name : null
    }

    return (
        <div className="card" onClick={() => navigate(`/detail/${type}/${id}`)}>
            {/* card image */}
            {isLoading && <Loader />}
            <div className="card-img">
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${posterPath})`} onLoad={() => setIsLoading(false)}/>
            </div>
            <div className="card-img-overlay text-center">
                {/* genres for media */}
                <div className="card-hover-texts m-auto">
                    {genres?.map((genre, index) => (
                        <div key={`${id}-${index}`} className={`genre bg-${theme} rounded px-2 m-auto`}>
                            <p>{genre.name || convertGenre(genre)}</p>
                        </div>
                    ))}
                </div>
                {/* card title */}
                <h5 className="card-title">{title}</h5>
                <div className="card-texts d-flex justify-content-evenly">
                    {/* media release year */}
                    <p className="card-text">{releaseDate}</p>
                    {/* media vote average */}
                    <p className="card-text"><Star />{voteAverage}</p>
                </div>
            </div>
        </div>
    )
}

export default Card