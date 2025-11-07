import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MovieCard from './MovieCard';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants';
import ActorCard from './ActorCard';

const MovieGallery = ({ title, data = [], onViewAll }) => {

    // renderItem wrapped in useCallback to prevent re-renders
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemWrap}>
                {title === "Actor" ? (
                    <ActorCard {...item} />
                ) : (
                    <MovieCard cardType={'small'} {...item} />
                )}
            </View>
        ),
        []
    );

    const keyExtractor = useCallback((item, index) => { // handle missing id gracefully
        return item?.id != null ? String(item.id) : String(index);
    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={globalStyles.title}>{title}</Text>

                {onViewAll && (
                    <TouchableOpacity
                        onPress={onViewAll}
                        accessibilityRole="button"
                        accessibilityLabel={`View all ${title}`}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Text style={[styles.viewAllText, globalStyles.buttonText]}>View All</Text>
                    </TouchableOpacity>
                )}

            </View>

            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyText}>No items</Text>
                    </View>
                )}
                initialNumToRender={5}
                maxToRenderPerBatch={8}
                windowSize={5}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    header: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    viewAllText: {
        marginTop: 7,
    },
    listContent: {
        paddingHorizontal: 12,
    },
    itemWrap: {
        marginRight: 15,
    },
    emptyWrap: {
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    emptyText: {
        color: colors.white2,
    },
});

export default React.memo(MovieGallery);