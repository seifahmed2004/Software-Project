export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };