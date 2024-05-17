import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import Loader from '../components/Loader'

const Home = () => {

  const { theme } = useSelector(state => state.theme)

  const [movies, setMovies] = useState(null)
  const [moviesNowPlaying, setMoviesNowPlaying] = useState(null)
  const [movieGenres, setMovieGenres] = useState([])
  const [tvShows, setTvShows] = useState(null)
  const [tvShowsOnAir, setTvShowsOnAir] = useState(null)
  const [tvGenres, setTvGenres] = useState([])

  useEffect(() => {
    // data fetch for movie genres
    api.fetchData("movieGenre")
      .then(data => {
        setMovieGenres(data.genres)
        // data fetch for top rated movies
        api.fetchData("movieTopRated", 1)
          .then(data => setMovies(data.results));

        // data fetch for now playing movies
        api.fetchData("movieNowPlaying", 1)
          .then(data => setMoviesNowPlaying(data.results))
      })


    // data fetch for tv genres
    api.fetchData("tvGenre")
      .then(data => {
        setTvGenres(data.genres)
        // data fetch for toprated tv
        api.fetchData("tvTopRated", 1)
          .then(data => setTvShows(data.results))
        // data fetch for toprated tv
        api.fetchData("tvOnTheAir", 1)
          .then(data => setTvShowsOnAir(data.results))
      })


  }, [])



  return (
    <div className={`page container bg-${theme}`}>
      <Banner />

      <Carousel 
          title={"Top Rated Movies"}
          datas={movies}
          genreArray={movieGenres}
          navigateParameter={"movieTopRated"}
      />

      <Carousel 
          title={"Now Playing Movies"}
          datas={moviesNowPlaying}
          genreArray={movieGenres}
          navigateParameter={"movieNowPlaying"}
      />

      <Carousel 
          title={"Top Rated Tv Shows"}
          datas={tvShows}
          genreArray={tvGenres}
          navigateParameter={"tvTopRated"}
      />

      <Carousel 
          title={"On The Air Tv Shows"}
          datas={tvShowsOnAir}
          genreArray={tvGenres}
          navigateParameter={"tvOnTheAir"}
      />

    </div>
  )
}

export default Home