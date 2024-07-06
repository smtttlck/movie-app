import React, { useEffect, useRef, useState } from 'react'
import * as api from '../api/Api'
import { useSelector } from 'react-redux'
import { MdEditSquare, MdDelete, MdSearch } from "react-icons/md"
import Pagination from './Pagination'


const Table = ({ table, setModalInfo, refreshTable }) => {

    const { theme } = useSelector(state => state.theme)

    const searchbarRef = useRef()

    const [datas, setDatas] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        api.fetchData(`get${table}`, `page=${pageNumber}&pageSize=10`)
            .then(data => setDatas(data))

    }, [table, refreshTable, pageNumber])

    useEffect(() => {
        setPageNumber(1)
    }, [table, refreshTable])

    const dataParser = (title, data) => {
        if (title === "gender")
            return data ? "Female" : "Male"
        else if (title === "categories") {
            let categoryNames = ""
            data.map((category, index) => categoryNames += (index + 1 == data.length) ? category?.name : (category?.name + ", "))
            return <span title={categoryNames}>{categoryNames}</span>
        }
        else if (title === "actors") {
            let actorNames = ""
            data.map((actor, index) => actorNames += (index + 1 == data.length) ? actor.name : (actor.name + ", "))
            return <span title={actorNames}>{actorNames}</span>
        }
        else if (title === "password")
            return "****"
        else if (title.endsWith("_path"))
            return <img
                src={`http://localhost:3001/${data.split("public\\")[1].split("\\").join('/')}`}
                className="avatar"
            />
        else
            return <span title={data}>{data}</span>
    }

    return (
        <>
            {datas?.data?.length > 0 &&
                <div className={`page bg-grey2 rounded-0 bg-${theme} overflow-x-auto w-75 px-4`}>
                    <h3 className="pink">{table} ({datas.totalDataCount} items)</h3>
                    <div
                        className="table-utils d-flex justify-content-between"
                    >
                        <div className="input-group mb-3 w-25">
                            <input 
                                ref={searchbarRef}
                                type="text" className="form-control" placeholder="Search by name" 
                                aria-label="Recipient's username" aria-describedby="searchbtn" 
                            />
                            <button 
                                className="btn btn-outline-danger bg-pink" type="button" id="search-button"
                                onClick={() => api.fetchData(`get${table}`, `page=1&pageSize=10&name=${searchbarRef.current.value}`)
                                                .then(data => setDatas(data))
                            }
                            >
                                <MdSearch />
                            </button>
                        </div>
                        {table == "Admin" &&
                            <p className="table-info my-auto bg-green2 py-1 px-1 rounded">
                                Since your admin level is "root", you can perform transactions with other admins.
                            </p>
                        }
                        <button
                            type="button" className="btn btn-outline-danger bg-pink p-0"
                            data-bs-toggle="modal" data-bs-target="#panelModal"
                            onClick={() => {
                                setModalInfo({ type: "Create", data: datas.data[0] })
                            }}
                        >
                            Add New Record
                        </button>
                    </div>
                    <table className={`table ${(theme == "dark") ? "table-dark" : ""}`}>
                        <thead>
                            <tr>
                                {Object.keys(datas.data[0]).map(title => (
                                    <th key={title} scope="col">
                                        {title.endsWith("_path") ? "image" : title}
                                    </th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas?.data?.map((data, index) => (
                                <tr key={`row-${index}`}>
                                    {Object.keys(datas.data[0]).map(title => (
                                        <td key={`${title}-${index}`}>
                                            {dataParser(title, data[title])}
                                        </td>
                                    ))}
                                    <td className="border-right">
                                        <span
                                            className="table-icon green me-2"
                                            title="Edit"
                                            data-bs-toggle="modal" data-bs-target="#panelModal"
                                            onClick={() => {

                                                if (table === "Movie") {
                                                    setModalInfo({
                                                        type: "Update", data: data,
                                                        categories: data.categories, actors: data.actors
                                                    })
                                                }
                                                else
                                                    setModalInfo({ type: "Update", data: data })
                                            }}>
                                            <MdEditSquare />
                                        </span>
                                        <span
                                            className="table-icon red2"
                                            title="Delete"
                                            data-bs-toggle="modal" data-bs-target="#panelModal"
                                            onClick={() => setModalInfo({ type: "Delete", data: data })}>
                                            <MdDelete />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        pageNumber={pageNumber} setPageNumber={setPageNumber}
                        totalDataCount={datas.totalDataCount}
                        table={table}
                    />
                </div>
            }
        </>
    )
}

export default Table