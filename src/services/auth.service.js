import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/";

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/signin", {
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
  return axios.post(API_URL + "auth/signout").then((response) => {
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