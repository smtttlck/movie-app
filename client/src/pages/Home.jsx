import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'

const Home = () => {

  const { theme } = useSelector(state => state.theme)

  const [topRatingMovies, setTopRatingMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [lastMovies, setLastMovies] = useState([])

  useEffect(() => {
    
    // data fetch for top rating movies
    api.fetchData("getMovie", "pageSize=12&sort=rating&type=desc")
      .then(movies => setTopRatingMovies(movies.data));
    
    // data fetch for recently released movies
    api.fetchData("getMovie", "pageSize=12&sort=release_date&type=desc")
      .then(movies => setNewMovies(movies.data));
    
    // data fetch for recently released movies
    api.fetchData("getMovie", "pageSize=12&sort=id&type=desc")
      .then(movies => setLastMovies(movies.data));


  }, [])



  return (
    <div className={`page container bg-${theme}`}>
      <Banner />

      <Carousel
        title={"Top Rated Movies"}
        datas={topRatingMovies}
        navigateParameter={"sort=rating&type=desc"}
      />

      <Carousel
        title={"Recently Released Movies"}
        datas={newMovies}
        navigateParameter={"sort=release_date&type=desc"}
      />

      <Carousel
        title={"Recently Added Movies"}
        datas={lastMovies}
        navigateParameter={"sort=id&type=desc"}
      />

    </div>
  )
}

export default Home