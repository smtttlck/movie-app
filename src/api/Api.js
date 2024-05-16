// api key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDMwYWM5N2VmZDVhNmVjZDJlMjdkZTIzZTAwNjcyNSIsInN1YiI6IjY1MDJlNzY0ZTBjYTdmMDEyZWI5ZDIzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrZ1nEvB8N_aA9d9PSksS8x00LxLB6qCdA5X7rmkF40'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};

// main fetch function
export const fetchData = async (option, id) => {
    let url
    // Available trading options
    switch (option) {
        case "person": // person detail
            url = `https://api.themoviedb.org/3/person/${id}?language=en-US`
            break
        case "personCredits": // person credits
            url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`
            break
        case "movies": // movies
            url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${id}`
            break
        case "movieDetail": // movie detail
            url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
            break
        case "search": // search movie
            url = `https://api.themoviedb.org/3/search/multi?query=${id}&include_adult=false&language=en-US`
            break
        case "movieCredits": // movie credits
            url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
            break
        case "tvDetail": // tv show detail
            url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`
            break
        case "tvCredits": // tv show credits
            url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`
            break
        case "movieGenre": // current genre list for movie
            url = `https://api.themoviedb.org/3/genre/movie/list?language=en`
            break
        case "tvGenre": // current genre list for tv
            url = `https://api.themoviedb.org/3/genre/tv/list?language=en`
            break            
        case "movieVideo": // movie video
            url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
            break            
        case "tvVideo": // tv video
            url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
            break            
        default: // tv shows
            url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${id}`
            break
    }
    // fetch and return datas
    return await fetch(url, options)
                    .then(response => response.json())
                    .catch(err => console.error(err))
}