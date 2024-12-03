import { useLoginMutation, useRegisterMutation } from "@/redux/apis/auth";
import { showToast } from "@/utils/showToast";
import { useToast } from "@chakra-ui/react";
import React from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const toast = useToast();

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token") ?? sessionStorage.getItem("is_login_google");
    setIsAuthenticated(!!accessToken);
    setIsHydrated(true);
  }, []);

  const decodeToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000;
    } catch (e) {
      return null;
    }
  };

  const isTokenExpired = (token: string) => {
    const expirationTime = decodeToken(token);
    return expirationTime ? Date.now() > expirationTime : true;
  };

  const refreshTokenMutation = async ({ refresh_token }: { refresh_token: string }) => {
    const response = await fetch("/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refresh_token }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to refresh token");
    }
  
    const data = await response.json();
    return data;
  };
  
  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const { access_token } = await refreshTokenMutation({
        refresh_token: refreshToken,
      })
      sessionStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error: any) {
      throw new Error("Failed to refresh token");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginMutation({
        email,
        password,
      }).unwrap();
      setIsAuthenticated(true);
      
      sessionStorage.setItem("access_token", (data as any)?.access_token );
      sessionStorage.setItem("refresh_token", (data as any)?.refresh_token);
      showToast(
        toast,
        "Login Successful.",
        "You have successfully logged into your account.",
        "success"
      );
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      showToast( toast, "Login Failed.", errorMessage, "error");
      throw new Error(`Login failed: ${errorMessage}`);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerMutation({ email, password }).unwrap();
      setIsAuthenticated(true);
      showToast(
        toast,
        "Registration Successful.",
        "Your account has been created successfully.",
        "success"
      );
    } catch (error: any) {
      const errorMessage =
        error?.message || "An unexpected error occurred during registration.";
      showToast( toast, "Registration Failed.", errorMessage, "error");

      throw new Error(`Registration failed: ${errorMessage}`);
    }
  };

  const checkAndRefreshToken = async () => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken && isTokenExpired(accessToken)) {
      try {
        await refreshAccessToken();
      } catch (error) {
        logout();
      }
    }
  };

  React.useEffect(() => {
    checkAndRefreshToken();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("is_login_google");
    setIsAuthenticated(false);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
