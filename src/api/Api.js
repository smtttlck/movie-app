// api key
const apiKey = import.meta.env.VITE_API_KEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};

// Available trading options
const urls = {
    "person": id => `person/${id}?language=en-US`,
    "personCredits": id => `person/${id}/combined_credits?language=en-US`,
    "movie": id => `trending/movie/day?language=en-US&page=${id}`,
    "movieTopRated": id => `movie/top_rated?language=en-US&page=${id}`,
    "movieNowPlaying": id => `movie/now_playing?language=en-US&page=${id}`,
    "movieDetail": id => `movie/${id}?language=en-US`,
    "search": query => `search/multi?query=${query}&include_adult=false&language=en-US`,
    "movieCredits": id => `movie/${id}/credits?language=en-US`,
    "tvDetail": id => `tv/${id}?language=en-US`,
    "tvCredits": id => `tv/${id}/credits?language=en-US`,
    "movieGenre": () => `genre/movie/list?language=en`,
    "tvGenre": () => `genre/tv/list?language=en`,
    "movieVideo": id => `movie/${id}/videos?language=en-US`,
    "tvVideo": id => `movie/${id}/videos?language=en-US`,
    "tvOnTheAir": id => `tv/on_the_air?language=en-US&page=${id}`,
    "tvTopRated": id => `tv/top_rated?language=en-US&page=${id}`,
    "tv": id => `trending/tv/day?language=en-US&page=${id}`
};

// main fetch function
export const fetchData = async (option, id) => {
    // create fetch url
    const url = `https://api.themoviedb.org/3/${urls[option](id)}`   
    // fetch and return datas
    return await fetch(url, options)
                    .then(response => response.json())
                    .catch(err => console.error(err))
}