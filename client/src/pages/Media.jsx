import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '../components/List'
import * as api from '../api/Api'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import { useLocation, useParams } from 'react-router-dom'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Media = () => {

    const { theme } = useSelector(state => state.theme)

    const [datas, setDatas] = useState(null)
    const [totalDataCount, setTotalDataCount] = useState(0)

    const { type } = useParams()

    const query = useQuery()
    const page = query.get("page") || 1
    useEffect(() => {

        // data fetch
        api.fetchData(`get${type.charAt(0).toUpperCase() + type.slice(1)}`, query.toString())
            .then(dt => {
                setDatas(dt.data)
                setTotalDataCount(dt.totalDataCount)
            });
    }, [type, query.toString()])

    return (
        <main className={`page container bg-${theme}`}>
            <h1 className="pink">
                {query.get("key") ? `Search results for '${query.get("key")}'` : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
            </h1>

            {(datas == null) ? <Loader /> :
                <List
                    datas={datas}
                    type={type}
                />
            }

            {!query.has("name") &&
                <Pagination
                    pageNumber={page}
                    totalDataCount={totalDataCount}
                    table={"Client"}
                />
            }
        </main>
    )
}

export default Media