import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../constants';
import { UPLOAD_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const MovieCard = ({ cardType, id, name, release_date, rating, poster_path, categories }) => {

  // navigation hook
  const navigation = useNavigation();

  // data formatting
  const releaseDate = release_date.split('-')[0];
  const posterPath = `${UPLOAD_BASE_URL}/${poster_path.replace(/^public[\\/]/, '').split('\\').join('/')}`;

  // determine card dimensions based on cardType
  const cardWidth = cardType === 'big' ? 250 : 150;
  const cardHeight = cardType === 'big' ? 400 : 250;

  // overlay height fixed so title won't resize it
  const overlayHeight = cardType === 'big' ? 120 : 95;

  // limit categories shown based on card type
  const displayedCategories = (categories || []).slice(0, cardType === 'big' ? 3 : 2);

  // max width for each category box so long names don't blow out layout
  const categoryMaxWidth = cardType === 'big' ? cardWidth * 0.6 : cardWidth * 0.5;

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
            {releaseDate} • ⭐ {rating}
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