import React, { useEffect, useRef } from 'react'

const Toast = ({ toast, setToast }) => {

    const toastRef = useRef(null)

    useEffect(() => {
        const time = 1000
        if (toast?.show) {
            const toastElement = toastRef.current
            const toast = new window.bootstrap.Toast(toastElement, {
                autohide: true,
                delay: time,
            })
            setTimeout(() => {
                setToast(false)                
            }, time)
            toast.show()
        }
    }, [toast])

    return (
        <div>
            <div
                ref={toastRef}
                className={"toast text-center position-fixed border-0 bottom-0 end-0 m-3 "+
                            `text-bg-${toast?.isSuccessful ? "success" : "danger"} ${toast?.show ? 'show' : ''}`}
                style={{ zIndex: 1 }}
            >
                <div class="d-flex">
                    <div class="toast-body w-100 text-center">
                        { toast?.message + (toast?.isSuccessful ? " successful" : " failed") }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast