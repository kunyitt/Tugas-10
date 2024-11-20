import { useAuthStore } from "../store/authStore";

const BASE_API_URL = "http://localhost:8080";

export const login = async ({ email, password }) => {
  const url = `${BASE_API_URL}/api/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    return null;
  }
};

export const createTask = async (title) => {
  const url = `${BASE_API_URL}/api/tasks`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during task creation:", error.message);
    return null;
  }
};

export const getAllTask = async () => {
  const url = `${BASE_API_URL}/api/tasks`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
};

export const toggleTaskCompletion = async (id) => {
  const url = `${BASE_API_URL}/api/tasks/${id}/done`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling task:", error.message);
    
  }
};

export const deleteTask = async (id) => {
  const url = `${BASE_API_URL}/api/tasks/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};

export const getProfile = async () => {
  const url = `${BASE_API_URL}/api/users/profile`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });console.log("Token digunakan:", useAuthStore.getState().token);


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }
};

export const updateProfile = async (profileData) => {
  const url = `${BASE_API_URL}/api/users/profile`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error; 
  }
}