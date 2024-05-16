import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import { useParams } from 'react-router-dom'
import ActorCard from '../components/ActorCard'

const Actor = () => {

    const { theme } = useSelector(state => state.theme)

    const { id } = useParams()

    const [actor, setActor] = useState([])
    const [credits, setCredits] = useState([])

    useEffect(() => {
        // data fetch for actor
        api.fetchData("person", id)
            .then(data => setActor(data))

        // data fetch for actor's credits
        api.fetchData("personCredits", id)
            .then(data => setCredits(data.cast))

    }, [id])

    return (
        <div className={`page container bg-${theme} d-flex`}>
            
            <ActorCard 
                actor={actor}
                credits={credits}
            />

        </div>
    )
}

export default Actor