// import { BASE_URLS } from "@/api/endpoints/base.api";
// import { BASE_URL } from "@/constants/base-url.constants";
// import { BaseUrlType } from "@/types/base-url.types";
import { jwtDecode } from "jwt-decode";
import {
  refreshToken,
  checkIfTokenExpired,
  logOut,
} from "../auth/config/custom-auth";
import Cookies from "js-cookie";

const baseApiUrl = "https://backend.staging.identity.dreamemirates.com/api/";

const buildUrlWithParams = (url: string, params?: Record<string, any>) => {
  if (!url || typeof url !== "string") {
    throw new Error(
      "Invalid URL provided. Ensure the URL is a non-empty string."
    );
  }

  const newUrl = new URL(url, baseApiUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => newUrl.searchParams.append(`${key}[]`, item));
      } else {
        newUrl.searchParams.append(key, String(value));
      }
    });
  }

  return newUrl.toString();
};

function isExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const isExpired = Date.now() >= exp * 1000 - 30000;
    return isExpired;
  } catch (error) {
    return true;
  }
}

const customFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body: any = null,
  isMultipart = false
) => {
  let token = Cookies.get("token");
  const refresh = Cookies.get("refresh_token");

  if (token && refresh && isExpired(String(token))) {
    const data: any = await refreshToken(refresh);

    token = data.access_token;
  }

  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: isMultipart ? body : JSON.stringify(body) }),
  };

  try {
    const fullUrl = new URL(url, baseApiUrl).toString();

    const response = await fetch(fullUrl, options);

    if (response.status === 401) {
      logOut();
    }

    const contentType = response.headers.get("Content-Type") || "";

    const responseData = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error: any) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchGet = async (url: string, params?: Record<string, any>) => {
  const fullUrl = buildUrlWithParams(url, params);
  return customFetch(fullUrl, "GET", null, false);
};

// export const fetchPost = async (
//   url: string,
//   body: any,
//   isMultipart = false,
//   base: BaseUrlType = BASE_URL.DEFAULT
// ) => customFetch(url, "POST", body, isMultipart, base);

// export const fetchPut = async (
//   url: string,
//   body: any,
//   isMultipart = false,
//   base: BaseUrlType = BASE_URL.DEFAULT
// ) => customFetch(url, "PUT", body, isMultipart, base);

// export const fetchPatch = async (
//   url: string,
//   body: any,
//   isMultipart = false,
//   base: BaseUrlType = BASE_URL.DEFAULT
// ) => customFetch(url, "PATCH", body, isMultipart, base);

// export const fetchDelete = async (
//   url: string,
//   base: BaseUrlType = BASE_URL.DEFAULT
// ) => customFetch(url, "DELETE", null, false, base);
