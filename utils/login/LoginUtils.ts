import { TUser } from "@/types/typings";
import { usernameRegex } from "@/constants/consts";
import { emailRegex } from "@/constants/consts";

const validateUsername = (userData: TUser) => {
    let message = ""
    let isValid = false

    if (!userData.username) {
        message = "Username is required"
    } else if (!usernameRegex.test(userData.username)) {
        message = "Username is not valid"
    } else {
        isValid = true
    }

    return {
        message,
        isValid
    }
};

const validateEmail = (emailToValidate: string) => {
    let message = ""
    let isValid = false

    if (emailToValidate.length === 0) {
        message = "Email is required"
    } else if (!emailRegex.test(emailToValidate)) {
        message = "Email is not valid"
    } else {
        isValid = true
    }

    return {
        message,
        isValid
    }
};

export { validateUsername, validateEmail }
