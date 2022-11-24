import localUserData from "../classes/localUserData";

const getUserData = () : localUserData => JSON.parse(localStorage.getItem('user') || "");

const clearUserData = () => localStorage.clear();

export { getUserData, clearUserData };
