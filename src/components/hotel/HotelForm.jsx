import React, { useState } from 'react'
import { Input1 } from '../Input1'
import { useAddHotel } from '../../shared/hooks/Hotel/useAddHotel'
import { nameValidationMessage, profilePictureValidationMessage, 
    validateName, validateProfilePicture, ownerValidatorMessage, notEmptyOwner, 
    validateReservationMessage, validateReservation, categoryValidatorMessage, categoryValidator,
    generalValidator,
    generalValidatorMessage} from '../../shared/validators/validator'
import { useUpdateHotel } from '../../shared/hooks/Hotel/useUpdateHotel'
import { useNavigate, useParams } from 'react-router-dom'

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

    const {id}=useParams()
    const navigate=useNavigate()
    const isEditMode = Boolean(id)
    const { addHotel } = useAddHotel()
    const {updateHotel}=useUpdateHotel()
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
  e.preventDefault();

  const data = new FormData();
  data.append('owner', formData.owner.value);
  data.append('name', formData.name.value);
  data.append('address', formData.address.value);
  data.append('category', formData.category.value);
  data.append('amenities', formData.amenities.value);
  data.append('reservations', formData.reservations.value);
  formData.photos.value.forEach(file => data.append('photos', file));

  if (isEditMode) {
    const updatedHotel = await updateHotel(id, data);
    navigate('/dashboard/hotels')
    if (updatedHotel) {
      setFormData({
        owner: { value: updatedHotel.owner, isValid: true, showError: false },
        name: { value: updatedHotel.name, isValid: true, showError: false },
        address: { value: updatedHotel.address, isValid: true, showError: false },
        category: { value: updatedHotel.category, isValid: true, showError: false },
        amenities: { value: updatedHotel.amenities, isValid: true, showError: false },
        reservations: { value: updatedHotel.reservations, isValid: true, showError: false },
        photos: { value: [], isValid: true, showError: false } 

      });
    }
  } else {
    await addHotel(data);
  }
}

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'owner':
                isValid = notEmptyOwner(value) 
                break
            case 'name':
                isValid = generalValidator(value)
                break
            case 'address':
                isValid = generalValidator(value)
                break
            case 'category':
                isValid = categoryValidator(value)
                break
            case 'amenities':
                isValid = generalValidator(value)
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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <Input1
                        field='owner'
                        label='Owner'
                        onChangeHandler={handleValueChange}
                        value={formData.owner.value}
                        placeholder="Enter owner name"
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.owner.showError}
                        validationMessage={ownerValidatorMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='name'
                        label='Hotel Name'
                        value={formData.name.value}
                        placeholder="Enter hotel name"
                        onChangeHandler={handleValueChange}
                        type='text'
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.name.showError}
                        validationMessage={generalValidatorMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='address'
                        label='Address'
                        value={formData.address.value}
                        placeholder="Enter hotel address"
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.address.showError}
                        validationMessage={generalValidatorMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='category'
                        label='Category'
                        value={formData.category.value}
                        placeholder="Enter hotel category"
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.category.showError}
                        validationMessage={categoryValidatorMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='amenities'
                        label='Amenities'
                        value={formData.amenities.value}
                        placeholder="Enter hotel amenities"
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.amenities.showError}
                        validationMessage={nameValidationMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='reservations'
                        label='Reservations'
                        value={formData.reservations.value}
                        placeholder="Enter reservation details"
                        type='text'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.reservations.showError}
                        validationMessage={validateReservationMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <Input1
                        field='photos'
                        label='Photos'
                        value={formData.photos.value}
                        placeholder="Upload hotel photos"
                        type='file'
                        onChangeHandler={handleValueChange}
                        onBlurHandler={handleValidationOnBlur}
                        showErrorMessage={formData.photos.showError}
                        validationMessage={profilePictureValidationMessage}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <button 
                    type='submit' 
                    disabled={isSubmitButtonDisable}
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isSubmitButtonDisable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {id ? 'Actualizar Hotel' : 'Crear Hotel'}
                </button>
            </form>
        </div>
    )
}