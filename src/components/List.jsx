import React from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

const List = ({ datas, genreArray }) => {

    const navigate = useNavigate()

    return (
        <div className="list w-100 d-flex flex-row flex-wrap justify-content-center">
            {datas?.map((data, index) => (
                <div
                    key={`data-${index}`}
                    className="col-auto my-1"
                >
                    <Card
                        id={data?.id}
                        type={data?.media_type || ((data?.title) ? "movie" : "tv")}
                        title={data?.title || data?.name}
                        releaseDate={(data.release_date || data.first_air_date)?.split("-")[0]}
                        voteAverage={data.vote_average?.toString().slice(0, 3)}
                        posterPath={data?.poster_path}
                        genres={data.genres || data.genre_ids}
                        genreArray={genreArray}
                    />
                </div>
            ))}
        </div>
    )
}

export default List