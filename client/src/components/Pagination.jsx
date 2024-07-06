import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux' 
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Pagination = ({ pageNumber, setPageNumber, totalDataCount, table }) => {


    const { theme } = useSelector(state => state.theme)

    const navigate = useNavigate()

    const [pageNumbers, setpageNumbers] = useState([])
    const [lastPageNumber, setLastPageNumber] = useState(0)
    const query = useQuery()
    const pageSize = query.get("pageSize") || 10

    useEffect(() => {
        const lastPage = Math.ceil(totalDataCount / pageSize)
        setLastPageNumber(lastPage)
        // page numbers to be listed in pagination
        let numberArray = []
        for (var i = 2; i > 0; i--) {
            if ((pageNumber - i) > 0)
                numberArray.push(pageNumber - i)
        }
        numberArray.push(parseInt(pageNumber))
        for (var i = 1; i < 3; i++) {
            if ((parseInt(pageNumber) + i) > lastPage)
                break
            numberArray.push(parseInt(pageNumber) + i)
        }
        setpageNumbers(numberArray)

    }, [pageNumber, table, totalDataCount])

    const navigatePage = (page) => {
        if(table === "Client") { // navigate for web site
            window.scroll(0, 0)
            query.set("page", page)
            navigate(`?${query.toString()}`)
        }
        else // navigate for panel
            setPageNumber(page)
}
    return (
        <nav className={`d-flex justify-content-${query.size > 0 ? "center" : "end"} mt-3`}>
            <ul className={`pagination ${query.size > 0 ? "pagination-lg" : ""} pink-border`}>
                <li className={`page-item ${(pageNumber == 1) ? "disabled" : ""}`}>
                    <a 
                        className={`page-link pagination-${theme} pink`} aria-label="Previous"
                        onClick={() => navigatePage(1)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNumbers?.map((number, index) => (
                    <li
                        className={`page-item ${pageNumber == number && "active"}`}
                        key={`pagination-${index}`}
                    >
                        <a
                            className={`page-link pagination-${theme} ${pageNumber != number && "pink"}`}
                            onClick={() => navigatePage(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${(pageNumber == lastPageNumber) ? "disabled" : ""}`}>
                    <a 
                        className={`page-link pagination-${theme} pink`} aria-label="Next"
                        onClick={() => navigatePage(lastPageNumber)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination