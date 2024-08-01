// Function to check if the user is authenticated
export const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };
  
  // Optionally, you can also add a function to retrieve the token
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Function to store the token
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Function to remove the token (e.g., during logout)
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  