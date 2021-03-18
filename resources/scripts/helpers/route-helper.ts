export const BASE_ROUTE = `http://localhost:8085`;

/**
 * Export routes
 */
export const routes = {
    "auth.login-by-user-data": `${BASE_ROUTE}/auth/loginByUserData`,
    "auth.request-forget-password-email": `${BASE_ROUTE}/auth/requestForgetPasswordEmail`,
    "auth.reset-password": `${BASE_ROUTE}/auth/resetPassword`,
    "auth.new-user-register-request": `${BASE_ROUTE}/auth/newUserRegisterRequest`,
    "auth.verify-register-code": `${BASE_ROUTE}/auth/verifyRegisterCode`,

    "auth.check-user-activation-code-reset-password": `${BASE_ROUTE}/auth/checkUserActivationCodeResetPassword`,
    "auth.request-otp-token": `${BASE_ROUTE}/auth/requestOtpToken`,
    "auth.login-by-otp-token": `${BASE_ROUTE}/auth/loginByOtpToken`,
    "auth.confirm-new-user-register": `${BASE_ROUTE}/auth/confirmNewUserRegister`,

    "engineerMemberShip.check-list": `${BASE_ROUTE}/engineer/checklist/:userId`,
};
