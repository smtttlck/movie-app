import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '../components/List'
import * as api from '../api/Api'

const MyList = () => {

    const {theme} = useSelector(state => state.theme)
    const {movies} = useSelector(state => state.movies)

    const [datas, setDatas] = useState([])


    useEffect(() => {
        // data fetch for all favorite movie
        const fetchDataForIds = async () => {
            try {
                const results = await Promise.all(movies?.map(movie => api.fetchData(`${movie.movieType}Detail`, movie.id)))
                setDatas(results)
            } catch (err) {
                console.error(err)
            }
        }

        fetchDataForIds()


    }, [movies])
    

    return (
        <div className={`page container bg-${theme}`}>

            <h1 className="pink">My Favorites</h1>           
            
            <List 
                datas={datas}
            />

        </div>
    )
}

export default MyList