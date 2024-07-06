import React, { useState } from 'react'
import ThemeButton from '../components/ThemeButton'
import { useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import Toast from '../components/Toast'

const Login = () => {

    const { theme } = useSelector(state => state.theme)

    const [toast, setToast] = useState(false);
    
    return (
        <div className={`login d-flex bg-${theme}`}>
            <div className="fix-btn my-3 mx-3"> {/* bunu sağa yasla */ }
                <ThemeButton />
            </div>
            <div className="login-form mx-auto p-5 rounded border">
                <LoginForm 
                    setToast={setToast}
                />
            </div>
            <Toast 
                toast={toast} setToast={setToast}
            />
        </div>
    )
}

export default Login