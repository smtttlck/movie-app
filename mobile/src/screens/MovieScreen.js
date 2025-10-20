import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { useEffect, useState } from 'react';
import * as api from '../api/api';
import { UPLOAD_BASE_URL } from '@env';
import { colors, fonts } from '../constants';

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
                <ScrollView style={styles.container}>

                    {posterPath && (
                        <Image
                            source={{ uri: posterPath }}
                            style={styles.image}
                        />
                    )}

                    <View style={styles.textContainer}>
                        <Text style={globalStyles.title}>{movie.name}</Text>
                        <Text style={globalStyles.subText}>{movie.rating} ⭐   •    {movie.release_date}</Text>

                        <View style={styles.categories}>
                            {movie.categories.map((category, index) => (
                                <View
                                    key={index}
                                    style={globalStyles.badgeContainer}
                                >
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={globalStyles.badgeText}
                                    >
                                        {category.name}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <Pressable style={styles.trailerButton}>
                            <Text style={styles.buttonText}>Watch Trailer</Text>
                        </Pressable>

                        <View style={styles.actorsContainer}>
                            <Text>Actor cards</Text>
                        </View>

                        <View>
                            <Text style={styles.overviewText}>
                                {movie.overview}
                            </Text>
                        </View>

                    </View>

                </ScrollView>
            ) : null}

        </View>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        height: 460,
        resizeMode: 'cover',
    },
    textContainer: {
        paddingHorizontal: 16,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
        width: '100%',
    },
    trailerButton: {
        backgroundColor: colors.grey,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.size.md,
        fontWeight: fonts.weight.bold,
    },
    actorsContainer: {
        backgroundColor: colors.pink,
        height: 100,
        marginTop: 16,
        marginBottom: 32,
    },
    overviewText: {
        color: colors.white2,
        fontSize: fonts.size.md,
    },
})