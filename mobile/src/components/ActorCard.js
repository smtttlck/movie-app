import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { imgPathConverter } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../constants';

const ActorCard = ({ id, name, img_path }) => {


    // navigation hook
    const navigation = useNavigation();

    // data formatting and defaults
    const imgPath = !img_path ? 'default_actor_image.png' : imgPathConverter(img_path);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ActorScreen', { actorId: id })}
        >
            <Image
                source={{ uri: imgPath }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

export default ActorCard

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 3,
        paddingVertical: 10,
        flex: 1,
        marginHorizontal: 5,
        width: 100,
    },
    cardImage: {
        width: '100%',
        height: 110,
        borderRadius: 10,
        marginBottom: 8,
        borderColor: colors.grey,
        borderWidth: 0.5,
    },
    name: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: fonts.weight.bold,
        fontSize: fonts.size.sm,
        maxWidth: '100%',
    },
})