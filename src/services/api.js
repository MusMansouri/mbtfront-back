import axios from "axios";

export function addUser(user) {
  return axios.post("http://localhost:3001/api/users", user);
}

export function register(user) {
  return axios.post("http://localhost:3001/api/register", user);
}

export function login(credentials) {
  return axios.post("http://localhost:3001/api/login", credentials);
}
