import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "../types/auth.types";

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL
    : import.meta.env.VITE_BACKEND_PROD_URL;

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }
    const data: { user: User } = await response.json(); // the resulting object must have a property named user, and the value of that property must match the structure of the User
    return data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const signupService = async (
  data: SignupRequest,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    throw error;
  }
  return response.json();
};

export const loginService = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    throw error;
  }
  return response.json();
};

export const logoutService = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    throw error;
  }
  return response.json();
};

export const updateGradeService = async (data: {
  grade: string;
}): Promise<{ message: string; grade: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/grade`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    throw error;
  }
  return response.json();
};
