import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'

const Home = () => {

  const { theme } = useSelector(state => state.theme)

  const [movies, setMovies] = useState([])
  const [movieGenres, setMovieGenres] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [tvGenres, setTvGenres] = useState([])

  useEffect(() => {
    // data fetch for movies
    api.fetchData("movies", 1)
      .then(data => setMovies(data.results))

    // data fetch for movie genres
    api.fetchData("movieGenre")
      .then(data => setMovieGenres(data.genres))

    // data fetch for tv
    api.fetchData("", 1)
      .then(data => setTvShows(data.results))

    // data fetch for tv genres
    api.fetchData("tvGenre")
      .then(data => setTvGenres(data.genres))


  }, [])

  return (
    <div className={`page container bg-${theme}`}>
      <Banner />

      <Carousel
        id={"carousel-1"}
        title={"Movies"}
        datas={movies}
        genreArray={movieGenres}
      />

      <Carousel
        id={"carousel-2"}
        title={"TV Series"}
        datas={tvShows}
        genreArray={tvGenres}
      />

    </div>
  )
}

export default Home