// api key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDMwYWM5N2VmZDVhNmVjZDJlMjdkZTIzZTAwNjcyNSIsInN1YiI6IjY1MDJlNzY0ZTBjYTdmMDEyZWI5ZDIzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrZ1nEvB8N_aA9d9PSksS8x00LxLB6qCdA5X7rmkF40'

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