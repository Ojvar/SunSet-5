import BaseRouter from "@Core/Helpers/base-router-helper";
import AuthController from "@BE/Controllers/auth-controller";

/**
 * Auth router
 */
export default class AuthRoute extends BaseRouter {
    private authController: AuthController = new AuthController();

    /**
     * Constructor
     */
    constructor() {
        super("/auth", "AuthRoute");
        this.defineRoutes();
    }

    /**
     * Define routes
     */
    private defineRoutes(): void {
        super.get("/login", [this.authController.login], "auth.login");

        super.post(
            "/loginByUserData",
            [this.authController.loginByUserData],
            "auth.login-by-user-data"
        );

        super.post(
            "/requestOtpToken",
            [this.authController.requestOtpToken],
            "auth.request-otp-token"
        );

        super.post(
            "/loginByOtpToken",
            [this.authController.loginByOtpToken],
            "auth.login-by-otp-token"
        );

        super.post(
            "/requestForgetPasswordToken",
            [this.authController.requestForgetPasswordToken],
            "auth.request-forget-password-token"
        );

        super.post(
            "/resetPassword",
            [this.authController.resetPassword],
            "auth.reset-password"
        );

        super.post(
            "/checkUserNationalId",
            [this.authController.checkUserNationalId],
            "auth.check-user-national-id"
        );

        super.post(
            "/checkUserPhoneNumber",
            [this.authController.checkUserPhoneNumber],
            "auth.check-user-phone-number"
        );

        super.post(
            "/newUserRegisterRequest",
            [this.authController.newUserRegisterRequest],
            "auth.new-user-register-request"
        );

        super.post(
            "/confirmNewUserRegister",
            [this.authController.confirmNewUserRegister],
            "auth.confirm-new-user-register"
        );

        super.post(
            "/checkUserActivationCodeRsesetPassword",
            [this.authController.checkUserActivationCodeResetPassword],
            "auth.check-user-activation-code-reset-password"
        );
    }
}
