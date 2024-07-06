import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import Toast from '../components/Toast'

const Panel = () => {

    const { theme } = useSelector(state => state.theme)

    const [admin, setAdmin] = useState([])
    const [table, setTable] = useState([])
    const [modalInfo, setModalInfo] = useState([])
    const [refreshTable, setRefreshTable] = useState(false)
    const [toast, setToast] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("authToken"))
            navigate("/login")
        else
            setAdmin(jwtDecode(localStorage.getItem("authToken")).admin)
    }, [])

    return (
        <div className={`panel d-flex bg-${theme}`}>

            <Sidebar
                admin={admin}
                table={table} setTable={setTable}
            />

            <Table
                table={table}
                setModalInfo={setModalInfo}
                refreshTable={refreshTable}
            />

            <Modal
                table={table}
                modalInfo={modalInfo} setModalInfo={setModalInfo}
                setRefreshTable={setRefreshTable}
                setToast={setToast}
            />

            <Toast
                toast={toast} setToast={setToast}
            />

        </div>
    )
}

export default Panel