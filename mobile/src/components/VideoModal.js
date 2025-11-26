import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoModal = ({ videoId, visible, onClose }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={fonts.size.xxl} color={colors.white} />
                    </TouchableOpacity>
                    <YoutubePlayer
                        height={220}
                        play={true}
                        videoId={videoId}
                    />
                </View>
            </View>

        </Modal>
    )
}

export default VideoModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.opacityBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 12,
    outlineColor: colors.grey,
    outlineWidth: 0.75,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 6,
    backgroundColor: colors.grey,
    borderRadius: 20,
    marginBottom: 8,
  },
})