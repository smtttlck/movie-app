import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '../components/List'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const Media = () => {

    const { theme } = useSelector(state => state.theme)

    const [datas, setDatas] = useState(null)
    const [genres, setGenres] = useState([])

    const { type, pageNumber } = useParams()

    useEffect(() => {
        // data fetch for media tag
        api.fetchData(type, pageNumber)
            .then(data => setDatas(data.results))

        // data fetch for media type
        api.fetchData(`${type.slice(0, 2) == "tv" ? "tv" : "movie"}Genre`)
            .then(data => setGenres(data.genres))


    }, [type, pageNumber])

    return (
        <div className={`page container bg-${theme}`}>
            <h1 className="pink">
                {(type.length<6) ? `Recently added ${type}` : `${type.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
            </h1>

            {(datas == null) ? <Loader /> :
                <List
                    datas={datas}
                    genreArray={genres}
                />
            }

            <Pagination />

        </div>
    )
}

export default Media