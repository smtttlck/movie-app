import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

const Loading = ({ size = "large"}) => {
    return (
        <View>
            <ActivityIndicator size={size} color={colors.pink} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})