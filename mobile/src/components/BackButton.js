import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const BackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.button}
        >
            <Icon
                name="chevron-back"
                size={fonts.size.xxl}
                color={colors.white}
            />
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 30,
        left: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: colors.grey,
        borderRadius: 30,
        zIndex: 10,
    },
})