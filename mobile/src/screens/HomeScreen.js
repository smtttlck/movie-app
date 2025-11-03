import { ScrollView, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import { MovieCarousel, MovieGallery, SearchBarToggle } from '../components';
import * as api from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    // navigation hook
    const navigation = useNavigation();

    // state hooks
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

            <View style={globalStyles.searchBarToggle}>
                <SearchBarToggle />
            </View>

            <ScrollView>

                <MovieCarousel
                    data={topRatingMovies}
                />

                <MovieGallery
                    title={'Top Rated Movie'}
                    data={topRatingMovies}
                    onViewAll={() => navigation.navigate('MovieListScreen', { title: 'Top Rated Movies', query: 'pageSize=12&sort=rating&type=desc' })}
                />

                <MovieGallery
                    title={'Recently Released Movies'}
                    data={newMovies}
                    onViewAll={() => navigation.navigate('MovieListScreen', { title: 'Recently Released Movies', query: 'pageSize=12&sort=release_date&type=desc' })}
                />

                <MovieGallery
                    title={'Recently Added Movies'}
                    data={lastMovies}
                    onViewAll={() => navigation.navigate('MovieListScreen', { title: 'Recently Added Movies', query: 'pageSize=12&sort=id&type=desc' })}
                />

            </ScrollView>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})