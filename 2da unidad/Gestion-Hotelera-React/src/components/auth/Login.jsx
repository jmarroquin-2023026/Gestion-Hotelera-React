import React, { useState } from 'react'
import { useLogin } from '../../shared/hooks/auth/useLogin'
import { emailValidationMessage, passConfirmValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from '../../shared/validators/validator'
import { Input } from '../Input'

export const Login = ({ switchAuthHandler }) => {
    const { login } = useLogin()
    const [formData, setFormData] = useState({
        userLogin: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
    })

    const isSubmitButtonDisable = !formData.userLogin.isValid || !formData.password.isValid

    const onValueChange = (value, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'userLogin':
                isValid = validateEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            default:
                break
        }
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(
            formData.userLogin.value,
            formData.password.value
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Iniciar sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <Input
                            field='userLogin'
                            label='Email'
                            value={formData.userLogin.value}
                            onChangeHandler={onValueChange}
                            type='email'
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.userLogin.showError}
                            validationMessage={emailValidationMessage}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <Input
                            field='password'
                            label='Contraseña'
                            value={formData.password.value}
                            onChangeHandler={onValueChange}
                            type='password'
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.password.showError}
                            validationMessage={passwordValidationMessage}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitButtonDisable}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitButtonDisable ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-400">
                    <button
                        onClick={switchAuthHandler}
                        className="font-medium text-blue-400 hover:text-blue-300"
                    >
                        ¿Aún no tienes una cuenta? ¡Regístrate!
                    </button>
                </div>
            </div>
        </div>
    )
}
