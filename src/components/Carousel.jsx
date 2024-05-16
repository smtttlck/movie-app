import React, { useEffect } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

const Carousel = ({ id, title, datas, genreArray }) => {

    const navigate = useNavigate()

    useEffect(() => {
        // carousel function
        let items = document.querySelectorAll('.carousel .carousel-item')
        items.forEach((el) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        }, [])
    })

    return (
        <div className="container text-center my-3">
            <div className="carousel-header d-flex justify-content-between">
                {/* carousel title */}
                <h1>Trend {title}</h1>
                {/* carousel buttons */}
                <div className="carousel-buttons d-flex">
                    <a className="carousel-control-prev bg-transparent w-aut" href={`#${id}`} role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a className="carousel-control-next bg-transparent w-aut" href={`#${id}`} role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
            {/* carousel items */}
            <div className="row mx-auto my-auto justify-content-center">
                <div id={id} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        {datas?.map((data, index) => (
                            <div
                                key={`data-${index}`}
                                className={`carousel-item ${(index == 1) ? "active" : ""}`}
                                onClick={() => navigate(`/detail/${data.media_type}/${data.id}`)}
                            >
                                <div className="col-md-auto">
                                    <Card
                                        id={data.id}
                                        type={data.media_type}
                                        title={(data.media_type == "movie") ? data.title : data.name}
                                        releaseDate={((data.media_type == "movie") ? data.release_date : data.first_air_date).split("-")[0]}
                                        voteAverage={data.vote_average.toString().slice(0, 3)}
                                        posterPath={data.poster_path}
                                        genres={data.genre_ids}
                                        genreArray={genreArray}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel