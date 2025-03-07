export const setLocalStorage = (key: string, value: string) => {
  if (value && typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string): string | null => {
  const value = localStorage.getItem(key);
  return value;
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
