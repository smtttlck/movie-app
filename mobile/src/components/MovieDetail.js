import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { colors, fonts } from '../constants'
import ActorMiniCard from './ActorMiniCard'
import BackButton from './BackButton'
import { FontAwesome as Icon } from '@expo/vector-icons';

const MovieDetail = ({ posterPath, movie }) => {
    return (
        <View>
            <BackButton />

            <ScrollView style={styles.container}>


                {posterPath && (
                    <Image
                        source={{ uri: posterPath }}
                        style={styles.image}
                    />
                )}

                <View style={styles.textContainer}>
                    <Text style={globalStyles.title}>{movie.name}</Text>
                    <Text style={globalStyles.subText}>
                        {movie.rating} <Icon name="star" size={fonts.size.sm} color={colors.yellow} />   •    {movie.release_date}
                    </Text>

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
                        <Text style={styles.buttonText}>
                            <Icon name="play" size={fonts.size.md} color={colors.white} />  Watch Trailer
                        </Text>
                    </Pressable>

                    <ScrollView
                        horizontal
                        style={styles.actorsContainer}
                    >
                        {movie.actors.map((actor, index) => (
                            <ActorMiniCard key={index} actor={actor} />
                        ))}
                    </ScrollView>

                    <View>
                        <Text style={styles.overviewText}>
                            {movie.overview}
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: 460,
        resizeMode: 'stretch',
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
        height: 100,
        marginTop: 16,
        marginBottom: 32,
        flexDirection: 'row',
    },
    overviewText: {
        color: colors.white2,
        fontSize: fonts.size.md,
    },
})