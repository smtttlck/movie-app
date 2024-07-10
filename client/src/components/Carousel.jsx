import React from "react"
import Slider from "react-slick"
import Card from "./Card"
import Loader from "./Loader"
import { useNavigate } from "react-router-dom"

const Carousel = ({ title, datas, navigateParameter }) => {

    
    const navigate = useNavigate()

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
        <section className="carousel my-3">
            {!datas ? <Loader /> :
                <>
                    <div className="slider-header mb-2 d-flex justify-content-between align-items-center">
                        <h1 className="carousel-title pink">
                            {title}
                        </h1>
                        <button
                            className="btn btn-outline-danger bg-pink"
                            onClick={() => navigate(`/media/movie?page=1&pageSize=20&${navigateParameter}`)}
                        >
                            Show More
                        </button>
                    </div>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {datas?.map((data, index) => (
                                <div key={`${data.id}-${index}`}>
                                    <Card
                                        id={data.id}
                                        name={data.name}
                                        releaseDate={data.release_date}
                                        rating={data.rating}
                                        posterPath={`http://localhost:3001/${data.poster_path.split("public\\")[1].split("\\").join('/')}`}
                                        array={data.categories}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </>
            }
        </section>

    )
}

export default Carousel
