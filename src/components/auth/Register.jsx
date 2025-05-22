import React, { useState } from 'react'
import { useRegister } from '../../shared/hooks/auth/useRegister'
import { emailValidationMessage, nameValidationMessage, passConfirmValidationMessage, passwordValidationMessage, profilePictureValidationMessage, surnameValidationMessage, usernameValidationMessage, validateEmail, validateName, validatePassConfirm, validatePassword, validateProfilePicture, validateSurname, validateUsername } from '../../shared/validators/validator'
import { Input } from '../Input'

export const Register = ({ switchAuthHandler }) => {
    const form = {
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        surname: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        confirmPassword: {
            value: '',
            isValid: false,
            showError: false
        },
        profilePicture: {
            value: '',
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(form)
    const { register } = useRegister()
    const isSubmitButtonDisable = !formData.email.isValid ||
                                  !formData.surname.isValid ||
                                  !formData.username.isValid ||
                                  !formData.password.isValid ||
                                  !formData.confirmPassword.isValid ||
                                  !formData.profilePicture.isValid

    const handleSubmit = (event) => {
    event.preventDefault()
    
    const data = new FormData()
    data.append('name', formData.name.value)
    data.append('surname', formData.surname.value)
    data.append('email', formData.email.value)
    data.append('username', formData.username.value)
    data.append('password', formData.password.value)
    data.append('confirmPassword', formData.confirmPassword.value)
    data.append('profilePicture', formData.profilePicture.value)

    register(data)
}


    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case 'name':
                isValid=validateName(value)
                break;
            case 'surname':
                isValid=validateSurname(value)
                break;
            case 'email':
                isValid=validateEmail(value)
                break;
            case 'username':
                isValid = validateUsername(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'confirmPassword':
                isValid = validatePassConfirm(formData.password.value, value)
                break;
            case 'profilePicture':
                isValid=validateProfilePicture(formData.profilePicture.value)
                break;
            default:
                break;
        }
        setFormData((prevData)=>(
           {
                ...prevData,
                [field]:{
                    ...prevData[field],
                    isValid,
                    showError:!isValid
                }
           }
        ))
    }

    const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: {
            ...prevData[field],
            value
        }
    }))
}

    return (
        <form className="w-full max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-xl shadow-lg dark:bg-gray-800" onSubmit={handleSubmit}>
            <div className="mb-6 space-y-4">
                <h1 className='text-white'>Register New Account</h1>
            <div className="mb-6">
             <label htmlFor="name" className="block mb-3 text-base font-medium text-white">Name</label>
            <Input
                field='name'
                value={formData.name.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.name.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={nameValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label htmlFor="surname" className="block mb-3 text-base font-medium text-white">Surname</label>
            <Input
                field='surname'
                value={formData.surname.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.surname.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.surname.showError}
                validationMessage={surnameValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label htmlFor="email" className="block mb-3 text-base font-medium text-white">Email</label>
            <Input 
                field='email'
                value={formData.email.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.email.value}
                type='email'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
                validationMessage={emailValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label htmlFor="username" className="block mb-3 text-base font-medium text-white">Username</label>
            <Input 
                field='username'
                onChangeHandler={handleValueChange}
                value={formData.username.value} 
                placeholder={formData.username.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.username.showError}
                validationMessage={usernameValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label htmlFor="password" className="block mb-3 text-base font-medium text-white">Password</label>
            <Input 
                field='password'
                onChangeHandler={handleValueChange}
                value={formData.password.value} 
                type='password'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
            />
            </div>
            <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-3 text-base font-medium text-white">Password Confirmation</label>
            <Input 
                field='confirmPassword'
                onChangeHandler={handleValueChange}
                value={formData.confirmPassword.value} 
                type='password'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.confirmPassword.showError}
                validationMessage={passConfirmValidationMessage}
            />
            </div>
            <div className="mb-6 ">
            <label htmlFor="profilePicture" className="block mb-3 text-base font-medium text-white">Profile Picture</label>
            <input
                field='profilePicture'
                value={formData.profilePicture.value}
                onChangeHandler={handleValueChange}
                type='file'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.profilePicture.showError}
                validationMessage={profilePictureValidationMessage} 
                />
            </div>
            <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
             disabled={isSubmitButtonDisable} type='submit'>Enviar</button>
            <span   className="text-center text-base mt-6 font-medium text-blue-400 hover:text-blue-300" onClick={switchAuthHandler} >
                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
            </span>
            </div>
        </form>
    )
}

