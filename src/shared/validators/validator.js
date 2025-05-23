export const notEmptyOwner =(owner)=>{
    const regex = /^[a-f0-9]{24}$/
    return regex.test(owner.trim())
}

export const generalValidator = (prop) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ,]{2,100}$/;
    return regex.test(prop.trim());
};



export const categoryValidator = (category)=>{
    const regex = /^(1 STAR|2 STARS|3 STARS|4 STARS|5 STARS)$/
    return regex.test(category.trim())
}

export const validateReservation = (reservations)=>{
    const regex = /^\d+$/
    return regex.test(reservations.trim())

}
export const validateName = (name) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,30}$/
    return regex.test(name.trim())
}

export const validateSurname = (surname) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,30}$/
    return regex.test(surname.trim())
}


export const validateEmail = (email)=>{
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}

export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}

//Modificar el regex
export const validatePassword = (password)=>{
    const regex = /^\S{8,24}$/ 
    return regex.test(password)
}


export const validatePassConfirm = (password, confirmPassword)=>{
    return password === confirmPassword
}


export const validateProfilePicture = (profilePicture) => {
    if (!profilePicture) return false

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 10 * 1024 * 1024 

    return validTypes.includes(profilePicture.type) && profilePicture.size <= maxSize
}


export const categoryValidatorMessage = 'Tiene que ser algun dato del enum'
export const validateReservationMessage = 'Tiene que ser un numero, no caracter'
export const ownerValidatorMessage = 'El id del owner debe ser un objeto de mongodb'
export const nameValidationMessage = 'El nombre debe tener entre 2 y 30 letras, sin caracteres especiales ni espacios'
export const surnameValidationMessage = 'El apellido debe tener entre 2 y 30 letras, sin caracteres especiales ni espacios'
export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const usernameValidationMessage = 'El nombre de usuario debe contener entre 3 y 8 caracteres (Sin espacios)'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios'
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'
export const profilePictureValidationMessage = 'La imagen debe ser JPG, JPEG, PNG o WEBP y no superar los 5 MB'
export const generalValidatorMessage= 'Ingrese los datos necesarios para el registro'