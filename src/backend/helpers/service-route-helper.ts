const AUTH_ROUTE = "http://185.165.40.114:8008";
const ENGNEER_MEMBERSHIP_ROUTE = "http://185.165.40.114:8009";
// const AUTH_ROUTE = "http://192.168.140.125:8008";
// const ENGNEER_MEMBERSHIP_ROUTE = "http://192.168.140.125:8009";
// const AUTH_ROUTE = "http://192.168.1.19:8008";
// const ENGNEER_MEMBERSHIP_ROUTE = "http://192.168.1.19:8009";
const HODA_ROUTE = "http://lab.qeng.ir/services/hoda";

export const Routes = {
    "auth.request-otp-token-register":
        AUTH_ROUTE + "/auth/newUserRegisterRequest",
    "auth.confirm-new-user-register":
        AUTH_ROUTE + "/auth/confirmNewUserRegister",
    "auth.check-user-national-id": AUTH_ROUTE + "/auth/checkUserNationalId",
    "auth.check-user-phone-number": AUTH_ROUTE + "/auth/checkUserPhoneNumber",
    "auth.reset-password": AUTH_ROUTE + "/auth/resetPassword",
    "auth.request-forget-password-token":
        AUTH_ROUTE + "/auth/requestForgetPasswordToken",
    "auth.check-user-activation-code-rseset-password":
        AUTH_ROUTE + "/auth/checkUserActivationCodeRsesetPassword",
    "auth.request-otp-token": AUTH_ROUTE + "/auth/requestOtpToken",
    "auth.login-by-user-data": AUTH_ROUTE + "/auth/loginByUserData",
    "auth.login-by-otp-token": AUTH_ROUTE + "/auth/loginByOtpToken",

    /* *********************************************************************** */
    "location.request-countries-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/location/requestCountriesList",
    "location.request-provinces-of-country":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/location/requestProvincesOfCountry/#COUNTRY-ID#",
    "location.request-cities-of-province":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/location/requestCitiesOfProvince/#PROVINCE-ID#",
    "location.request-provinces-of-iran":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/location/requestProvincesOfIran",
    "location.request-cities-of-qazvin":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/location/requestCitiesOfQazvin",
    /* *********************************************************************** */
    "education.request-sections":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/education/list/requestSections",
    "education.request-study-fields":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/education/list/requestStudyFields",
    "education.request-status":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/education/list/requestStatus",

    /* *********************************************************************** */
    "education.request-licence-level":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/resume/requestLicenceLevel",

    /* *********************************************************************** */
    "eduResume.register-education-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/education/registerEducationResume",
    "eduResume.request-education-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/education/requestEducationResume",
    "eduResume.request-for-confirm-education-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/education/requestForConfirmEducationResume",
    "eduResume.request-for-delete-education-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/education/requestForDeleteEducationResume",
    "eduResume.request-for-edit-education-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/education/requestForEditEducationResume",

    /* *********************************************************************** */
    "orgResume.register-employment-membership-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/membership/registerEmploymentMembershipResume",
    "orgResume.request-employment-membership-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/membership/requestEmploymentMembershipResume",
    "orgResume.request-for-confirm-employment-membership-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/membership/requestForConfirmEmploymentMembershipResume",
    "orgResume.request-for-delete-employment-membership-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/membership/requestForDeleteEmploymentMembershipResume",
    "orgResume.request-for-edit-employment-membership-resume":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/resume/membership/requestForEditEmploymentMembershipResume",

    /* *********************************************************************** */
    "userId.reg-user-id-info":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/userIdentification/registerUserIdentificationInformation",
    "userId.req-user-id-info":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/userIdentification/requestUserIdentificationInformation/#USER_ID#",
    "userId.request-national-id-data":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/nationalCard/requestNationalCard",
    "userId.register-national-id-card":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/nationalCard/registerNationalCard",
    "userId.confirm-form-status":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/userIdentification/confirmFormStatus",

    /* *********************************************************************** */
    "bcLetter.request-bc-letter":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/bcLetter/requestBcLetter",

    /* *********************************************************************** */
    "gender.request-gender-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/gender/requestGender",

    /* *********************************************************************** */

    "contacts.request-address":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/address/requestAddress/#NATIONAL-ID#",
    "contacts.register-address":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/address/registerAddress",
    "contacts.request-for-confirm-address":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/address/requestForConfirmAddress",
    "contacts.request-for-delete-address":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/address/requestForDeleteAddress",
    "contacts.request-for-edit-address":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/address/requestForEditAddress",
    "contacts.request-address-type":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/address/requestForEditAddress",

    /* *********************************************************************** */
    "phone.request-phone-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/phone/requestPhone",
    "phone.delete-phone-item":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/phone/deletePhoneItem",
    "phone.confirm-new-phone":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/phone/confirmNewPhone",

    /* *********************************************************************** */
    "email.request-email-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/email/requestEmail",
    "email.delete-email-item":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/email/deleteEmailItem",
    "email.confirm-new-email":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/email/confirmNewEmail",

    /* *********************************************************************** */
    "socialMedia.request-social-media-list":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/socialMedia/requestsocialMedia",
    "socialMedia.delete-social-media-item":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/socialMedia/deleteSocialMediaItem",
    "socialMedia.confirm-new-social-media":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/socialMedia/confirmNewSocialMedia",
    "socialMedia.request-social-media-titles":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/socialMedia/requestSocialMediaTitles",

    /* *********************************************************************** */
    "language.request-language-list":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/language/requestLanguageList",
    "language.delete-language-item":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/language/deleteLanguageItem",
    "language.confirm-new-language":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/language/confirmNewLanguage",
    "language.req-language-list-name":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/language/reqLanguageListName",

    /* *********************************************************************** */
    "isar.request-isar-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/isar/requestIsarList",
    "isar.delete-isar-item":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/isar/deleteIsarItem",
    "isar.confirm-new-isar":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/isar/confirmNewIsar",
    "isar.req-relations-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/isar/reqRelationsList",
    "isar.req-isar-category-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/isar/reqIsarCategory",

    /* *********************************************************************** */
    "basij.request-basij-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/basij/requestBasijList",
    "basij.delete-basij-item":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/basij/deleteBasijItem",
    "basij.confirm-new-basij":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/basij/confirmNewBasij",
    "basij.req-membership-type-list":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/basij/reqMembershipTypeList",
    "basij.req-basij-category":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/basij/reqBasijCategory",

    /* *********************************************************************** */
    "military.confirm-new-military":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/military/confirmNewMilitary",
    "military.req-military-category":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/military/reqMilitaryCategory",

    /* *********************************************************************** */
    "religion.register-religion":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/religion/confirmNewMilitary",
    "religion.load-religion-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/religion/loadReligionList",

    /* *********************************************************************** */
    "request.requestConfirmation":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/request/confirmation/requestConfirmation",

    /* *********************************************************************** */
    obligation: ENGNEER_MEMBERSHIP_ROUTE + "/api/Obligations",
    "obligation.requestObligationStatus":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/Obligations/requestObligationStatus",

    /* *********************************************************************** */
    "auth.login": "http://185.165.40.114:8585/auth/login",

    /* Hoda Service */
    //"hoda.get-auth-token": "http://185.165.40.114:17003/hoda/startAuth",
    //"hoda.request-hoda-data": "http://185.165.40.114:17003/hoda/authCallback",

    "hoda.get-auth-token": HODA_ROUTE + "/hoda/startAuth",
    "hoda.request-hoda-data": HODA_ROUTE + "/hoda/authCallback",

    /* *********************************************************************** */
    "checklist.loadEngineer":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/base-data/check-list/requestCheckList",
    "checklist.loadEmployee":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/employment/confirmation/listEngineerItem",
    /* *********************************************************************** */
    "licenseQuiz.request-quiz-course-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/loadQuizCourseList",
    "licenseQuiz.request-quiz-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/loadQuizList",
    "licenseQuiz.confirm-new-quiz":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/confirmNewQuiz",
    "licenseQuiz.load-list-of-quiz-engineer":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/loadListOfQuizEngineer",
    "licenseQuiz.confirm-new-quiz-engineer":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/confirmNewQuizEngineer",
    "licenseQuiz.confirm-group-new-quiz-engineer":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/license/quiz/confirmGroupNewQuizEngineer",
    "licenseQuiz.delete-quiz-item":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/license/quiz/deleteQuizItem/#CODE#",
    "licenseQuiz.delete-engineer-from-list":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/license/quiz/deleteEngineerFromList/#CODE#",
    /* *********************************************************************** */
    "dashboard.load-notification-count":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/confirmation/countEngineer",
    /* *********************************************************************** */
    "engineerConfirmList.request-engineer-confirm-list":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/employment/confirmation/listEngineer",
    /* *********************************************************************** */
    "prompt.confirm-form-status":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/base-data/check-list/responseConfirmCheckList",
    /* *********************************************************************** */
    "licenseIssuance.load-user-info-data":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/engineer/license/loadUserInfoData",
    "licenseIssuance.load-req-issuance-data":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/engineer/license/loadReqIssuanceData",
    "licenseIssuance.request-license-resume-data":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/engineer/license/requestLicenseResumeData",
    "licenseIssuance.load-resume-certificates-data":
        ENGNEER_MEMBERSHIP_ROUTE +
        "/api/engineer/license/loadResumeCertificatesData",
    "licenseIssuance.reg-villag-monitoring":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/engineer/license/regVillagMonitoring",
    "licenseIssuance.reg-associate-license":
        ENGNEER_MEMBERSHIP_ROUTE + "/api/engineer/license/regAssociateLicense",
    /* *********************************************************************** */
};
