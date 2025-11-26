import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { imgPathConverter } from '../utils/helpers';

const MiniCard = ({ actor, onPressFnc }) => {

    const imgPath = imgPathConverter(actor.img_path ? actor.img_path : actor.poster_path);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPressFnc()}
        >

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

        </TouchableOpacity>
    )
}

export default MiniCard

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