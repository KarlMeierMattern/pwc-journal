export type User = {
  id: number;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: number;
    email: string;
  };
  message: string;
};

export type AuthError = {
  message: string;
  field?: string;
};
