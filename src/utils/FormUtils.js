export const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 19; i++) {
        const year = (currentYear + i).toString();
        years.push({ value: year, label: year });
    }
    return years;
};

export const validateFirstName = (value) => {
    if (!value || value.trim() === "") {
        return "Required";
    }
    if (value.length < 2) {
        return "First Name length should be between 2 to 25 characters";
    }
    if (value.length > 25) {
        return "First Name length should be between 2 to 25 characters";
    }
    return "";
};

export const validateLastName = (value) => {
    if (!value || value.trim() === "") {
        return "Required";
    }
    if (value.length < 2) {
        return "Last Name length should be between 2 to 25 characters";
    }
    if (value.length > 25) {
        return "Last Name length should be between 2 to 25 characters";
    }
    return "";
};

export const validateCardNumber = (value) => {
    const digitsOnly = value.replace(/\s/g, "");
    if (!digitsOnly || digitsOnly === "") {
        return "Required";
    }
    if (digitsOnly.length !== 16) {
        return "Card Number must be 16 digits";
    }
    if (!/^\d+$/.test(digitsOnly)) {
        return "Card Number must contain only digits";
    }
    return "";
};

export const validateExpMonth = (value) => {
    if (!value || value === "") {
        return "Required";
    }
    return "";
};

export const validateExpYear = (value) => {
    if (!value || value === "") {
        return "Required";
    }
    return "";
};

export const validateCVV = (value) => {
    if (!value || value === "") {
        return "Required";
    }
    if (value.length !== 3) {
        return "CVV should be 3 digits";
    }
    if (!/^\d+$/.test(value)) {
        return "CVV must contain only digits";
    }
    return "";
};

export const validateSSN = (value) => {
    const digitsOnly = value.replace(/[_*-]/g, "");
    if (!digitsOnly || digitsOnly === "") {
        return "Required";
    }
    if (digitsOnly.length !== 9) {
        return "SSN must be 9 digits";
    }
    if (!/^\d+$/.test(digitsOnly)) {
        return "SSN must contain only digits";
    }
    return "";
};

export const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    const formatted = digitsOnly.match(/.{1,4}/g);
    return formatted ? formatted.join(" ") : digitsOnly;
};

export const formatSSN = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 3) {
        return digitsOnly;
    } else if (digitsOnly.length <= 6) {
        return `***-${digitsOnly.slice(3)}`;
    } else {
        const lastThree = digitsOnly.slice(-3);
        return `***-**-*${lastThree}`;
    }
};
