export const phoneValidator = (phone: string): boolean => {
  if (!/^\d+$/.test(phone)) {
    return false;
  }
  if (phone.length != 10) {
    return false;
  }
  return true;
};

export const smsPassValidator = (phone: string): boolean => {
  if (!/^\d+$/.test(phone)) {
    return false;
  }
  if (phone.length != 6) {
    return false;
  }
  return true;
};
