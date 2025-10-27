import { FlatList, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { MovieCard, SearchBarToggle } from '../components';
import { useEffect, useState } from 'react';
import * as api from '../api/api';

const ListScreen = ({ route }) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // get title and query from route params or set default values
    const { title = 'Recently Added Movies', query = 'pageSize=12&sort=id&type=desc' } = route.params || {};

    const fetchMovies = async () => {

        if (loading || !hasMore) return; // if already loading or no more data, return

        setLoading(true); // set loading state

        // append page parameter to query
        const pagedQuery = `${query}&page=${page}`;
        const endpoint = `get${title === 'Actors' ? 'Actor' : 'Movie'}`;

        try { // fetch data
            const response = await api.fetchData(endpoint, pagedQuery);
            const newData = response.data;

            if (newData.length === 0) {
                setHasMore(false);
            } else { // append new data to existing movies
                setMovies(prev => [...prev, ...newData]);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { // reset state when title or query changes
        setMovies([]);
        setPage(1);
        setHasMore(true);
    }, [title, query]);

    return (
        <View style={globalStyles.container}>

            <View style={globalStyles.searchBarToggle}>
                <SearchBarToggle />
            </View>


            <Text style={globalStyles.title}>{title}</Text>

            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard
                        key={item.id}
                        cardType="small"
                        {...item}
                    />
                )}
                keyExtractor={(item) => item.id?.toString()}
                key={2}
                numColumns={2}
                columnWrapperStyle={styles.row}
                onEndReached={fetchMovies}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <Text>Loading...</Text> : null}
                contentContainerStyle={styles.listContainer}
            />


        </View>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    row: {
        width: '100%',
        justifyContent: 'space-between',
    },
});
