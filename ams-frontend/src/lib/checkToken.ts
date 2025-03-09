import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export const hasTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // If no token, assume expired

  try {
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    return true; // If decoding fails, assume token is invalid/expired
  }
};
