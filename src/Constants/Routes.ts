export const ROUTES = {

    DASHBOARD: "/",
    AUTH: {
        LOGIN: "/login",
        FORGOT_PASSWORD: "/forgot-password",
    },

  BLOG: {
    BASE :"/blog", 
  },

   USERS: {
    BASE: "/user",
    LIST: "/user/list",
    ADD_EDIT: "/user/add-edit",
    PERMISSION_ADD_EDIT: "/user/permission/add-edit",
  },

  PROFILE : {
    BASE :"/profile"
  },

  
   PRODUCT: {
    BASE: "/product",
    ADD_EDIT: "/product/add-edit",
    ITEM_ADD_EDIT: "/product/item/add-edit",
  },

  SEASON : {
    BASE: "/season",
    ADD_EDIT: "/season/add-edit",
  },

  COLLECTION : {
    BASE: "/collection",
    ADD_EDIT: "/collection/add-edit",
  },

   SCENT : {
    BASE: "/scent",
    ADD_EDIT: "/scent/add-edit",
  },
  
  BANNER :{
  BASE: "/banner"
  }
  
,
  TOPBAR: {
  BASE: "/topbar",
},

TERMS_SERVICE: {
  BASE: "/terms-service",
  ADD_EDIT: "/terms-service/add-edit",
},


INSTAGRAM: {
  BASE: "/instagram",
  ADD_EDIT: "/instagram/add-edit",
},

TERMS_CONDITIONS: {
  BASE: "/terms-conditions",
  ADD_EDIT: "/terms-conditions/add-edit",
},

PRIVACY_POLICY: {
  BASE: "/privacy-policy",
  ADD_EDIT: "/privacy-policy/add-edit",
},

REFUND_POLICY: {
  BASE: "/refund-policy",
  ADD_EDIT: "/refund-policy/add-edit",
},

RETURN_EXCHANGE: {
  BASE: "/return-exchange",
  ADD_EDIT: "/return-exchange/add-edit",
},

CONTACT_US: {
  BASE: "/contact-us",
},


NEWSLETTER: {
  BASE: "/newsletter",
},

RATING: {
  BASE: "/rating",
  ADD_EDIT: "/rating/add-edit",
},

SETTINGS: {
  BASE: "/settings"
},

ORDERS: "/orders",
ORDER_DETAILS: "/orders/:id",


} as const;