import { jwtDecode } from "jwt-decode";

const API_LOGIN_URL = process.env.NEXT_PUBLIC_API_LOGIN_URL;
const TOKEN_URL = process.env.NEXT_PUBLIC_API_TOKEN_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const CODE_CHALLENGE = process.env.NEXT_PUBLIC_CODE_CHALLENGE;
const CODE_VERIFIER = process.env.NEXT_PUBLIC_CODE_VERIFIER;

const getRedirectUri = () => {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
};

export const checkAuthorized = () => {
  const authUrl = `${API_LOGIN_URL}/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&scope=offline_access&redirect_uri=${REDIRECT_URI}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`;

  window.location.href = authUrl;
};

export const getToken = async (authCode: string) => {
  try {
    const response = await fetch(
      `${TOKEN_URL}/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&code=${authCode}&redirect_uri=${REDIRECT_URI}&code_verifier=${CODE_VERIFIER}`,
      { method: "POST" }
    );

    if (!response.ok) {
      throw new Error("Failed to call get token after login");
    }

    const data = await response.json();

    if (data) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }
  } catch (error) {
    console.error("Error during get token:", error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await fetch(
      `${TOKEN_URL}/oauth/token/refresh?client_id=${CLIENT_ID}&refresh_token=${refresh}&grant_type=refresh_token`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();

    saveTokens(data.access_token, data.refresh_token);

    return data;
  } catch (error) {
    console.error("Error during refreshToken:", error);
    logOut();
    throw error;
  }
};

export const logOut = () => {
  window.location.href = `${API_LOGIN_URL}/logout?redirect-uri=${REDIRECT_URI}`;

  removeTokens();
};

export const checkIfTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
