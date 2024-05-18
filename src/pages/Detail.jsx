import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

const Detail = () => {

    const { theme } = useSelector(state => state.theme)

    const { type, id } = useParams()

    const [data, setData] = useState(null)
    const [actors, setActors] = useState([])
    const [videoUrl, setVideoUrl] = useState()

    useEffect(() => {
        // data fetch for media type
        api.fetchData((type == "movie") ? "movieDetail" : "tvDetail", id)
            .then(data => {
                setData(data)
                // data fetch for media video
                api.fetchData(`${type}Video`, data.id)
                    .then(data => {
                        const trailer = data.results.find(movie => movie.type == "Trailer")?.key
                        setVideoUrl(trailer || data.results[0].key)
                    })
            })

        // data fetch for actors
        api.fetchData((type == "movie") ? "movieCredits" : "tvCredits", id)
            .then(data => setActors(data.cast))
    }, [type, id])

    return (
        <div className={`page container bg-${theme} d-flex`}>

            {(data == null) ? <Loader /> :
                <MovieCard
                    data={data}
                    actors={actors}
                    videoUrl={videoUrl}
                />
            }

        </div>
    )
}

export default Detail