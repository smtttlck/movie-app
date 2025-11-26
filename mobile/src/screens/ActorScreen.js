import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import * as api from '../api/api';
import { UPLOAD_BASE_URL } from '@env';
import { ActorDetail } from '../components';
import Loading from '../components/Loading';

const ActorScreen = ({ route }) => {

    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);

    // get actorId from route params
    const actorId = route?.params.actorId;

    // data formatting
    let img_path = '';
    if (actor && actor.img_path) {
        img_path = `${UPLOAD_BASE_URL}/${actor?.img_path?.replace(/^public[\\/]/, '').split('\\').join('/')}`;
    }

    useEffect(() => {
        // data fetch for actor
        api.fetchData(`getActor/${actorId}`)
            .then(datas => {
                setActor(datas.data);
                setMovies(datas.movies);
            })
    }, [actorId]);

    return (
        <View style={globalStyles.container}>

            {actor ? (
                <ActorDetail
                    imgPath={img_path}
                    actor={actor}
                    movies={movies}
                />
            ) : <Loading size='100' />}

        </View>
    )
}

export default ActorScreen

const styles = StyleSheet.create({})