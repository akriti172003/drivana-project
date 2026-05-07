/**
 * Checks if the user is authenticated
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

/**
 * Checks if the logged-in user has admin privileges
 * @returns {boolean}
 */
export const isAdmin = () => {
  const adminStatus = localStorage.getItem("isAdmin");
  // Important: localStorage stores everything as a string. 
  // We check for the string "true".
  return adminStatus === "true";
};

/**
 * Clears the session data
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userName");
  window.location.href = "/login";
};