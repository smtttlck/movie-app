import { Image, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../constants'
import { imgPathConverter } from '../utils/helpers'

const ActorMiniCard = ({ actor }) => {

    const imgPath = imgPathConverter(actor.img_path);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imgPath }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.actorName} numberOfLines={1} ellipsizeMode="tail">
                    {actor.name}
                </Text>
                <Text style={styles.characterName} numberOfLines={1} ellipsizeMode="tail">
                    {actor.characterName}
                </Text>
            </View>
        </View>
    )
}

export default ActorMiniCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.opacityBlack,
        width: 250,
        height: 100,
        marginRight: 12,
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        outlineColor: colors.grey,
        outlineWidth: 0.2,
    },
    image: {
        width: 84,
        height: 84,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    actorName: {
        color: colors.white,
        fontSize: fonts.size.md,
        fontWeight: fonts.weight.bold,
    },
    characterName: {
        color: colors.white2,
        fontSize: fonts.size.sm,
        fontWeight: fonts.weight.thin,
    },
})