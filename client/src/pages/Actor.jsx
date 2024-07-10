import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import ActorCard from '../components/ActorCard'
import Loader from '../components/Loader'

const Actor = () => {

    const { theme } = useSelector(state => state.theme)

    const { id } = useParams()

    const [actor, setActor] = useState(null)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        // data fetch for actor
        api.fetchData("getActor", id)
            .then(actor => {
                setActor(actor.data)
                setMovies(actor.movies)
            })

    }, [id])

    return (
        <main className={`page container bg-${theme} d-flex`}>

            {(actor == null) ? <Loader /> :
                <ActorCard
                    actor={actor}
                    movies={movies}
                />
            }
        </main>
    )
}

export default Actor