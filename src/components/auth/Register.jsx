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
        <div>
            <form
                action=''
                onSubmit={handleSubmit}
            >
            <Input
                field='name'
                label='Name'
                value={formData.name.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.name.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={nameValidationMessage}
            />
            <Input
                field='surname'
                label='Surname'
                value={formData.surname.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.surname.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.surname.showError}
                validationMessage={surnameValidationMessage}
            />
            <Input 
                field='email'
                label='Email' 
                value={formData.email.value}
                onChangeHandler={handleValueChange}
                placeholder={formData.email.value}
                type='email'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
                validationMessage={emailValidationMessage}
            />
            <Input 
                field='username'
                label='Username' 
                onChangeHandler={handleValueChange}
                value={formData.username.value} 
                placeholder={formData.username.value}
                type='text'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.username.showError}
                validationMessage={usernameValidationMessage}
            />
            <Input 
                field='password'
                label='Password' 
                onChangeHandler={handleValueChange}
                value={formData.password.value} 
                type='password'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
            />
            <Input 
                field='confirmPassword'
                label='Password Confirmation' 
                onChangeHandler={handleValueChange}
                value={formData.confirmPassword.value} 
                type='password'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.confirmPassword.showError}
                validationMessage={passConfirmValidationMessage}
            />
            <Input
                field='profilePicture'
                label='Profile Picture'
                value={formData.profilePicture.value}
                onChangeHandler={handleValueChange}
                type='file'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.profilePicture.showError}
                validationMessage={profilePictureValidationMessage}
            />
            <button disabled={isSubmitButtonDisable} type='submit'>Enviar</button>
            </form>
            <span onClick={switchAuthHandler} >
                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
            </span>
        </div>
    )
}

