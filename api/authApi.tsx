// api/authApi.tsx
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./configApi";

type PendingAuthFlow = {
    email: string;
    name?: string;
    source?: "email" | "google";
    googleIdToken?: string;
};

const PENDING_AUTH_KEY = "shoutly_pending_auth";

// Axios instance with base URL — token is attached automatically via interceptor
const shoutlyClient = axios.create({
    baseURL: API_BASE_URL,
});

shoutlyClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("shoutly_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

shoutlyClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("shoutly_token");
                localStorage.removeItem("shoutly_user");
                if (!window.location.pathname.includes("/sign-in")) {
                    window.location.href = `/sign-in?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
                }
            }
        }
        return Promise.reject(error);
    }
);

// ── Auth ──────────────────────────────────────────────────────────────────────

export const googleLogin = async (idToken: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.googleLogin, { idToken });
        const { token, user } = response.data;
        localStorage.setItem("shoutly_token", token);
        return { token, user };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const apiMessage =
                (error.response?.data as { message?: string } | undefined)?.message;

            if (status === 401) {
                throw new Error(
                    apiMessage ||
                        "Google session expired or invalid. Please sign in again."
                );
            }

            throw new Error(apiMessage || "Google sign-in failed. Please try again.");
        }

        throw new Error("Google sign-in failed. Please try again.");
    }
};

export const emailLogin = async (email: string, password: string) => {
    try {
        const response = await shoutlyClient.post(API_ENDPOINTS.emailLogin, {
            email,
            password,
        });

        const authToken = response.data.accessToken || response.data.token;
        const { user } = response.data;
        localStorage.setItem("shoutly_token", authToken);
        return { token: authToken, user };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const apiMessage =
                (error.response?.data as { message?: string } | undefined)?.message;

            if (status === 401) {
                throw new Error(apiMessage || "Invalid email or password.");
            }

            if (status === 500) {
                throw new Error(
                    apiMessage || "Server error. Please try again later."
                );
            }

            throw new Error(apiMessage || "Sign-in failed. Please try again.");
        }

        throw new Error("Sign-in failed. Please try again.");
    }
};

export const registerUser = async (payload: {
    name: string;
    email: string;
    role?: "USER";
}) => {
    const response = await axios.post(API_ENDPOINTS.register, {
        ...payload,
        role: payload.role || "USER",
    });
    return response.data;
};

export const verifyOtpCode = async (email: string, otp: string) => {
    const response = await axios.post(API_ENDPOINTS.verifyOtp, {
        email,
        otp,
    });
    return response.data;
};

export const sendResetOtp = async (email: string) => {
    const response = await axios.post(API_ENDPOINTS.sendOtp, {
        email,
    });
    return response.data;
};

export const verifyOtpForReset = async (email: string, otp: string) => {
    const response = await axios.post(API_ENDPOINTS.verifyOtpReset, {
        email,
        otp,
    });
    return response.data;
};

export const resetPassword = async (email: string, password: string) => {
    const response = await axios.post(API_ENDPOINTS.resetPassword, {
        email,
        password,
    });
    return response.data;
};

export const setAccountPassword = async (email: string, password: string) => {
    const response = await axios.post(API_ENDPOINTS.setPassword, {
        email,
        password,
    });
    return response.data;
};

export const savePendingAuthFlow = (flow: PendingAuthFlow) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(flow));
};

export const getPendingAuthFlow = (): PendingAuthFlow | null => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(PENDING_AUTH_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as PendingAuthFlow;
    } catch {
        sessionStorage.removeItem(PENDING_AUTH_KEY);
        return null;
    }
};

export const clearPendingAuthFlow = () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(PENDING_AUTH_KEY);
};

export const logout = () => {
    localStorage.removeItem("shoutly_token");
};

// ── User ──────────────────────────────────────────────────────────────────────

// GET /api/users/me — own profile. Never includes password/otp/refreshToken/2FA secret.
export const fetchProfile = async () => {
    const response = await shoutlyClient.get(API_ENDPOINTS.userProfile);
    return response.data;
};

// PATCH /api/users/me — update own profile (text fields only).
// Deliberately excludes role, isActive, email, industryId/subIndustryId (see setIndustrySelection)
// and the profile photo (see uploadProfilePhoto) — those are not editable through this route.
export const updateProfile = async (payload: {
    name?: string;
    phone?: string;
    jobTitle?: string;
    timezone?: string;
    language?: string;
    brandName?: string;
    brandLogo?: string;
    website?: string;
    emailNotification?: boolean;
    pushNotification?: boolean;
    weeklyNotification?: boolean;
    // Brand badge/overlay settings — same vocabulary as the apply-logo render endpoint.
    primaryColor?: string;
    badgeStyle?: "glass" | "solid" | "outline" | "minimal";
    textColor?: "white" | "dark";
    opacity?: number;
    blur?: number;
    radius?: number;
    applyPlatforms?: string[];
}) => {
    const response = await shoutlyClient.patch(API_ENDPOINTS.profileUpdate, payload);
    return response.data;
};

// PATCH /api/users/profile-update — upload/replace the profile photo (multipart, field "file").
// Note: this endpoint's response is the raw user record (includes hashed password/otp/refreshToken) —
// callers must only read `file`/`deleteFileUrl` from the result and discard everything else.
export const uploadProfilePhoto = async (file: File) => {
    if (!file) throw new Error("A file is required to upload a profile photo.");
    const formData = new FormData();
    formData.append("file", file);
    const response = await shoutlyClient.patch(API_ENDPOINTS.profilePhotoUpload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// DELETE /api/users/profile-photo — remove the profile photo. Safe response shape (same as GET /users/me).
export const deleteProfilePhoto = async () => {
    const response = await shoutlyClient.delete(API_ENDPOINTS.profilePhotoDelete);
    return response.data;
};

// PATCH /api/users/me/industry-selection — set the account's industry/sub-industry.
export const setIndustrySelection = async (subIndustryId: string) => {
    const response = await shoutlyClient.patch(API_ENDPOINTS.industrySelection, { subIndustryId });
    return response.data;
};

export const updatePassword = async (payload: {
    currentPassword: string;
    newPassword: string;
}) => {
    try {
        const response = await shoutlyClient.patch(API_ENDPOINTS.passwordUpdate, {
            currentPassword: payload.currentPassword,
            newPassword: payload.newPassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const isProfileComplete = (user: any): boolean => {
    if (!user || typeof user !== "object") return false;

    const brandName =
        typeof user.brandName === "string"
            ? user.brandName.trim()
            : "";
    const website =
        typeof user.website === "string"
            ? user.website.trim()
            : "";

    return Boolean(brandName && website);
};

export default shoutlyClient;
