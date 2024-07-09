export const loginValidation = (name, value) => {
    switch (name) {
        case "email":
            if (!value || value.trim() === "") {
                return "Email is required";
            } else if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                return "Enter a valid email address";
            } else {
                return "";
            }
        case "password":
            if (!value) {
                return "Password is Required";
            } else if (value.length < 8) {
                return "Please fill at least 8 character";
            } else if (!value.match(/[a-z]/g)) {
                return "Please enter at least lower character.";
            } else if (!value.match(/[A-Z]/g)) {
                return "Please enter at least upper character.";
            } else if (!value.match(/[0-9]/g)) {
                return "Please enter at least one digit.";
            } else {
                return "";
            }
        case "confirmPassword":
            if (!value) {
                return "Confirm Password is required";
            } else if (value !== document.querySelector("input[name='password']").value) {
                return "Passwords do not match";
            }
        default: {
            return "";
        }
    }
};

export const appointmentValidation = (name, value) => {
    switch (name) {
        case "department":
            if (!value || value.trim() === "") {
                return "Department is required";
            } else {
                return "";
            }
        case "doctor":
            if (!value || value.trim() === "") {
                return "Doctor is required";
            } else {
                return "";
            }

        default: {
            return "";
        }
    }
};