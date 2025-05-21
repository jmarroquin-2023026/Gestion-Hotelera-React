import React, { useState } from 'react'
import { useLogin } from '../../shared/hooks/auth/useLogin'
import { emailValidationMessage, passConfirmValidationMessage, validateEmail, validatePassword } from '../../shared/validators/validator'
import { Input } from '../Input'

export const Login = ({switchAuthHandler}) => {
    const {login}=useLogin()
    const [formData,setFormData]=useState(
        {
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
        }
    )

    const isSubmitButtonDisable=!formData.userLogin.isValid||
                                !formData.password.isValid

    const onValueChange=(value,field)=>{
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur=(value,field)=>{
        let isValid=false
        switch(field){
            case 'userLogin':
                isValid=validateEmail(value)
                break;
            case 'password':
                isValid = validatePassword(value)
                break
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

    const handleLogin = (e)=> {
    e.preventDefault()
        login(
                formData.userLogin.value,
                formData.password.value
        )
  }
  return (
    <div>
        <form
            name='form1'
            onSubmit={handleLogin}
        >
            <Input 
                field='userLogin'
                label='Email' 
                value={formData.userLogin.value}
                onChangeHandler={onValueChange}
                placeholder={formData.userLogin.value}
                type='email'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.userLogin.showError}
                validationMessage={emailValidationMessage}
            />
            <Input 
                field='password'
                label='Password' 
                onChangeHandler={onValueChange}
                value={formData.password.value} 
                type='password'
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passConfirmValidationMessage}
            />
            <button
                disabled={isSubmitButtonDisable}
            >
                LogIn
            </button>
        </form>
        <span onClick={switchAuthHandler}>
            ¿Aún no tienes una cuenta? ¡Registrate...!
        </span>
    </div>
  )
}

