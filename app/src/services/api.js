import axios from "axios";

const API_URL = "http://localhost:8000"; // Change this if deployed

//USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS USERS
//Function to login a user

export const signUpUser = async (formData) => {
  const response = await axios.post(`${API_URL}/signup/`, formData); // Adjust URL as needed
  return response.data; // Handle the response as necessary
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login/`, credentials);
  return response.data;
};

//OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES OPPORTUNITIES

export const createOpportunity = async (opportunity) => {
  const response = await axios.post(`${API_URL}/opportunities/`, opportunity);
  return response.data;
};

export const deleteOpportunity = async (opportunityId) => {
  const response = await axios.delete(
    `${API_URL}/opportunities/${opportunityId}`
  );
  return response.data;
};

//Fetch all opportunities for non-volunteer users
export const getOpportunities = async () => {
  const response = await axios.get(`${API_URL}/opportunities/`);
  return response.data;
};

//Fetch all opportunities organization has created
export const getCreatedOpportunities = async (id) => {
  const response = await axios.get(`${API_URL}/opportunities/created`, {
    params: { id },
  });
  return response.data;
};

// IMPLEMENT IN BACKEND
//Fetch all opportunities for logged in volunteer users
export const getRankedOpportunities = async () => {
  const response = await axios.get(`${API_URL}/opportunities/ranked/`);
  return response.data;
};

//Fetch all opportunities user has applied to
export const getAppliedOpportunities = async (id) => {
  const response = await axios.get(`${API_URL}/opportunities/applied/${id}`);
  return response.data;
};

//APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS APPLICATIONS

export const applyForOpportunity = async (application) => {
  const response = await axios.post(`${API_URL}/applications/`, application);
  return response.data;
};

export const getApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/applications/${jobId}`);
  return response.data;
};

// IMPLEMENT IN BACKEND
export const acceptApplication = async (applicationId) => {
  const response = await axios.post(`${API_URL}/applications/accept/`, {
    applicationId,
  });
  return response.data;
};

export const deleteApplication = async (applicationId) => {
  const response = await axios.delete(
    `${API_URL}/applications/${applicationId}`
  );
  return response.data;
};

//ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS ALERTS

export const createAlert = async (alert) => {
  const response = await axios.post(`${API_URL}/alerts/`, alert);
  return response.data;
};

export const getAlerts = async (userId) => {
  const response = await axios.get(`${API_URL}/alerts/${userId}`);
  return response.data;
};

export const deleteAlert = async (alertId) => {
  const response = await axios.delete(`${API_URL}/alerts/${alertId}`);
  return response.data;
};

//OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER OTHER

// IMPLEMENT IN BACKEND
//Enhance the application text
export const enhanceApplication = async (text) => {
  const response = await axios.post(`${API_URL}/enhance/`, { text });
  return response.data;
};

// IMPLEMENT IN BACKEND
export const enhanceBio = async (text) => {
  const response = await axios.post(`${API_URL}/enhance/bio/`, { text });
  return response.data;
};
