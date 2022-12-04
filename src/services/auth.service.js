import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// const API_URL =process.env.REACT_APP_API_URL;
const register = (username, email, password,securityCode) => {
  return axios.post( "api/v1/auth/signup", {
    username,
    email,
    password,
    securityCode,
    roles:['admin']
  });
};

const login = (username, password) => {
  return axios
    .post( "api/v1/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post("api/v1/auth/signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;