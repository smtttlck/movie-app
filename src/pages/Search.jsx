import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '../components/List'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'

const Search = () => {

    const { theme } = useSelector(state => state.theme)

    const [datas, setDatas] = useState([])
    const [genres, setGenres] = useState([])

    const { key } = useParams()

    useEffect(() => {
        // data fetch for search key
        api.fetchData("search", key)
            .then(data => setDatas(data.results.filter(item => item.media_type != 'person')))

        // data fetch for movie genres
        api.fetchData(`movieGenre`)
            .then(data => setGenres(data.genres))

    }, [key])

    return (
        <div className={`page container bg-${theme}`}>

            <h1 className="pink">Search results for '{key}'</h1>

            <List
                datas={datas}
                genreArray={genres}
            />

        </div>
    )
}

export default Search