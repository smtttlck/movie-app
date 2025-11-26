import { StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { useEffect, useState } from 'react';
import * as api from '../api/api';
import { UPLOAD_BASE_URL } from '@env';
import { MovieDetail } from '../components';
import Loading from '../components/Loading';

const MovieScreen = ({ route }) => {

    const [movie, setMovie] = useState(null);

    // get movieId from route params
    const movieId = route?.params.movieId;

    // data formatting
    let posterPath = '';
    if (movie && movie.poster_path) {
        posterPath = `${UPLOAD_BASE_URL}/${movie?.poster_path?.replace(/^public[\\/]/, '').split('\\').join('/')}`;
    }

    useEffect(() => {
        // data fetch for media type
        api.fetchData(`getMovie/${movieId}`)
            .then(movie => setMovie(movie))
    }, [movieId]);

    return (
        <View style={globalStyles.container}>

            {movie ? (
                <MovieDetail
                    posterPath={posterPath}
                    movie={movie}
                />
            ) : <Loading size='100' />}

        </View>
    )
}

export default MovieScreen

const styles = StyleSheet.create({});