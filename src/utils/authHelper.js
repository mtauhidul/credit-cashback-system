const nameValidator = (value) => {
  if (value.length > 8) {
    return value;
  } else {
    return false;
  }
};

const userNameValidator = (value) => {
  if (value.length > 6) {
    return value;
  } else {
    return false;
  }
};

const emailValidator = (value) => {
  if (value) {
    const isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (isEmail) {
      return value;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const passwordValidator = (value) => {
  if (value) {
    const isPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      value
    );
    if (isPass) {
      return value;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const validator = (property, value) => {
  if (property === 'name') {
    const result = nameValidator(value);
    return result;
  } else if (property === 'userName') {
    const result = userNameValidator(value);
    return result;
  } else if (property === 'email') {
    const result = emailValidator(value);
    return result;
  } else if (property === 'password') {
    const result = passwordValidator(value);
    return result;
  }
};
