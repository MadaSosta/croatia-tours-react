import { MIN_PASSWORD_LENGTH } from "@/constants/consts";
import { MAX_PASSWORD_LENGTH } from "@/constants/consts";
import { passwordRegex } from "@/constants/consts";

const validatePassword = (passwordToValidate: string | undefined) => {
    if(!passwordToValidate) return {
        message: "Password is required",
        isValid: false,
        password: {
            message: "Password is required",
            containsEnoughCharacters: false,
            containsUpperCaseCharacter: false,
            containsLowerCaseCharacter: false,
            containsNumber: false,
        }}
    let message = ""
    let isValid = false
    let password: {
        message: string,
        containsEnoughCharacters: boolean,
        containsUpperCaseCharacter: boolean,
        containsLowerCaseCharacter: boolean,
        containsNumber: boolean,
    } = {
        message: message,
        containsEnoughCharacters: false,
        containsUpperCaseCharacter: false,
        containsLowerCaseCharacter: false,
        containsNumber: false,
    }

    if (passwordToValidate.length === 0) {
        message = "Password is required"
    } else if (!passwordRegex.test(passwordToValidate)) {
        message = "Password is not valid"
        password = {
            message: message,
            containsEnoughCharacters:
                passwordToValidate.length >= MIN_PASSWORD_LENGTH &&
                passwordToValidate.length <= MAX_PASSWORD_LENGTH,
            containsUpperCaseCharacter: !!passwordToValidate.match(/[A-Z]/),
            containsLowerCaseCharacter: !!passwordToValidate.match(/[a-z]/),
            containsNumber: !!passwordToValidate.match(/[0-9]/),
        }
    } else {
        isValid = true
    }

    return {
        message,
        isValid,
        password
    }
};

export { validatePassword }