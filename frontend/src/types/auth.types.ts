export type User = {
  id: number;
  email: string;
  grade?: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  grade?: string;
};

export type AuthResponse = {
  user: {
    id: number;
    email: string;
    grade?: string | null;
  };
  message: string;
};

export type AuthError = {
  message: string;
  field?: string;
};
