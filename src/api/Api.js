import axios from "axios";

// const url = "http://localhost:5000";
const url = "https://servertaskhub.onrender.com"

export const registration = async (data) => {
  try {
    const response = await axios.post(`${url}/auth/registration`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${url}/auth/login`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const taskEntry = async (data) => {
  try {
    const response = await axios.post(`${url}/task/taskEntry`,data);
    return response;
  } catch (error) {
    return error;
  }
};

export const viewAll = async (id) => {
  try {
    const response = await axios.get(`${url}/task/viewAll/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateTask = async (id, data) => {
  try {
    return await axios.put(`${url}/task/updateTask/${id}`, data);
  } catch (error) {
    return error.response;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${url}/task/delete/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateStatus = async (id) => {
  try {
    const response = await axios.put(`${url}/task/updateStatus/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};