import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SmallCard from './SmallCard'
import { useParams } from 'react-router-dom'
import { MdFavorite as Favorite, MdFavoriteBorder as NotFavorite } from "react-icons/md";
import { addMovie, deleteMovie } from '../redux/features/movies';
import ReactPlayer from 'react-player/youtube'

const MovieCard = ({ data, actors, videoUrl }) => {

    const { theme } = useSelector(state => state.theme)
    const { movies } = useSelector(state => state.movies)

    const { type } = useParams()

    const [isFavorite, setIsFavorite] = useState(true)

    const dispatch = useDispatch()


    useEffect(() => {
        // check is this movie favorite
        let flag = movies.some(movie => movie.id === data?.id);
        setIsFavorite(flag);
    }, [movies, data])


    // favorites and unfavorites
    const handleFavoriteClick = () => {
        dispatch(isFavorite ? deleteMovie(data.id) : addMovie({ id: data.id, movieType: type }))
    }

    return (
        <div className="movie-card d-lg-flex w-100 py-2">
            {/* movie poster */}
            <div className="poster w-lg-25 text-center">
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.poster_path}`} alt="" />
            </div>
            {/* movie infos */}
            <div className="text w-75 m-auto px-1">
                <div className="moviecard-header w-100 d-flex justify-content-between">
                    {/* movie name */}
                    <h1 className={`${(theme == "light") ? "pink-shadow" : "pink"} mb-2`}>
                        {(type == "movie") ? data?.title : data?.name}
                    </h1>
                    {/* favorite icon for movie */}
                    <span
                        className="fav-icon"
                        onClick={handleFavoriteClick}
                    >
                        {isFavorite ? <Favorite /> : <NotFavorite />}
                    </span>
                </div>
                <div className="info d-flex">
                    {/* movie release year */}
                    <p className={(theme == "light") ? "pink" : " "}>
                        {((type == "movie") ? data.release_date : data.first_air_date)?.split("-")[0]}
                    </p>
                    {/* genres of the movie */}
                    <p className={`${(theme == "light") && "pink"} ms-4`}>
                        {data?.genres?.filter(item => item.hasOwnProperty('name')).map(item => item.name).join(' ')}
                    </p>
                </div>
                {/* movie trailer */}
                {videoUrl &&
                    <div className="video">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoUrl}`}
                            width='100%'
                            controls
                        />
                    </div>
                }
                {/* movie overview */}
                <div className="overview">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Overview
                    </h5>
                    <p className={(theme == "light") ? "pink" : " "}>
                        {data?.overview}
                    </p>
                </div>
                {/* actors of the movie */}
                {(actors.length > 0) &&
                    <div className="actors">
                        <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                            Main actors
                        </h5>
                        <div className="actor-container d-flex">
                            {actors?.map((actor, index) => (
                                index < 4 && (
                                    <div
                                        key={`actor-${index}`}
                                        className="col-3"
                                    >
                                        <SmallCard
                                            id={actor.id}
                                            cardType={"actor"}
                                            text={actor.character}
                                            subText={actor.name}
                                            image_path={actor.profile_path}
                                        />
                                    </div>)
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MovieCard