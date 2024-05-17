import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const SmallCard = ({ id, cardType, text, subText, image_path }) => {

    const { theme } = useSelector(state => state.theme)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    return (
        <div
            className={`small-card ${theme == "dark" ? "white" : "pink"}-outline rounded`}
            onClick={() => navigate(cardType == "actor" ? `/actor/${id}` : `/detail/${cardType}/${id}`)}
        >
            {isLoading && <Loader />}
            <div className="image">
                <img
                    className="w-100"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${image_path})`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="info pb-1">
                <p className={`character-name ${(theme == "light") && "pink"} mx-2 my-0`}>
                    {text}
                </p>
                <p className={`actor-name ${(theme == "light") && "pink"} mx-2`}>
                    {subText}
                </p>
            </div>
        </div>
    )
}

export default SmallCard