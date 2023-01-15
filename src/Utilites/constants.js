export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const VALIDATE_INPUTS_CONFIG = {
    requiredArea: 'Поле, обязательное для заполнения',
    emailValidateFormat: 'E-Mail имеет неправильный формат',
    passwordValifate: 'Пароль должен быть больше, чем 7 символов и содержать латинские символы и цифры', 

}