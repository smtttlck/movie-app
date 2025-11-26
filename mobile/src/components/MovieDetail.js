import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import MiniCard from './MiniCard';
import BackButton from './BackButton';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ratingFormatter, youtubeIdExtractor } from '../utils/helpers';
import { useState } from 'react';
import VideoModal from './VideoModal';

const MovieDetail = ({ posterPath, movie }) => {

    // modal visibility state
    const [modalVisible, setModalVisible] = useState(false);

    // navigation hook
    const navigation = useNavigation();

    const formattedRating = ratingFormatter(movie.rating);

    return (
        <View>

            <VideoModal
                videoId={youtubeIdExtractor(movie.trailer_url)}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <BackButton />

            <ScrollView style={styles.container}>


                {posterPath && (
                    <Image
                        source={{ uri: posterPath }}
                        style={styles.image}
                    />
                )}

                <View style={styles.textContainer}>
                    <Text style={[globalStyles.title, styles.movieName]}>{movie.name}</Text>
                    <Text style={globalStyles.subText}>
                        {formattedRating} <Icon name="star" size={fonts.size.sm} color={colors.yellow} />   •    {movie.release_date}
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

                    <Pressable 
                        style={styles.trailerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>
                            <Icon name="play" size={fonts.size.md} color={colors.white} />  
                            Watch Trailer
                        </Text>
                    </Pressable>

                    <Text style={globalStyles.title}>Main Actors</Text>
                    <ScrollView
                        horizontal
                        style={styles.actorsContainer}
                    >
                        {movie.actors.map((actor, index) => (
                            <MiniCard
                                key={index}
                                actor={actor}
                                onPressFnc={() => navigation.navigate('ActorScreen', { actorId: actor.id })}
                            />
                        ))}
                    </ScrollView>

                    <Text style={globalStyles.title}>Overview</Text>
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
    movieName: {
        fontSize: fonts.size.xxl,
        fontWeight: fonts.weight.bold,
        marginBottom: 4,
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
        marginVertical: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.size.md,
        fontWeight: fonts.weight.bold,
    },
    actorsContainer: {
        height: 100,
        marginTop: 4,
        marginBottom: 16,
        flexDirection: 'row',
    },
    overviewText: {
        color: colors.white2,
        fontSize: fonts.size.md,
    },
})