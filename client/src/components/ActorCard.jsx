import React from 'react'
import { useSelector } from 'react-redux'
import SmallCard from './SmallCard'

const ActorCard = ({ actor, movies }) => {

    const { theme } = useSelector(state => state.theme)

    return (
        <div className="actor-card d-md-flex w-100 py-5 pt-md-0">
            <div className="personal-info w-lg-25">
                {/* actor poster */}
                <img src={`http://localhost:3001/${actor?.img_path?.split("public\\")[1].split("\\").join('/')}`} alt={actor.name} />
                {/* actor's gender */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"} mt-2`}>
                    Gender
                </h5>
                <p className={(theme == "light") ? "pink" : " "}>
                    {actor?.gender == 1 ? "Female" : "Male"}
                </p>
                {/* actor's birthday */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"}`}>
                    Birthday
                </h5>
                <p className={(theme == "light") ? "pink" : " "}>
                    {actor?.birthday}
                </p>
                {/* actor's birthplace */}
                <h5 className={`${(theme == "light") ? "pink-shadow" : "pink"}`}>
                    Place of Birth
                </h5>
                <p className={(theme == "light") ? "pink" : " "}>
                    {actor?.place_of_birth}
                </p>
            </div>
            <div className="text w-75 m-auto ps-2">
                {/* actor's name */}
                <h1 className={`${(theme == "light") ? "pink-shadow" : "pink"} mb-2`}>
                    {actor?.name}
                </h1>
                {/* actor's biography */}
                <div className="overview">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Biography
                    </h5>
                    <p className={(theme == "light") ? "pink" : " "}>
                        {actor?.biography}
                    </p>
                </div>
                {/* movies and tv shows featuring the actor */}
                <div className="credits">
                    <h5 className={(theme == "light") ? "pink-shadow" : "pink"}>
                        Movies
                    </h5>
                    <div className="actor-container d-flex flex-wrap">
                        {movies?.map((movie, index) => (
                            index < 4 && (
                                <div
                                    key={`credit-${index}`}
                                    className="col-lg-3 col-6 mb-4"
                                >
                                    <SmallCard
                                        id={movie?.id}
                                        text={movie?.name}
                                        subText={movie?.characterName}
                                        image_path={`http://localhost:3001/${movie?.poster_path?.split("public\\")[1].split("\\").join('/')}`}
                                        targetPageType={"detail"}
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