export default function validation(inputs) {
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPass = new RegExp("[0-9]");
    const errors = {};

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
    if(inputs.password.lenght < 6 || inputs.password.lenght > 10) {
        errors.password = "Entre 6 y 10 caracteres";
    }

    return errors;
}