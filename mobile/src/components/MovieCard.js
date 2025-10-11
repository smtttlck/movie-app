import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../constants';

const MovieCard = ({ cardType, id, name, releaseDate, rating, posterPath, array }) => {

  // determine card dimensions based on cardType
  const cardWidth = cardType === 'big' ? 250 : 150;
  const cardHeight = cardType === 'big' ? 400 : 250;

  // overlay height fixed so title won't resize it
  const overlayHeight = cardType === 'big' ? 120 : 95;

  // limit categories shown based on card type
  const categories = (array || []).slice(0, cardType === 'big' ? 3 : 2);

  // max width for each category box so long names don't blow out layout
  const categoryMaxWidth = cardType === 'big' ? cardWidth * 0.6 : cardWidth * 0.5;

  return (

    <TouchableOpacity
      style={[
        styles.card,
        { width: cardWidth, height: cardHeight }
      ]}
    >
      <ImageBackground source={{ uri: posterPath }} style={styles.imageBackground}>

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

          <Text style={[styles.subText, cardType === 'big' ? { textAlign: 'center' } : { textAlign: 'left' }]}>
            {releaseDate} • ⭐ {rating}
          </Text>

          <View style={[
            styles.categories,
            cardType === 'big' ? { justifyContent: 'center' } : { justifyContent: 'flex-start' }
          ]}>
            {categories.map((category, index) => (
              <View
                key={index}
                style={[
                  styles.categoryContainer,
                  { maxWidth: categoryMaxWidth }
                ]}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.categoryText, { fontSize: fonts.size.xsm }]}
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
  subText: {
    fontSize: fonts.size.xsm,
    color: colors.white2,
    marginTop: 4,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    width: '100%',
  },
  categoryContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
    backgroundColor: colors.pink,
    minWidth: 0,
  },
  categoryText: {
    color: colors.white,
    flexShrink: 1,
  },
});

export default MovieCard;