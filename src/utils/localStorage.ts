export const setLocalStorage = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const deleteLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};