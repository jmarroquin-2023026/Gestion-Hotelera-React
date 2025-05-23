import React, { useState } from 'react'
import { useLogin } from '../../shared/hooks/auth/useLogin'
import { emailValidationMessage, passConfirmValidationMessage, validateEmail, validatePassword } from '../../shared/validators/validator'
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
        <form className="w-full max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-xl shadow-lg dark:bg-gray-800" onSubmit={handleLogin}>
            <div className="mb-6 space-y-4">
                <label htmlFor="email" className="block mb-3 text-base font-medium text-white">Your email</label>
                <Input
                    type="email"
                    id="email"
                    value={formData.userLogin.value}
                    onChange={(e) => onValueChange(e.target.value, 'userLogin')}
                    onBlur={() => handleValidationOnBlur(formData.userLogin.value, 'userLogin')}
                    required
                    placeholder="name@flowbite.com"
                />
                {formData.userLogin.showError && (
                    <p className="mt-2 text-sm text-red-500">{emailValidationMessage}</p>
                )}
            </div>
            <div className="mb-6 space-y-4">
                <label htmlFor="password" className="block mb-3 text-base font-medium text-white">Your password</label>
                <Input 
                    type="password"
                    id="password"
                    value={formData.password.value}
                    onChange={(e) => onValueChange(e.target.value, 'password')}
                    onBlur={() => handleValidationOnBlur(formData.password.value, 'password')}
                    required
                />
                {formData.password.showError && (
                    <p className="mt-2 text-sm text-red-500">{passConfirmValidationMessage}</p>
                )}
            </div>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="w-5 h-5 border border-gray-600 rounded-sm bg-gray-700 focus:ring-3 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                    />
                </div>
                <label htmlFor="terms" className="ms-3 text-base font-medium text-gray-300">
                    I agree with the <a href="#" className="text-blue-500 hover:underline">terms and conditions</a>
                </label>
            </div>
            <button
                type="submit"
                disabled={isSubmitButtonDisable}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                Register new account
            </button>
            <div className="text-center text-base text-gray-400 mt-6">
                <button
                    type="button"
                    onClick={switchAuthHandler}
                    className="font-medium text-blue-400 hover:text-blue-300"
                >
                    ¿Aún no tienes una cuenta? ¡Regístrate!
                </button>
            </div>
        </form>
    )
}