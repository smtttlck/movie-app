import React from 'react'
import { useSelector } from 'react-redux'
import SmallCard from './SmallCard'

const ActorCard = ({ actor, credits }) => {

    const { theme } = useSelector(state => state.theme)

    return (
        <div className="actor-card d-lg-flex">
            <div className="personal-info w-lg-25 text-center">
                {/* actor poster */}
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${actor?.profile_path}`} alt="" />
                {/* actor's gender */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"} mt-2`}>
                    Gender
                </h5>
                <p className={(theme == "light") && "pink"}>
                    {actor?.gender == 1 ? "Female" : "Male"}
                </p>
                {/* actor's birthdat */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"}`}>
                    Birthday
                </h5>
                <p className={(theme == "light") && "pink"}>
                    {actor?.birthday}
                </p>
                {/* actor's birthplace */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"}`}>
                    Place of Birth
                </h5>
                <p className={(theme == "light") && "pink"}>
                    {actor?.place_of_birth}
                </p>
            </div>
            <div className="text w-lg-75 mx-2">
                {/* actor's name */}
                <h1 className={`${(theme == "light") ? "pink-shadow" : "pink"} mb-2`}>
                    {actor?.name}
                </h1>
                {/* actor's biography */}
                <div className="overview">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Biography
                    </h5>
                    <p className={(theme == "light") && "pink"}>
                        {actor?.biography}
                    </p>
                </div>
                {/* movies and tv shows featuring the actor */}
                <div className="credits">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Credits
                    </h5>
                    <div className="actor-container d-flex">
                        {credits?.map((credit, index) => (
                            index < 4 && (
                                <div
                                    key={`credit-${index}`}
                                    className="col-3"
                                >
                                    <SmallCard
                                        id={credit.id}
                                        cardType={credit.media_type}
                                        text={credit.media_type == "movie" ? credit.title : credit.name}
                                        subText={credit.character}
                                        image_path={credit.poster_path}
                                    />
                                </div>)
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActorCard