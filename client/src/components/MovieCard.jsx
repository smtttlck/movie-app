import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SmallCard from './SmallCard'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'

const MovieCard = ({ data }) => {

    const { theme } = useSelector(state => state.theme)

    return (
        <div className="movie-card d-md-flex w-100 py-5 pt-md-0">
            {/* movie poster */}
            <div className="poster w-lg-25">
                <img 
                    src={`http://localhost:3001/${data?.poster_path?.split("public\\")[1].split("\\").join('/')}`} 
                    className="img-fluid"
                    alt={data?.name}
         />
            </div>
            {/* movie infos */}
            <div className="text w-75 m-auto ps-2">
                <div className="moviecard-header w-100 d-flex justify-content-between">
                    {/* movie name */}
                    <h1 className={`${(theme == "light") ? "pink-shadow" : "pink"} mb-2`}>
                        {data?.name}
                    </h1>
                </div>
                <div className="info d-flex">
                    {/* movie release year */}
                    <p className={(theme == "light") ? "pink" : " "}>
                        {data.release_date}
                    </p>
                    {/* genres of the movie */}
                    <p className={`${(theme == "light") && "pink"} ms-4`}>
                        {data?.categories?.filter(item => item.hasOwnProperty('name')).map(item => item.name).join(' ')}
                    </p>
                </div>
                {/* movie trailer */}
                <div className="video">
                    <ReactPlayer
                        url={data?.trailer_url}
                        width='100%'
                        controls
                    />
                </div>
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
                <div className="actors">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Main actors
                    </h5>
                    <div className="actor-container d-flex flex-wrap">
                        {data?.actors?.map((actor, index) => (
                            index < 4 && (
                                <div
                                    key={`actor-${index}`}
                                    className="col-lg-3 col-6 mb-4"
                                >
                                    <SmallCard
                                        id={actor.id}
                                        text={actor.characterName}
                                        subText={actor.name}
                                        image_path={`http://localhost:3001/${actor?.img_path?.split("public\\")[1].split("\\").join('/')}`}
                                        targetPageType={"actor"}
                                    />
                                </div>)
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard