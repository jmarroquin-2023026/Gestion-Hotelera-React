import React, { useState } from 'react'
import { Input1 } from '../Input1'
import { useAddHotel } from '../../shared/hooks/Hotel/useAddHotel'
import { nameValidationMessage, profilePictureValidationMessage, 
    validateName, validateProfilePicture, ownerValidatorMessage, notEmptyOwner, 
    validateReservationMessage, validateReservation, categoryValidatorMessage, categoryValidator} from '../../shared/validators/validator'

export const HotelForm = () => {

    const form = {
        owner: {
            value: '',
            isValid: false,
            showError: false
        },
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        address: {
            value: '',
            isValid: false,
            showError: false
        },
        category: {
            value: '',
            isValid: false,
            showError: false
        },
        amenities: {
            value: '',
            isValid: false,
            showError: false
        },
        reservations: {
            value: '',
            isValid: false,
            showError: false
        },
        photos: {
            value: [],
            isValid: false,
            showError: false
        }
    }

    const { addHotel } = useAddHotel()
    const [formData, setFormData] = useState(form)

    const isSubmitButtonDisable =
        !formData.owner.isValid ||
        !formData.name.isValid ||
        !formData.address.isValid ||
        !formData.category.isValid ||
        !formData.amenities.isValid ||
        !formData.reservations.isValid ||
        !formData.photos.isValid

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('owner', formData.owner.value)
        data.append('name', formData.name.value)
        data.append('address', formData.address.value)
        data.append('category', formData.category.value)
        data.append('amenities', formData.amenities.value)
        data.append('reservations', formData.reservations.value)
        formData.photos.value.forEach((file) => {
        data.append('photos', file);
        })

        addHotel(data)
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'owner':
                isValid = notEmptyOwner(value) 
                break
            case 'name':
                isValid = validateName(value)
                break
            case 'address':
                isValid = validateName(value)
                break
            case 'category':
                isValid = categoryValidator(value)
                break
            case 'amenities':
                isValid = validateName(value)
                break
            case 'reservations':
                isValid = validateReservation(value)
                break
            case 'photos':
                isValid = validateProfilePicture(value)
                break
            default:
                break
        }
        
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }

            }
        ))
    }
    const handleValueChange = (e, field) => {
    let value = e.target.value;
    if (field === 'photos') {
        value = Array.from(e.target.files);
    }
    setFormData((prevData) => ({
        ...prevData,
        [field]: {
            ...prevData[field],
            value
        }
    }))
}


    return (
        <>
            <div>
                <form
                    action=""
                    onSubmit={handleSubmit}
                >
                    <Input1
                        field='owner'
                        label='Owner'
                        onChangeHandler={handleValueChange}
                        value={formData.owner.value}
                        placeholder={formData.owner.value}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.owner.showError}
                        validationMessage={ownerValidatorMessage}
                    />
                    <Input1
                        field='name'
                        label='Name'
                        value={formData.name.value}
                        placeholder={formData.name.value}
                        onChangeHandler={handleValueChange}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.name.showError}
                        validationMessage={nameValidationMessage}
                    />
                    <Input1
                        field='address'
                        label='Address'
                        value={formData.address.value}
                        placeholder={formData.address.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.address.showError}
                        validationMessage={nameValidationMessage}
                    />
                    <Input1
                        field='category'
                        label='Category'
                        value={formData.category.value}
                        placeholder={formData.category.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.category.showError}
                        validationMessage={categoryValidatorMessage}
                    />
                    <Input1
                        field='amenities'
                        label='Amenities'
                        value={formData.amenities.value}
                        placeholder={formData.amenities.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.amenities.showError}
                        validationMessage={nameValidationMessage}
                    />
                    <Input1
                        field='reservations'
                        label='Reservations'
                        value={formData.reservations.value}
                        placeholder={formData.reservations.value}
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.reservations.showError}
                        validationMessage={validateReservationMessage}
                    />
                    <Input1
                        field='photos'
                        label='Photos'
                        value={formData.photos.value}
                        placeholder={formData.photos.value}
                        type='file'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.photos.showError}
                        validationMessage={profilePictureValidationMessage}
                    />
                    <button /* disabled={isSubmitButtonDisable} */ type='submit'>Enviar</button>
                </form>
            </div>
        </>
    )
}