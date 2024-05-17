import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Pagination = () => {

    const { type, pageNumber } = useParams()

    const { theme } = useSelector(state => state.theme)

    const [pageNumbers, setpageNumbers] = useState([])

    useEffect(() => {

        // page numbers to be listed in pagination
        let numberArray = []
        for (var i = 2; i > 0; i--) {
            if ((pageNumber - i) > 0)
                numberArray.push(pageNumber - i)
        }
        numberArray.push(parseInt(pageNumber))
        while (numberArray.length < 5)
            numberArray.push(numberArray[numberArray.length - 1] + 1)

        setpageNumbers(numberArray)

    }, [])

    return (
        <nav className="d-flex justify-content-center">
            <ul className="pagination pagination-lg pink-border">
                {pageNumbers?.map((number, index) => (
                    <li
                        className={`page-item ${pageNumber == number && "active"}`}
                        key={`pagination-${index}`}
                    >
                        <a
                            className={`page-link pagination-${theme} ${pageNumber != number && "pink"}`}
                            href={`/media/${type}/${number}`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination