import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import Button from "./Button";
import Loader from "./Loader";

const Carousel = ({ title, datas, genreArray, navigateParameter }) => {

    // carousel settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className="carousel my-3">
            {!datas ? <Loader /> :
                <>
                    <div className="slider-header mb-2 d-flex justify-content-between align-items-center">
                        <h1 className="carousel-title pink">
                            {title}
                        </h1>
                        <Button
                            url={`/media/${navigateParameter}/1`}
                            text={'Show More'}
                        />
                    </div>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {datas?.map((data, index) => (
                                    <div key={`${data.id}-${index}`}>
                                        <Card
                                            id={data.id}
                                            type={data.media_type || (data.title ? "movie" : "tv")}
                                            title={data.title || data.name}
                                            releaseDate={(data.release_date || data.first_air_date).split("-")[0]}
                                            voteAverage={data.vote_average.toString().slice(0, 3)}
                                            posterPath={data.poster_path}
                                            genres={data.genre_ids}
                                            genreArray={genreArray}
                                        />
                                    </div>
                            ))}
                        </Slider>
                    </div>
                </>
            }
        </div>

    )
}

export default Carousel;
