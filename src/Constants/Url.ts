export const URL_KEYS = {
  AUTH: {
    SIGNIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  USER: {
    GET_ALL: "/user",
    GET_BY_ID: "/user/:id",
    ADD: "/auth/signup",
    UPDATE: "/user/edit",
    DELETE: "/user/:id",
  },

  SEASON: {
    GET_ALL: "/season/",
    ADD: "/season/add",
    UPDATE: "/season/edit",
    DELETE: "/season/:id",
  },

  COLLECTION: {
    GET_ALL: "/collection/",
    ADD: "/collection/add",
    UPDATE: "/collection/edit",
    DELETE: "/collection/:id",
  },

  SCENT: {
    GET_ALL: "/scent/",
    ADD: "/scent/add",
    UPDATE: "/scent/edit",
    DELETE: "/scent/:id",
  },

  PRODUCT: {
    GET_ALL: "/product/",
    GET_BY_ID: "/product/:id",
    ADD: "/product/add",
    UPDATE: "/product/edit",
    DELETE: "/product/:id",
  },

  BANNER: {
    GET: "/banner",
    ADD_EDIT: "/banner/add-edit",
  },

 BLOG: {
  GET_ALL: "/blog/",
  GET_BY_ID: "/blog/:id",
  ADD: "/blog/add",      
  UPDATE: "/blog/edit",  
  DELETE: "/blog/:id",
},
  UPLOAD: {
    ADD: "/upload/",
  },
TOPBAR: {
  GET: "/topbar",
  ADD_EDIT: "/topbar/add-edit",
},

TERMS_SERVICE: {
  GET: "/terms-of-service/",
  ADD_EDIT: "/terms-of-service/add-edit",
},
INSTAGRAM: {
  GET_ALL: "/instagram/",
  ADD: "/instagram/add",
  UPDATE: "/instagram/edit",
  DELETE: "/instagram/:id",
},

TERMS_CONDITIONS: {
  GET: "/terms-conditions/",
  ADD_EDIT: "/terms-conditions/add-edit",
},

PRIVACY_POLICY: {
  GET_ALL: "/privacy-policy/",
  ADD_EDIT: "/privacy-policy/add-edit",
},

REFUND_POLICY: {
  GET_ALL: "/refund-policy/",
  ADD_EDIT: "/refund-policy/add-edit",
},

RETURN_EXCHANGE: {
  GET_ALL: "/return-exchange/",
  ADD_EDIT: "/return-exchange/add-edit",
},


CONTACT_US: {
  GET_ALL: "/contact-us/",
  DELETE: "/contact-us/:id",
},

NEWSLETTER: {
  GET_ALL: "/newsletter/",
  DELETE: "/newsletter/:id",
},

RATING: {
  GET_ALL: "/rating/",
  ADD: "/rating/add",
  UPDATE: "/rating/edit",
  DELETE: "/rating/:id",
},

SETTINGS: {
  GET: "/settings",
  ADD_EDIT: "/settings/add-edit",
},

// ************ ORDER ************
ORDER: {
  BASE: "/order",
  GET_ALL: "/order",
  GET_ONE: "/order/:id",
},
};