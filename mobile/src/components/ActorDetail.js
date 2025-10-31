import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';
import { globalStyles } from '../styles/globalStyles';
import MiniCard from './MiniCard';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../constants';
import { FontAwesome6 as Icon } from '@expo/vector-icons/';

const ActorDetail = ({ imgPath, actor, movies }) => {

    // navigation hook
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <BackButton />

            <ScrollView style={styles.scrollContainer}>

                {imgPath && (
                    <Image
                        source={{ uri: imgPath }}
                        style={styles.image}
                    />
                )}

                <View style={styles.textContainer}>
                    <Text style={[globalStyles.title, styles.actorName]}>{actor.name}</Text>
                    <Text style={globalStyles.subText}>
                        <Icon name="cake-candles" size={fonts.size.sm} color={colors.white2} />
                        {actor.birthday}
                    </Text>
                    <Text style={globalStyles.subText}>
                        <Icon name="location-dot" size={fonts.size.sm} color={colors.red} />
                        {actor.place_of_birth}
                    </Text>
                </View>


                <Text style={globalStyles.title}>Known For</Text>
                <ScrollView
                    horizontal
                    style={styles.actorsContainer}
                >
                    {movies.map((movie, index) => (
                        <MiniCard
                            key={index}
                            actor={movie}
                            onPressFnc={() => navigation.navigate('MovieScreen', { movieId: movie.id })}
                        />
                    ))}
                </ScrollView>

                <Text style={globalStyles.title}>Biography</Text>
                <Text style={styles.subText}>{actor.biography}</Text>

            </ScrollView>
        </View>
    )
}

export default ActorDetail

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    actorName: {
        fontSize: fonts.size.xxl,
        fontWeight: fonts.weight.bold,
        marginBottom: 4,
    },
    textContainer: {
        marginVertical: 16,
        alignItems: 'center',
    },
    subText: {
        fontSize: fonts.size.sm,
        color: colors.white2,
        marginTop: 4,
    },
    scrollContainer: {
        padding: 16,
    },
    image: {
        flex: 1,
        width: '50%',
        height: 250,
        resizeMode: 'stretch',
        borderRadius: 8,
        alignSelf: 'center',
        borderColor: colors.grey,
        borderWidth: 0.5,
    },
    actorsContainer: {
        height: 100,
        marginTop: 4,
        marginBottom: 32,
        flexDirection: 'row',
    },
})