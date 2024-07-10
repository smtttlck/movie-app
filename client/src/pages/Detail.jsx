import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

const Detail = () => {

    const { theme } = useSelector(state => state.theme)

    const { id } = useParams()

    const [data, setData] = useState(null)

    useEffect(() => {
        // data fetch for media type
        api.fetchData(`getMovie/${id}`)
            .then(movie => {
                setData(movie)
            })

    }, [id])

    return (
        <main className={`page container bg-${theme}`}>

            {(data == null) ? <Loader /> :
                <MovieCard
                    data={data}
                />
            }

        </main>
    )
}

export default Detail