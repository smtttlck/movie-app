import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import MovieCard from './MovieCard';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import Loading from './Loading';

// fixed card width and spacing between cards
const CARD_WIDTH = 250;
const ITEM_SPACING = 12;

// get screen width to calculate side padding
const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

const CarouselItem = React.memo(({ item, index, scrollX }) => {

    // calculate the base position of the item
    const base = index * (CARD_WIDTH + ITEM_SPACING);

    // animated style for scaling and opacity based on scroll position
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [base - (CARD_WIDTH + ITEM_SPACING), base, base + (CARD_WIDTH + ITEM_SPACING)];
        const scale = interpolate(scrollX.value, inputRange, [0.85, 1, 0.85]);
        const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]);
        return {
            transform: [{ scale }],
            opacity,
        };
    }, [base, scrollX]);

    return (
        <Animated.View key={item?.id ?? index} style={[styles.cardWrapper, animatedStyle]}>
            <MovieCard cardType={'big'} {...item} />
        </Animated.View>
    );
});

const MovieCarousel = ({ data = [] }) => {

    // shared value to track horizontal scroll position
    const scrollX = useSharedValue(0);

    // scroll handler to update scrollX on scroll events
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    // memoize content container style so it isn't re-created on each render
    const contentContainerStyle = useMemo(() => ({ paddingHorizontal: SIDE_PADDING }), []);

    return (
        <Animated.View>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + ITEM_SPACING}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={contentContainerStyle}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {
                    (data.length > 0) ? (
                        data.map((item, index) => (
                            <CarouselItem
                                key={item?.id != null ? String(item.id) : String(index)}
                                item={item}
                                index={index}
                                scrollX={scrollX}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyWrap}>
                            <Loading size='100' />
                        </View>
                    )
                }
            </Animated.ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: CARD_WIDTH,
        marginHorizontal: ITEM_SPACING / 2,
    },
    emptyWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 25,
        paddingVertical: 75,
    },
});

export default MovieCarousel;