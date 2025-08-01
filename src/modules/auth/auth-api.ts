import axios from "axios";
import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "./auth-type";
import { getAccessToken, getBearerToken, getDeviceId } from "./auth-util";

export async function loginApi(data: LoginRequest) {
  return await axios.post<SuccessResponse<LoginResponse>>(
    '/api/v1/oauth2/login',
    data,
    {
      headers: {
        'Device-Id': getDeviceId()
      }
    }
  );
}

export async function refreshTokenApi(data: RefreshTokenRequest) {
  return await axios.post<SuccessResponse<RefreshTokenResponse>>(
    '/api/v1/oauth2/refresh-token',
    data,
    {
      headers: {
        'Device-Id': getDeviceId()
      }
    }
  );
}

export async function logoutApi() {
  return await axios.post(
    '/api/v1/oauth2/logout',
    {
      accessToken: getAccessToken()
    },
    {
      headers: {
        'Device-Id': getDeviceId(),
        Authorization: getBearerToken()
      }
    }
  );
}