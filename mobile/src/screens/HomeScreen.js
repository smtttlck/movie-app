import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import testData from '../../assets/test_assets/testData';
import { MovieCarousel, MovieGallery, SearchBarToggle } from '../components';

const HomeScreen = () => {

    const data = testData.data;

    return (

        <View style={globalStyles.container}>

            <ScrollView>

                <MovieCarousel
                    data={data}
                />

                <MovieGallery
                    title={'Top Rated Movie'}
                    data={data}
                />

                <MovieGallery
                    title={'Top Rated Movie'}
                    data={data}
                />

                <MovieGallery
                    title={'Top Rated Movie'}
                    data={data}
                />

            </ScrollView>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({ })