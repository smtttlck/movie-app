import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SmallCard = ({ id, cardType, text, subText, image_path }) => {

    const { theme } = useSelector(state => state.theme)

    const navigate = useNavigate()

    return (
        <div
            className={`small-card ${theme == "dark" ? "white" : "pink"}-border rounded`}
            onClick={() => navigate(cardType == "actor" ? `/actor/${id}` : `/detail/${cardType}/${id}`)}
        >
            <div className="image">
                <img className="w-100" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${image_path})`} />
            </div>
            <div className="info  pb-1">
                <p className={`character-name ${(theme == "light") && "pink"} mx-2 my-0`}>
                    {text}
                </p>
                <sub className={`actor-name ${(theme == "light") && "pink"} mx-2`}>
                    {subText}
                </sub>
            </div>
        </div>
    )
}

export default SmallCard