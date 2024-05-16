import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '../components/List'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'

const Media = () => {

    const { theme } = useSelector(state => state.theme)

    const [datas, setDatas] = useState([])
    const [genres, setGenres] = useState([])

    const { type, pageNumber } = useParams()

    useEffect(() => {
        // data fetch for media tag
        api.fetchData((type == "movie") ? "movies" : "", pageNumber)
            .then(data => setDatas(data.results))

        // data fetch for media type
        api.fetchData(`${type}Genre`)
            .then(data => setGenres(data.genres))


    }, [type, pageNumber])

    return (
        <div className={`page container bg-${theme}`}>

            <h1 className="pink">Recently Added {type.charAt(0).toUpperCase() + type.slice(1)}</h1>

            <List
                datas={datas} 
                genreArray={genres} 
            />

            <Pagination />

        </div>
    )
}

export default Media