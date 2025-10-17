import { ScrollView, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import { MovieCarousel, MovieGallery } from '../components';
import * as api from '../api/api';
import { useEffect, useState } from 'react';

const HomeScreen = () => {

    const [topRatingMovies, setTopRatingMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [lastMovies, setLastMovies] = useState([]);


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

        <View style={globalStyles.container}>

            <ScrollView>

                <MovieCarousel
                    data={topRatingMovies}
                />

                <MovieGallery
                    title={'Top Rated Movie'}
                    data={topRatingMovies}
                />

                <MovieGallery
                    title={'Recently Released Movies'}
                    data={newMovies}
                />

                <MovieGallery
                    title={'Recently Added Movies'}
                    data={lastMovies}
                />

            </ScrollView>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})