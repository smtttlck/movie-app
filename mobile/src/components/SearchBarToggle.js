import { useState, useRef, useEffect } from 'react';
import { colors, fonts } from '../constants';
import { FontAwesome as Icon } from '@expo/vector-icons';
import * as api from '../api/api';
import MovieGallery from './MovieGallery';
import {
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

const BUTTON_SIZE = 46;
const ANIM_DURATION = 180;

const SearchBarToggle = ({ }) => {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const anim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null);

    // search results state
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        Animated.timing(anim, {
            toValue: open ? 1 : 0,
            duration: ANIM_DURATION,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start(() => {
            if (open) inputRef.current?.focus?.();
        });
    }, [open, anim]);

    useEffect(() => {
        if (query.length < 3) {
            // reset search results when query is cleared
            setMovies([]);
            setActors([]);
        } else {
            // fetch search results
            api.fetchData("getMovie", `name=${query}&page=1&pageSize=6`)
                .then(movies => setMovies(movies.data));
            api.fetchData("getActor", `name=${query}&page=1&pageSize=6`)
                .then(actors => setActors(actors.data));
        }
    }, [query])

    const containerWidth = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [BUTTON_SIZE, 320],
    });

    const borderRadius = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [BUTTON_SIZE / 2, 10],
    });

    const iconOpacity = anim.interpolate({
        inputRange: [0, 0.25],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const inputOpacity = anim.interpolate({
        inputRange: [0.25, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View>
            {/* Search Bar Container */}
            <Animated.View
                style={[
                    styles.container,
                    {
                        width: containerWidth,
                        borderRadius,
                    },
                ]}
            >

                {/* Search Icon Button */}
                <Animated.View style={[styles.roundButton, { opacity: iconOpacity }]}>

                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.touchableCircle}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel="Open search"
                    >
                        <Icon name="search" size={fonts.size.xl} color={colors.white2} />
                    </TouchableOpacity>

                </Animated.View>

                {/* Search Input and Back Button */}
                <Animated.View style={[styles.openWrap, { opacity: inputOpacity }]}>

                    <View style={styles.inputWrapOpen}>
                        <TextInput
                            ref={inputRef}
                            value={query}
                            onChangeText={setQuery}
                            placeholder={'Search...'}
                            placeholderTextColor={colors.white2}
                            style={styles.inputOpen}
                            returnKeyType="search"
                            accessible
                            accessibilityLabel="Search input"
                            autoCorrect={false}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            clearButtonMode="never"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            setOpen(false);
                            setQuery('');
                        }}
                        style={styles.backButton}
                        accessibilityRole="button"
                        accessibilityLabel="Close search"
                    >
                        <Icon name="close" size={fonts.size.xl} color={colors.white} />
                    </TouchableOpacity>


                </Animated.View>

            </Animated.View>

            {/* Movie Search Results */}
            {movies.length > 0 && (
                <View style={styles.searchResultsContainer}>
                    <MovieGallery title={"Movie"} data={movies} />
                </View>
            )}

            {/* Actor Search Results */}
            {actors.length > 0 && (
                <View style={styles.searchResultsContainer}>
                    <MovieGallery title={"Actor"} data={actors} />
                </View>
            )}

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: BUTTON_SIZE,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    roundButton: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableCircle: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: colors.opacityBlack,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 6,
    },
    backButton: {
        marginHorizontal: 6,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        backgroundColor: colors.opacityBlack,
        borderRadius: 10,
        borderColor: colors.grey,
        borderWidth: 0.75,
    },
    inputWrapOpen: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.opacityBlack,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 7,
        borderColor: colors.grey,
        borderWidth: 0.75,
    },
    inputOpen: {
        flex: 1,
        color: colors.white,
        fontSize: fonts.size.md,
        paddingVertical: 0,
        marginLeft: 6,
    },
    searchResultsContainer: {
        transform: [{ scale: 0.8 }],
        backgroundColor: colors.opacityBlack,
        outlineColor: colors.grey,
        outlineWidth: 4,
        borderRadius: 10,
        margin: -20,
    },    
});

export default SearchBarToggle;