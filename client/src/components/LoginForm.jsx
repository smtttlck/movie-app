import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import * as api from '../api/Api'

const LoginForm = ({ setToast }) => {

    const passwordInputRef = useRef()
    const submitButtonRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("authToken"))
            navigate("/panel")
    }, [])


    const loginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        password: Yup.string().required("Password is required")
    })

    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
                submitButtonRef.current.disabled = true
                const validate = await api.login(values)
                    .catch(err => {
                        submitButtonRef.current.disabled = false
                        setToast({ show: true, message: "Wrong name or password", isSuccessful: false })
                    })
                if (validate?.token) {
                    setToast({ show: true, message: "Login", isSuccessful: true })
                    setTimeout(() => {
                        localStorage.setItem("authToken", validate.token)
                        navigate("/panel")
                    }, 1000)
                }
            }}
        >
            {({ errors, touched }) => (
                <Form>

                    <label
                        htmlFor="name"
                        className="form-label pink mt-2"
                    >
                        Name
                    </label>
                    <Field
                        id="name-input" name="name"
                        className="form-control"

                    />
                    {errors.name && touched.name ? (
                        <div className="form-text pink text-center mt-2">{errors.name}</div>
                    ) : null}

                    <label
                        htmlFor="password"
                        className="form-label pink mt-3"
                    >
                        Password
                    </label>
                    <Field
                        id="password-input" name="password"
                        className="form-control"
                        type="password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        innerRef={passwordInputRef}
                    />
                    {errors.password && touched.password ? (
                        <div className="form-text pink text-center mt-2">{errors.password}</div>
                    ) : null}


                    <button
                        type="submit"
                        className="btn btn-outline-danger bg-pink p-0 mt-5 w-100"
                        ref={submitButtonRef}
                    >
                        Log in
                    </button>

                </Form>
            )}
        </Formik>
    )
}

export default LoginForm