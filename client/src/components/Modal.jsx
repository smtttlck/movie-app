import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/Api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IoClose } from "react-icons/io5"

const Modal = ({ table, modalInfo, setModalInfo, setRefreshTable, setToast }) => {

    const { theme } = useSelector(state => state.theme)

    const [categories, setCategories] = useState([])
    const [actors, setActors] = useState([])
    const [filteredActors, setFilteredActors] = useState([])
    const [casting, setCasting] = useState([])
    const [imgFile, setImgFile] = useState(null)


    const deleteHandler = (id) => {
        api.fetchData(`delete${table}`, id)
        setModalInfo([])
        setRefreshTable(prev => !prev)
        setToast({ show: true, message: "Delete", isSuccessful: true })
    }

    const handleCategoryChange = (categoryId) => {
        if (formik.values.categories?.includes(categoryId)) {
            formik.setFieldValue(
                'categories',
                formik.values.categories.filter((id) => id !== categoryId)
            )
        } else {
            formik.setFieldValue(
                'categories',
                [...formik.values.categories, categoryId]
            )
        }
    }
    const handleActorChange = (actorId) => {
        if (formik.values.actors?.includes(actorId)) {
            formik.setFieldValue(
                'actors',
                formik.values.actors.filter((id) => id !== actorId)
            )
        } else {
            formik.setFieldValue(
                'actors',
                [...formik.values.actors, actorId]
            )
        }
    }
    const handleCharacterChange = (actorId, characterName) => {
        const index = casting.findIndex(cast => cast.actorId == actorId)

        if (index === -1) {
            setCasting(prevCasting => [...prevCasting, { actorId: actorId, characterName: characterName }])
        } else {
            setCasting(prevCasting => {
                const newCasting = [...prevCasting]
                newCasting[index].characterName = characterName
                return newCasting
            })
        }
    }

    useEffect(() => {
        if (modalInfo.type === "Update") {
            formik.setValues(modalInfo.data || {})
            formik.setErrors({})
        }
        else
            formik.resetForm()
        if (table === "Movie") {
            api.fetchData("getCategory", "sort=name&type=asc")
                .then(dt => setCategories(dt.data))
            api.fetchData("getActor", "pageSize=all&sort=name&type=asc")
                .then(dt => {
                    setActors(dt.data)
                    setFilteredActors(dt.data)
                })
        }
    }, [modalInfo])

    const validationSchema = () => {
        if (modalInfo.length === 0) {
            return Yup.object()
        }

        let schemaFields = {}
        Object.keys(modalInfo.data).forEach(title => {
            if (title !== "id") {
                if (title.endsWith("_path"))
                    schemaFields[title] = Yup.mixed().nullable()
                else if (title === "categories" || title === "actors")
                    schemaFields[title] = Yup.mixed()
                else
                    schemaFields[title] = Yup.string().required(`${title} required`)
            }
        })

        return Yup.object().shape(schemaFields)
    }

    const getInitialValues = () => {
        if (modalInfo.type == "Create") {
            const initialValues = {}
            Object.keys(modalInfo.data).forEach(title => {
                if (title == "level")
                    initialValues[title] = 'admin'
                else if (title == "gender")
                    initialValues[title] = 0
                else if (title == "categories")
                    initialValues[title] = []
                else if (title === "actors")
                    initialValues[title] = [{}]
                else if (title.endsWith("_path")) {
                    initialValues[title] = ''
                    initialValues['image'] = null
                }
                else
                    initialValues[title] = ''

            })
            return initialValues
        }
        else if (modalInfo.type == "Update") {
            let modalData = modalInfo.data
            if (table === "Movie") {
                modalData["categories"] = modalInfo?.categories?.map(category => category.id)
                modalData["actors"] = modalInfo?.actors?.map(actor => actor.id)
            }
            return modalData
        }
        else
            return {}
    }

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: validationSchema(),
        enableReinitialize: true,
        onSubmit: values => {
            if (table === "Movie")
                values.actors = casting
            if (modalInfo.type === "Create")
                api.fetchData(`post${table}`, null, values)
                    .then(() => {
                        setRefreshTable(prev => !prev)
                        setToast({ show: true, message: modalInfo.type, isSuccessful: true })
                    }).catch(err => {
                        setToast({ show: true, message: modalInfo.type, isSuccessful: false })
                    })
            else
                api.fetchData(`put${table}`, modalInfo.data.id, values)
                    .then(() => {
                        setRefreshTable(prev => !prev)
                        setToast({ show: true, message: modalInfo.type, isSuccessful: true })
                    }).catch(err => {
                        setToast({ show: true, message: modalInfo.type, isSuccessful: false })
                    })
            setImgFile(null)
        }
    })

    const inputSelector = (title) => {
        if (title === "password") {
            return (
                <input
                    disabled={true}
                    className="form-control my-2"
                    name={title} type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[title]}
                />
            )
        }
        else if (title === "level") {
            return (
                <select
                    name={title} className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[title]}
                >
                    <option>admin</option>
                    <option>root</option>
                </select>
            )
        }
        else if (title === "gender") {
            return (
                <div className="genders d-flex">
                    <span className="form-check me-4">
                        <input
                            className="form-check-input" type="radio"
                            name={title} id="radio1" value={0}
                            checked={formik.values[title] == 0}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                    </span>
                    <span className="form-check">
                        <input
                            className="form-check-input" type="radio"
                            name={title} id="radio2" value={1}
                            checked={formik.values[title] == 1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                    </span>
                </div>
            )
        }
        else if (title.endsWith("_path")) {
            return (
                <>
                    {imgFile ? (
                        <img src={URL.createObjectURL(imgFile)} />
                    ) : (
                        (modalInfo.type === "Update" && modalInfo?.data) && (
                            <img src={`http://localhost:3001/${modalInfo.data.img_path ?
                                modalInfo.data.img_path.split("public\\")[1]?.split("\\").join('/') :
                                modalInfo.data.poster_path.split("public\\")[1]?.split("\\").join('/')}`}
                            />
                        )
                    )}
                    <input
                        id={title}
                        className="form-control my-2"
                        name={title} type="file"
                        onChange={(e) => {
                            setImgFile(e.currentTarget.files[0])
                            formik.setFieldValue('image', e.currentTarget.files[0])
                        }}
                        onBlur={formik.handleBlur}
                    />
                </>
            )
        }
        else if (title === "rating") {
            return (
                <input
                    id={title}
                    className="form-control my-2"
                    name={title} type="number" step={0.1} min={0} max={10}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[title]}
                />
            )
        }
        else if (title === "categories") {
            return (
                <div className="chechkboxs d-flex flex-wrap bg-grey">
                    {categories?.map(category => (
                        <div key={`category-${category.id}`} className="form-check m-2">
                            <input
                                className="form-check-input" type="checkbox"
                                id={`category-${category.id}`}
                                value={category.id} name={title}
                                checked={formik.values.categories?.includes(category?.id)}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                {category.name}
                            </label>
                        </div>
                    ))}

                </div>
            )
        }
        else if (title === "actors") {
            return (
                <div className="actors">
                    <input
                        className="actor-search form-control actor-input my-1"
                        type="text"
                        onChange={(e) => {
                            const searchQuery = e.target.value.toLowerCase()
                            setFilteredActors(actors.filter(actor => actor.name.toLowerCase().includes(searchQuery)))
                        }}
                    />
                    <div className="chechkboxs bg-grey my-3">
                        {actors?.map(actor => (
                            <div
                                key={`actor-${actor.id}`}
                                className={`form-check m-2 ${filteredActors.find(selected => selected.id == actor.id) ? "d-flex" : "d-none"}`}
                            >
                                <input
                                    className="form-check-input" type="checkbox"
                                    id={`actor-${actor.id}`}
                                    value={actor.id} name={title}
                                    checked={formik.values.actors?.some(id => id == actor.id)}
                                    onChange={() => handleActorChange(actor.id)}
                                />
                                <label className="form-check-label" htmlFor={`actor-${actor.id}`}>
                                    {actor.name}
                                </label>
                                {formik.values.actors?.some(id => id == actor.id) && (
                                    <input
                                        className="actor-input form-control w-50 ms-2" type="text"
                                        id={`character-${actor.id}`} placeholder="Character name"
                                        onChange={(e) => handleCharacterChange(actor.id, e.target.value)}
                                    />
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        else if (title === "biography" || title === "overview") {
            return (
                <textarea
                    className="form-control my-2"
                    name={title} rows={7}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[title]}
                />
            )
        }
        else {
            return (
                <input
                    id={title}
                    className="form-control my-2"
                    name={title} type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[title]}
                />
            )
        }
    }

    const modalBodyParser = () => {
        if (modalInfo.length === 0)
            return null
        else if (modalInfo.type === "Delete") {
            return (
                <p>{`Are you sure you want to delete the ${table} named ${modalInfo.data.name}?`}</p>
            )
        }
        else {
            return (
                <form className="modal-form d-flex flex-column flex-wrap" onSubmit={formik.handleSubmit}>
                    {Object.keys(modalInfo.data).map((title, index) => (
                        (title !== "id") && (
                            <div key={`form-input-${index}`} className={table === "Movie" ? "col-6" : ""}>
                                <label htmlFor={title} className="form-label">{title}</label>
                                {inputSelector(title)}
                                {formik.touched[title] && formik.errors[title] ? (
                                    <div className="form-text pink">{formik.errors[title]}</div>
                                ) : null}
                            </div>
                        )
                    ))}


                    <button
                        type="submit" className="btn btn-primary my-2 mx-auto"
                        data-bs-toggle="modal" data-bs-target="#panelModal"
                    >
                        Submit
                    </button>
                </form>
            )
        }
    }


    return (
        <div className="modal fade" id="panelModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog ${table === "Movie" ? "modal-lg" : ""}`}>
                <div className={`modal-content ${theme === "dark" ? "bg-dark" : ""}`}>
                    <div className="modal-header black">
                        <h1 className={`modal-title fs-5 ${theme === "light" ? "black" : ""}`} id="exampleModalLabel">
                            {modalInfo?.type}
                        </h1>
                        <button
                            type="button" className="btn-close d-flex pink"
                            data-bs-dismiss="modal" aria-label="Close"
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className={`modal-body ${theme === "dark" ? "white2" : ""}`}>
                        {modalBodyParser()}
                    </div>
                    {modalInfo.type === "Delete" && (
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button" className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => deleteHandler(modalInfo.data.id)}
                            >
                                {modalInfo?.type}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Modal