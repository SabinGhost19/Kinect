/* eslint-disable @typescript-eslint/no-explicit-any */
export const setItem = (key: any, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key: any) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key: any) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// export const setUserId = (key: any, id: any) => {
//   try {
//     window.localStorage.setItem(key, JSON.stringify(id));
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getUserId = (key: any) => {
//   try {
//     const user_id = window.localStorage.getItem(key);
//     return user_id ? user_id : undefined;
//   } catch (error) {
//     console.log(error);
//   }
// };
