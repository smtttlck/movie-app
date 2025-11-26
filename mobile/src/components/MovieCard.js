import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { 
  getCardDimensions, 
  getCategoryMaxWidth, 
  getDisplayedCategories, 
  getOverlayHeight, 
  imgPathConverter, 
  ratingFormatter, 
  yearExtractor 
} from '../utils/helpers';

const MovieCard = ({ cardType, id, name, release_date, rating, poster_path, categories }) => {

  // navigation hook
  const navigation = useNavigation();

  // data formatting
  const releaseDate = yearExtractor(release_date);
  const posterPath = imgPathConverter(poster_path);
  const { width: cardWidth, height: cardHeight } = getCardDimensions(cardType);
  const overlayHeight = getOverlayHeight(cardType);
  const displayedCategories = getDisplayedCategories(categories, cardType);
  const categoryMaxWidth = getCategoryMaxWidth(cardType);
  const formattedRating = ratingFormatter(rating);


  return (

    <TouchableOpacity
      style={[
        styles.card,
        { width: cardWidth, height: cardHeight }
      ]}
      onPress={() => navigation.navigate('MovieScreen', { movieId: id })}
    >
      <ImageBackground
        source={{ uri: posterPath }}
        style={styles.imageBackground}
      >

        <View style={[
          styles.overlay,
          { height: overlayHeight },
          cardType === 'big'
            ? { justifyContent: 'center', alignItems: 'center' }
            : { justifyContent: 'flex-start', alignItems: 'flex-start' }
        ]}>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.title,
              { fontSize: cardType === 'big' ? fonts.size.xl : fonts.size.md },
              cardType === 'big' ? { textAlign: 'center' } : { textAlign: 'left' }
            ]}
          >
            {name}
          </Text>

          <Text style={[globalStyles.subText, cardType === 'big' ? { textAlign: 'center' } : { textAlign: 'left' }]}>
            {releaseDate} • <Icon name="star" size={fonts.size.sm} color={colors.yellow} /> {formattedRating}
          </Text>

          <View style={[
            styles.categories,
            cardType === 'big' ? { justifyContent: 'center' } : { justifyContent: 'flex-start' }
          ]}>
            {displayedCategories.map((category, index) => (
              <View
                key={index}
                style={[
                  globalStyles.badgeContainer,
                  { maxWidth: categoryMaxWidth }
                ]}
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

        </View>

      </ImageBackground>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    aspectRatio: 2 / 3,
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: colors.opacityBlack,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '100%',
  },
  title: {
    fontWeight: fonts.weight.bold,
    color: colors.white,
    lineHeight: 18,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    width: '100%',
  },
});

export default MovieCard;