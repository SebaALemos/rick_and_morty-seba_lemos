export default function validation(inputs) {
    const errors = {};
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPass = new RegExp("[0-9]");

    if(!regexEmail.test(inputs.username)) {
        errors.username = "Nombre debe ser un email valido";
    }
    if(!inputs.username) {
        errors.username = "El nombre es obligatorio";
    }
    if(inputs.username.lenght > 35) {
        errors.username = "El nombre debe ser menor a 35 caracteres";
    }
    if(!regexPass.test(inputs.password)) {
        errors.password = "Al menos un numero";
    }
    if(inputs.password.length < 6 || inputs.password.length > 10) {
        errors.password = "Contraseña entre 6 y 10 caracteres"
    }

    return errors;
}