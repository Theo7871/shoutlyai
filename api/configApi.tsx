// api/configApi.tsx
export const API_BASE_URL = "https://backend.shoutlyai.com";

export const API_ENDPOINTS = {
    posts: `${API_BASE_URL}/api/posts`,
    displayImages: `/api/display-images`,
    industries: `${API_BASE_URL}/api/industries/with-subindustries`,
    postGeneratorGenerate: `/api/post-generator/generate`,
    postGeneratorGenerateAndSave: `/api/post-generator/generate-and-save`,
    postGeneratorGenerateDirect: `${API_BASE_URL}/api/generator/posts`,
    postGeneratorGenerateAndSaveDirect: `${API_BASE_URL}/api/generator/posts`,
    textGeneratorGenerate: `/api/generator/texts`,
    textGeneratorGenerateDirect: `${API_BASE_URL}/api/generator/texts`,
    hashtagGeneratorDirect: `${API_BASE_URL}/api/generator/hashtags`,
    ragChat: `${API_BASE_URL}/api/rag/chat`,
    ragChatStream: `${API_BASE_URL}/api/rag/chat/stream`,
    register: `${API_BASE_URL}/api/auth/register`,
    verifyOtp: `${API_BASE_URL}/api/auth/verify-otp`,
    setPassword: `${API_BASE_URL}/api/auth/set-password`,
    sendOtp: `${API_BASE_URL}/api/auth/send-otp`,
    verifyOtpReset: `${API_BASE_URL}/api/auth/verify-otp-reset`,
    resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
    googleLogin: `${API_BASE_URL}/api/auth/google/login`,
    emailLogin: `${API_BASE_URL}/api/auth/login`,
    userProfile: `${API_BASE_URL}/api/users/me`,               // GET  — own profile
    profileUpdate: `${API_BASE_URL}/api/users/me`,             // PATCH — update own profile (text fields)
    profilePhotoUpload: `${API_BASE_URL}/api/users/profile-update`, // PATCH multipart — upload/replace profile photo
    profilePhotoDelete: `${API_BASE_URL}/api/users/profile-photo`, // DELETE — remove profile photo
    industrySelection: `${API_BASE_URL}/api/users/me/industry-selection`, // PATCH — set industry/sub-industry
    passwordUpdate: `${API_BASE_URL}/api/users/password`,
    dashboard: `${API_BASE_URL}/api/dashboard`,
    notes: `${API_BASE_URL}/api/notes`,
    festivalsRandom: `${API_BASE_URL}/api/festivals/random`,
    festivals: `${API_BASE_URL}/api/festivals`,
    logoUpload: `${API_BASE_URL}/api/logo/upload`,
    templateUpload: `${API_BASE_URL}/api/templates/upload`, // POST multipart — upload a background/template image, no auth
    applyLogoOverlay: `${API_BASE_URL}/api/templates/apply-logo`,
};
