import React from 'react'
import Card from './Card'

const List = ({ datas, type }) => {

    return (
        <section className="list w-100 d-flex flex-row flex-wrap justify-content-center">
            {datas?.map((data, index) => (
                <div
                    key={`data-${index}`}
                    className="col-auto my-1"
                >
                    {type === "movie" ? (
                        <Card
                            id={data.id}
                            name={data.name}
                            releaseDate={data.release_date}
                            rating={data.rating}
                            posterPath={`http://localhost:3001/${data.poster_path?.split("public\\")[1]?.split("\\").join('/')}`}
                            array={data.categories}
                        />
                    ) : (
                        <Card
                            id={data.id}
                            name={data.name}
                            posterPath={`http://localhost:3001/${data.img_path?.split("public\\")[1]?.split("\\").join('/')}`}
                            array={data.movies}
                        />
                    )}

                </div>
            ))}
        </section>
    )
}

export default List